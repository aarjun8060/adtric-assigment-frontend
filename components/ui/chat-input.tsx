"use client";
import { useRef, useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ValidationError {
  message: string;
  type: "error" | "warning";
}

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg max-w-[200px]">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-sm text-gray-500"></span>
    </div>
  );
};

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isSystemTyping, setIsSystemTyping] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  // Validation rules
  const validateMessage = (text: string): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (text.trim().length < 2) {
      errors.push({
        message: "Message must be at least 2 characters long",
        type: "error",
      });
    }

    if (text.length > 1000) {
      errors.push({
        message: "Message cannot exceed 1000 characters",
        type: "error",
      });
    }

    if (text.trim().length < 10) {
      errors.push({
        message: "Consider providing more details for a better response",
        type: "warning",
      });
    }

    if (/(.)\1{4,}/.test(text)) {
      errors.push({
        message: "Message contains too many repeated characters",
        type: "error",
      });
    }

    if (text.length > 5 && text === text.toUpperCase()) {
      errors.push({
        message: "Please avoid using all capital letters",
        type: "warning",
      });
    }

    return errors;
  };

  // Debounced validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (message) {
        setErrors(validateMessage(message));
      } else {
        setErrors([]);
      }
      setIsValidating(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [message]);

  // Handle textarea auto-resize
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = window.innerHeight * 0.4;

      if (scrollHeight > 48) {
        setIsExpanded(true);
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      } else {
        setIsExpanded(false);
        textarea.style.height = "48px";
      }
      setIsSystemTyping(true);
    };

    adjustHeight();
    const resizeObserver = new ResizeObserver(adjustHeight);
    resizeObserver.observe(textarea);

    return () => resizeObserver.disconnect();
  }, [message]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (!message.trim()) {
          setIsExpanded(false);
          if (textAreaRef.current) {
            textAreaRef.current.style.height = "48px";
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Validate before sending
    const validationErrors = validateMessage(message);
    const hasErrors = validationErrors.some((error) => error.type === "error");

    if (hasErrors) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before sending");
      return;
    }
  };

  const hasErrors = errors.some((error) => error.type === "error");

  return (
    <>
      {isSystemTyping && (
        <div className="fixed bottom-32 right-4">
          <TypingAnimation />
        </div>
      )}
      <div
        className={cn(
          "fixed bottom-0 w-full mx-auto bg-transparent transition-all duration-200",
          isExpanded ? "pb-6" : "pb-4",
        )}
      >
        <div className="max-w-5xl mx-auto px-4">
          {errors.length > 0 && (
            <div className="mb-2 space-y-1">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-sm px-2 py-1 rounded",
                    error.type === "error"
                      ? "text-red-600 bg-red-50"
                      : "text-yellow-600 bg-yellow-50",
                  )}
                >
                  {error.message}
                </div>
              ))}
            </div>
          )}
          <div
            ref={wrapperRef}
            className={cn(
              "relative bg-white rounded-lg border shadow-sm transition-all duration-200",
              isExpanded && "shadow-md",
              hasErrors && "border-red-300",
            )}
          >
            <textarea
              ref={textAreaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setIsValidating(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsExpanded(true)}
              placeholder="Type your message here..."
              className={cn(
                "w-full resize-none bg-transparent px-12 py-3 text-base",
                "focus:outline-none focus:ring-0",
                "placeholder:text-muted-foreground",
                "scrollbar scrollbar-w-2 scrollbar-track-transparent scrollbar-thumb-accent",
                isExpanded && "min-h-[100px]",
              )}
              style={{
                lineHeight: "1.5",
                maxHeight: "40vh",
              }}
            />

            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || hasErrors || isValidating}
              className={cn(
                "absolute right-3 bottom-3 p-1.5 rounded-md transition-all duration-200",
                message.trim() && !hasErrors && !isValidating
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
                isExpanded && "scale-110",
              )}
              aria-label="Send message"
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
