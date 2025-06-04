import { useState, useRef, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Animated,
} from "react-native";
import { Appbar, IconButton, List, Button } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";
import { useNotification } from "@/stores/notifications";
import { useSnackbar } from "@/stores/snackbar";
import BottomSheetModal from "@/components/ui/BottomSheet";
import { SCREEN_HEIGHT } from "@/constants/screen";
import { formatDistanceToNow } from "date-fns";

const noNotificationImg: ImageSourcePropType = require("@/assets/images/no_notification.png");

const Notifications = () => {
  const [visible, setVisible] = useState(false);
  const swipeableRef = useRef<Swipeable | null>(null);
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState<
    string | null
  >(null);

  const navigation = useNavigation();
  const router = useRouter();
  const { colors } = useThemeStore();
  const { showSnackbar } = useSnackbar();
  const {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
    undo,
  } = useNotification();

  const handleDelete = (id: string) => {
    deleteNotification(id);
    showSnackbar("Deleted a message", colors.error, "undo", () => undo());
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setVisible(false);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setVisible(false);
    showSnackbar("Marked all Messages as unread", colors.textSecondary);
  };

  const closeCurrentlyOpenSwipeable = () => {
    if (currentlyOpenSwipeable) {
      swipeableRef.current?.close();
      setCurrentlyOpenSwipeable(null);
    }
  };

  const handleSwipeableOpen = (id: string) => {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== id) {
      closeCurrentlyOpenSwipeable();
    }
    setCurrentlyOpenSwipeable(id);
  };

  const handleSwipeableClose = () => {
    setCurrentlyOpenSwipeable(null);
  };

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  useEffect(() => {
    if (notifications.length === 0) {
      addNotification({
        title: "New Message",
        message: "You have a new message from John",
        type: "message",
        metadata: { userId: "123" },
      });
    }
  }, []);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    id: string
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Animated.View
        style={[
          styles.rightAction,
          {
            transform: [{ translateX: trans }],
            backgroundColor: colors.error,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(id)}
        >
          <IconButton icon="delete" iconColor={colors.white} size={24} />
          <Text style={[styles.actionText, { color: colors.white }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notifications" />
        {notifications.length > 0 && (
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => setVisible(true)}
          />
        )}
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Swipeable
              key={notification.id}
              ref={(ref) => {
                if (ref && notification.id === currentlyOpenSwipeable) {
                  swipeableRef.current = ref;
                }
              }}
              renderRightActions={(progress) =>
                renderRightActions(progress, notification.id)
              }
              rightThreshold={40}
              onSwipeableOpen={() => handleSwipeableOpen(notification.id)}
              onSwipeableClose={handleSwipeableClose}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  markAsRead(notification.id);
                  closeCurrentlyOpenSwipeable();
                }}
              >
                <View
                  style={[
                    styles.notificationCard,
                    {
                      backgroundColor: notification.read
                        ? colors.cardBackground
                        : colors.primary + "10",
                      borderLeftWidth: 4,
                      borderLeftColor: notification.read
                        ? colors.cardBackground
                        : colors.primary,
                    },
                  ]}
                >
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationTextContainer}>
                      <Text
                        style={[
                          styles.notificationTitle,
                          {
                            color: colors.text,
                            fontWeight: notification.read ? "normal" : "bold",
                          },
                        ]}
                      >
                        {notification.title}
                      </Text>
                      <Text
                        style={[
                          styles.notificationMessage,
                          { color: colors.textSecondary },
                        ]}
                        numberOfLines={2}
                      >
                        {notification.message}
                      </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                      <Text
                        style={[
                          styles.notificationTime,
                          { color: colors.textTertiary },
                        ]}
                      >
                        {formatTime(notification.timestamp)}
                      </Text>
                      {!notification.read && (
                        <View
                          style={[
                            styles.unreadBadge,
                            { backgroundColor: colors.primary },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={noNotificationImg}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.emptyTitle, { color: colors.primary }]}>
              No notifications yet
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textTertiary }]}
            >
              You will see important updates here when they appear
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                router.push("/(tabs)/explore");
              }}
              style={styles.checkUpdatesButton}
              labelStyle={{ color: colors.white }}
            >
              Browse Properties
            </Button>
          </View>
        )}
      </View>
      <BottomSheetModal
        visible={visible}
        defaultHeight={200}
        maxHeight={SCREEN_HEIGHT * 0.3}
        backdropOpacity={0.7}
        onClose={() => setVisible(false)}
        draggable={true}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: colors.error + "10" },
            ]}
            onPress={handleClearAll}
          >
            <List.Icon icon="delete" color={colors.error} />
            <Text style={[styles.optionText, { color: colors.error }]}>
              Clear All Notifications
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <TouchableOpacity
            style={[
              styles.optionButton,
              notifications.every((n) => n.read) && { opacity: 0.3 },
            ]}
            onPress={handleMarkAllAsRead}
            disabled={notifications.every((n) => n.read)}
          >
            <List.Icon icon="email-mark-as-unread" color={colors.text} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Mark all as read
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <TouchableOpacity
            style={[styles.optionButton, styles.cancelButton]}
            onPress={() => setVisible(false)}
          >
            <Text
              style={[
                styles.optionText,
                styles.cancelText,
                { color: colors.primary },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    // Android elevation
    elevation: 2,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  notificationTimeContainer: {
    alignItems: "flex-end",
    minWidth: 80,
  },
  notificationTime: {
    fontSize: 12,
    marginBottom: 4,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 12,
    marginVertical: 8,
    marginRight: 16,
    overflow: "hidden",
  },
  actionButton: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  checkUpdatesButton: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 8,
  },
  image: {
    width: 200,
    height: 200,
    opacity: 0.8,
  },
  bottomSheetContainer: {
    paddingVertical: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 8,
    justifyContent: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 4,
  },
});

export default Notifications;
