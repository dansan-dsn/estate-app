# Estate App

Clone the app

```bash
git clone git@github.com:dansan-dsn/estate-app.git
```

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Check CI Flows Locally

# Before pushing code, you can verify that your code will pass CI by running all checks at once:

1.Run all CI-like checks

```bash
yarn run type-check      # TypeScript type checking
yarn run lint            # Code quality with ESLint
yarn run format:check    # Check code formatting with Prettier
```

2. Auto-fix formatting issues

   ```bash
      yarn run format
   ```
