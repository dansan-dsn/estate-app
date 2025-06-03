import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDistanceToNow } from "date-fns";
import {
  Notification,
  NotificationState,
} from "@/shared/interfaces/notifications";

export const useNotification = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          read: false,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(
            0,
            100
          ),
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, read: true } : item
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((item) => ({
            ...item,
            read: true,
          })),
        }));
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,

      formatTime: (timestamp: string) =>
        formatDistanceToNow(new Date(timestamp), { addSuffix: true }),
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({ notifications: state.notifications }),
      storage: {
        getItem: async (name) => {
          try {
            const value = await AsyncStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error("Failed to load notifications", error);
            return null;
          }
        },
        setItem: (name, value) =>
          AsyncStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => AsyncStorage.removeItem(name),
      },
    }
  )
);
