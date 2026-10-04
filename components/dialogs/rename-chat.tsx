import { Check, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
} from "../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useChatSessionsStore from "@/store/chat-sessions";
import { toast } from "sonner";

const renameChatSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
});

type RenameChatFormValues = z.infer<typeof renameChatSchema>;

interface RenameChatSessionDialogProps {
  sessionId: string;
  currentTitle: string;
}

const RenameChatSessionDialog = ({
  sessionId,
  currentTitle,
}: RenameChatSessionDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateSession } = useChatSessionsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenameChatFormValues>({
    resolver: zodResolver(renameChatSchema),
    defaultValues: {
      title: currentTitle,
    },
  });

  const onSubmit = (data: RenameChatFormValues) => {
    // TODO: Add a api request to update the chat session title
    updateSession(sessionId, { title: data.title });
    toast.success("Chat session renamed successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <div className="flex items-center cursor-pointer w-full">
            <Pencil className="mr-2 h-4 w-4" />
            Rename
          </div>
        </DialogTrigger>
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat Session</DialogTitle>
          <DialogDescription>
            Rename the chat session to a new name.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  {...register("title")}
                  placeholder="Enter chat title"
                  className={errors.title ? "aria-invalid" : ""}
                />
                <FieldError
                  errors={errors.title ? [errors.title] : undefined}
                />
              </FieldContent>
            </Field>
          </FieldGroup>
          <DialogFooter className="flex justify-end mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" variant="default">
              <Check className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameChatSessionDialog;
