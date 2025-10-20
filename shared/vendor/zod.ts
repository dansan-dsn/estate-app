/*
  Minimal Zod-compatible facade used while offline.
  When the real `zod` package is installed, swap this file for the official build.
*/

type Issue = { path: (string | number)[]; message: string };

interface ParseSuccess<T> {
  success: true;
  data: T;
}

interface ParseFailure {
  success: false;
  error: { issues: Issue[] };
}

type ParseResult<T> = ParseSuccess<T> | ParseFailure;

type Refinement<T> = { check: (value: T) => boolean; message: string; path?: (string | number)[] };

type AnySchema = {
  _type: unknown;
  safeParse(value: unknown): ParseResult<any>;
  refine(check: (value: any) => boolean, params?: { message?: string; path?: (string | number)[] }): AnySchema;
  optional(): AnySchema;
};

type Shape = Record<string, AnySchema>;

function createError(path: (string | number)[], message: string): Issue {
  return { path, message };
}

function string() {
  const checks: Refinement<string>[] = [];
  const schema: AnySchema & {
    min(length: number, message?: string): typeof schema;
    regex(pattern: RegExp, message?: string): typeof schema;
    email(message?: string): typeof schema;
  } = {
    _type: '' as unknown as string,
    safeParse(value: unknown): ParseResult<string> {
      const issues: Issue[] = [];
      if (typeof value !== 'string') {
        issues.push(createError([], 'Expected string'));
      } else {
        for (const check of checks) {
          if (!check.check(value)) {
            issues.push(createError(check.path ?? [], check.message));
          }
        }
      }
      if (issues.length > 0) {
        return { success: false, error: { issues } };
      }
      return { success: true, data: value as string };
    },
    refine(check, params) {
      checks.push({
        check,
        message: params?.message ?? 'Invalid value',
        path: params?.path,
      });
      return schema;
    },
    optional() {
      return optional(schema);
    },
    min(length, message) {
      checks.push({
        check: (value) => value.length >= length,
        message: message ?? `Must be at least ${length} characters`,
      });
      return schema;
    },
    regex(pattern, message) {
      checks.push({
        check: (value) => pattern.test(value),
        message: message ?? 'Invalid format',
      });
      return schema;
    },
    email(message) {
      const emailPattern = /.+@.+\..+/;
      checks.push({
        check: (value) => emailPattern.test(value),
        message: message ?? 'Invalid email address',
      });
      return schema;
    },
  };
  return schema;
}

function boolean() {
  const checks: Refinement<boolean>[] = [];
  const schema: AnySchema = {
    _type: true as unknown as boolean,
    safeParse(value: unknown): ParseResult<boolean> {
      const issues: Issue[] = [];
      if (typeof value !== 'boolean') {
        issues.push(createError([], 'Expected boolean'));
      } else {
        for (const check of checks) {
          if (!check.check(value)) {
            issues.push(createError(check.path ?? [], check.message));
          }
        }
      }
      if (issues.length > 0) {
        return { success: false, error: { issues } };
      }
      return { success: true, data: value as boolean };
    },
    refine(check, params) {
      checks.push({
        check,
        message: params?.message ?? 'Invalid value',
        path: params?.path,
      });
      return schema;
    },
    optional() {
      return optional(schema);
    },
  };
  return schema;
}

function enumSchema<T extends readonly [string, ...string[]]>(values: T) {
  const valueSet = new Set(values);
  const schema: AnySchema = {
    _type: values[0] as unknown as T[number],
    safeParse(value: unknown): ParseResult<T[number]> {
      if (typeof value === 'string' && valueSet.has(value)) {
        return { success: true, data: value as T[number] };
      }
      return {
        success: false,
        error: {
          issues: [
            createError(
              [],
              `Expected one of: ${Array.from(valueSet)
                .map((v) => `'${v}'`)
                .join(', ')}`
            ),
          ],
        },
      };
    },
    refine(check, params) {
      const base = schema.safeParse.bind(schema);
      schema.safeParse = (value: unknown): ParseResult<T[number]> => {
        const initial = base(value);
        if (!initial.success) {
          return initial;
        }
        if (!check(initial.data)) {
          return {
            success: false,
            error: {
              issues: [createError(params?.path ?? [], params?.message ?? 'Invalid value')],
            },
          };
        }
        return initial;
      };
      return schema;
    },
    optional() {
      return optional(schema);
    },
  };
  return schema;
}

function optional<T>(inner: AnySchema & { _type: T }) {
  const schema: AnySchema = {
    _type: undefined as unknown as T | undefined,
    safeParse(value: unknown): ParseResult<T | undefined> {
      if (value === undefined) {
        return { success: true, data: undefined };
      }
      const result = inner.safeParse(value);
      if (!result.success) {
        return result;
      }
      return { success: true, data: result.data as T };
    },
    refine(check, params) {
      const base = schema.safeParse.bind(schema);
      schema.safeParse = (value: unknown): ParseResult<T | undefined> => {
        const parsed = base(value);
        if (!parsed.success) {
          return parsed;
        }
        if (parsed.data === undefined) {
          return parsed;
        }
        if (!check(parsed.data as T)) {
          return {
            success: false,
            error: {
              issues: [createError(params?.path ?? [], params?.message ?? 'Invalid value')],
            },
          };
        }
        return parsed;
      };
      return schema;
    },
    optional() {
      return schema;
    },
  };
  return schema;
}

function object<ShapeType extends Shape>(shape: ShapeType) {
  const refinements: Refinement<{ [K in keyof ShapeType]: ShapeType[K]['_type'] }>[] = [];
  const schema: AnySchema & {
    shape: ShapeType;
    pick<P extends Partial<Record<keyof ShapeType, true>>>(picked: P): ReturnType<typeof object<Pick<ShapeType, keyof P>>>;
  } = {
    _type: {} as any,
    shape,
    safeParse(value: unknown) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return {
          success: false,
          error: { issues: [createError([], 'Expected object')] },
        };
      }

      const parsed: Record<string, any> = {};
      const issues: Issue[] = [];

      for (const key of Object.keys(shape)) {
        const result = shape[key].safeParse((value as Record<string, unknown>)[key]);
        if (!result.success) {
          issues.push(
            ...result.error.issues.map((issue) => ({
              path: [key, ...issue.path],
              message: issue.message,
            }))
          );
        } else {
          parsed[key] = result.data;
        }
      }

      for (const refinement of refinements) {
        if (!refinement.check(parsed as any)) {
          issues.push(createError(refinement.path ?? [], refinement.message));
        }
      }

      if (issues.length > 0) {
        return { success: false, error: { issues } };
      }

      return { success: true, data: parsed as { [K in keyof ShapeType]: ShapeType[K]['_type'] } };
    },
    refine(check, params) {
      refinements.push({
        check,
        message: params?.message ?? 'Invalid object',
        path: params?.path,
      });
      return schema;
    },
    optional() {
      return optional(schema);
    },
    pick(picked) {
      const pickedShape = Object.keys(picked).reduce((acc, key) => {
        if (picked[key as keyof ShapeType]) {
          (acc as any)[key] = shape[key as keyof ShapeType];
        }
        return acc;
      }, {} as Partial<ShapeType>);
      return object(pickedShape as ShapeType);
    },
  };
  return schema;
}

export const z = {
  string,
  boolean,
  enum: enumSchema,
  object,
};

export type infer<T extends AnySchema> = T['_type'];
