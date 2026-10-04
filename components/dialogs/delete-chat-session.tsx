import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Trash, X } from "lucide-react";
import useChatSessionsStore from "@/store/chat-sessions";
import { toast } from "sonner";

interface AlertDialogDeleteChatSessionProps {
  sessionId: string;
}

export function AlertDialogDeleteChatSession({
  sessionId,
}: AlertDialogDeleteChatSessionProps) {
  const { removeSession } = useChatSessionsStore();
  const handleDeleteSession = () => {
    removeSession(sessionId);
    // TODO: Add a api request to delete the chat session
    toast.success("Chat session deleted successfully");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this chat session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the chat
            session and all its messages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer hover:text-secondary">
            <div className="flex items-center gap-2">
              <X />
              Cancel
            </div>
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={handleDeleteSession}>
            <Button variant="destructive">
              <Trash />
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
