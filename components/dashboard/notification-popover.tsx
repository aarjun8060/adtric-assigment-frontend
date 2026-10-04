"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import useAuth from "@/hooks/use-auth";

export function NotificationPopover() {
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Only show notifications for managers
  const isManager = ["MANAGER", "ADMIN"].includes(user?.role || "");

  // // Listen for real-time notifications
  // useEffect(() => {
  //   if (!isManager) return;

  //   const handleRealtimeNotification = (event: CustomEvent) => {
  //     const newNotification = event.detail;

  //     // Only handle task status update notifications
  //     if (newNotification.title === 'Task Status Updated') {
  //       // Transform socket notification to match API structure
  //       const transformedNotification: Notification = {
  //         _id: newNotification.id || `notification-${Date.now()}-${Math.random()}`,
  //         title: newNotification.title,
  //         message: newNotification.message,
  //         type: newNotification.type,
  //         read: false,
  //         userId: userId,
  //         taskId: newNotification.taskId,
  //         projectId: newNotification.projectId,
  //         createdAt: newNotification.timestamp || new Date().toISOString()
  //       };

  //       // Add the new notification to the list
  //       setNotifications(prev => [transformedNotification, ...prev]);
  //       setUnreadCount(prev => prev + 1);
  //     }
  //   };

  //   window.addEventListener('realtime-notification', handleRealtimeNotification as EventListener);

  //   return () => {
  //     window.removeEventListener('realtime-notification', handleRealtimeNotification as EventListener);
  //   };
  // }, [userId, isManager]);

  // Fetch notifications when popover opens
  // useEffect(() => {
  //   if (isOpen && isManager) {
  //     fetchNotifications();
  //   }
  // }, [isOpen, isManager]);

  // Fetch unread count on mount
  useEffect(() => {
    if (isManager) {
      // fetchUnreadCount();
    }
  }, [isManager]);

  // const fetchNotifications = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const result = await notificationApi.getAll({ limit: 20 });
  //     console.log("Notifications", result)
  //     setNotifications(result.data);
  //   } catch (error) {
  //     console.error('Failed to fetch notifications:', error);
  //     setError('Failed to load notifications. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const fetchUnreadCount = async () => {
  //   try {
  //     const result = await notificationApi.getAll({ limit: 100 });
  //     // Count only unread task status update notifications
  //     const unreadTaskStatusNotifications = result.data.filter(
  //       (notification: Notification) =>
  //         notification.title === 'Task Status Updated' && !notification.read
  //     );
  //     setUnreadCount(unreadTaskStatusNotifications.length);
  //   } catch (error) {
  //     console.error('Failed to fetch unread count:', error);
  //   }
  // };

  // const markAsRead = async (notificationId: string) => {
  //   try {
  //     await notificationApi.markAsRead(notificationId);
  //     setNotifications(prev =>
  //       prev.map(notif =>
  //         notif._id === notificationId ? { ...notif, read: true } : notif
  //       )
  //     );
  //     setUnreadCount(prev => Math.max(0, prev - 1));
  //   } catch (error) {
  //     console.error('Failed to mark notification as read:', error);
  //     setError('Failed to mark notification as read. Please try again.');
  //   }
  // };

  // const markAllAsRead = async () => {
  //   try {
  //     await notificationApi.markAllAsRead();
  //     setNotifications(prev =>
  //       prev.map(notif => ({ ...notif, read: true }))
  //     );
  //     setUnreadCount(0);
  //   } catch (error) {
  //     console.error('Failed to mark all notifications as read:', error);
  //     setError('Failed to mark all notifications as read. Please try again.');
  //   }
  // };

  // const deleteNotification = async (notificationId: string) => {
  //   try {
  //     await notificationApi.delete(notificationId);
  //     const notification = notifications.find(n => n._id === notificationId);
  //     setNotifications(prev =>
  //       prev.filter(notif => notif._id !== notificationId)
  //     );
  //     if (notification && !notification.read) {
  //       setUnreadCount(prev => Math.max(0, prev - 1));
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete notification:', error);
  //     setError('Failed to delete notification. Please try again.');
  //   }
  // };

  // const getNotificationIcon = (type: string) => {
  //   switch (type) {
  //     case 'SUCCESS':
  //       return '✅';
  //     case 'WARNING':
  //       return '⚠️';
  //     case 'ERROR':
  //       return '❌';
  //     default:
  //       return 'ℹ️';
  //   }
  // };

  // const getNotificationColor = (type: string) => {
  //   switch (type) {
  //     case 'SUCCESS':
  //       return 'text-green-600';
  //     case 'WARNING':
  //       return 'text-yellow-600';
  //     case 'ERROR':
  //       return 'text-red-600';
  //     default:
  //       return 'text-blue-600';
  //   }
  // };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 p-0 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          {/* {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )} */}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="flex flex-col h-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50/50">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">
                Task Status Updates
              </h3>
              <div className="flex items-center space-x-1">
                {/* <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} /> */}
                <span className="text-xs text-gray-500"></span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {/* {notifications && Array.isArray(notifications) && notifications.some(n => !n.read) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="h-8 px-2 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )} */}
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            {false ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            ) : false ? (
              <div className="flex flex-col items-center justify-center h-32 text-red-600 p-4">
                <p className="text-sm text-center">{"eror"}</p>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={fetchNotifications}
                  className="mt-2"
                >
                  Retry
                </Button>
              </div>
            ) : [].length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-4">
                <Bell className="h-8 w-8 text-gray-300 mb-2" />
                <p className="text-sm">No task status updates yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  You will be notified when task statuses change
                </p>
              </div>
            ) : (
              <></>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
