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
import { Archive, X } from "lucide-react";
import useChatSessionsStore from "@/store/chat-sessions";
import { toast } from "sonner";

interface AlertDialogArchiveChatSessionProps {
  sessionId: string;
}

export function AlertDialogArchiveChatSession({
  sessionId,
}: AlertDialogArchiveChatSessionProps) {
  const { removeSession } = useChatSessionsStore();
  const handleDeleteSession = () => {
    removeSession(sessionId);
    // TODO: Add a api request to delete the chat session
    toast.success("Chat session deleted successfully");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Archive />
          Archive
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to add this chat session to
            archive?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will add the chat session to
            archive and it will be hidden from the list.
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
            <Button>
              <Archive />
              Archive
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
