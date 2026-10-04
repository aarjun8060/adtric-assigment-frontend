"use client";

import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome back, {user.name}!
            </h2>
            <Badge variant="secondary" className="ml-3">
              {user.role}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => {
                // Open notification panel
                const event = new CustomEvent("toggle-notifications");
                window.dispatchEvent(event);
              }}
            >
              <Bell className="h-5 w-5" />
              {/* {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )} */}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
