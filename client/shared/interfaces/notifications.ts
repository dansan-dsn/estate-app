export type NotificationType = "message" | "property" | "payment" | "system";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: NotificationType;
  metadata?: Record<string, any>;
}

export interface NotificationState {
  notifications: Notification[];
  lastDeleted?: Notification;
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "timestamp">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  undo: () => void;
  clearAllNotifications: () => void;
  getUnreadCount: () => number;
  formatTime: (timestamp: string) => string;
}
