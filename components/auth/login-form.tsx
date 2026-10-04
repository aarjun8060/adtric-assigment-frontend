"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  phoneLoginSchema,
  PhoneLoginSchema,
  otpVerificationSchema,
  OtpVerificationSchema,
} from "@/types/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/loading";
import { toast } from "sonner";
import { LS_KEY } from "@/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();
  const [currentStep, setCurrentStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneForm = useForm<PhoneLoginSchema>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const otpForm = useForm<OtpVerificationSchema>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      phone: phoneNumber,
      otp: "",
    },
  });

  // Phone login submit function
  async function onSubmitPhone(values: PhoneLoginSchema) {
    try {
      setLoading();
      const response = await fetch("/api/auth/phone-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data && data.status === "SUCCESS") {
        setPhoneNumber(values.phone);
        otpForm.setValue("phone", values.phone);

        // Add a small delay for smooth transition
        setTimeout(() => {
          setCurrentStep("otp");
          toast.success("OTP sent successfully!");
        }, 300);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Phone login failed:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading();
    }
  }

  // OTP verification submit function
  async function onSubmitOTP(values: OtpVerificationSchema) {
    try {
      setLoading();
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data && data.status === "SUCCESS") {
        // Store token in localStorage as backup (cookie is set by API route)
        console.log("data", data);
        localStorage.setItem(LS_KEY.auth_token, data.data.token);
        router.push("/dashboard");
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("OTP verification failed. Please try again.");
    } finally {
      setLoading();
    }
  }

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    otpForm.reset();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Indicator */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            currentStep === "phone"
              ? "bg-primary text-primary-foreground"
              : "bg-green-500 text-white"
          }`}
          animate={{
            scale: currentStep === "phone" ? 1 : 1.1,
            backgroundColor: currentStep === "phone" ? undefined : "#10b981",
          }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === "otp" && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <CheckCircle className="w-4 h-4" />
            </motion.div>
          )}
          <span>Phone</span>
        </motion.div>

        <motion.div
          className="w-8 h-0.5 bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: currentStep === "otp" ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <motion.div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            currentStep === "otp"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          animate={{
            scale: currentStep === "otp" ? 1.1 : 1,
            backgroundColor: currentStep === "otp" ? undefined : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          <span>OTP</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2 text-center"
        key={`header-${currentStep}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold"
          key={`title-${currentStep}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {currentStep === "phone" ? "Login to your account" : "Verify OTP"}
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-sm text-balance"
          key={`subtitle-${currentStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {currentStep === "phone"
            ? "Enter your phone number to receive OTP"
            : `Enter the OTP sent to ${phoneNumber}`}
        </motion.p>
      </motion.div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === "phone" ? (
            <motion.div
              key="phone-form"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Form {...phoneForm}>
                <form
                  className={cn("flex flex-col gap-6")}
                  onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                >
                  <motion.div
                    className="grid gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Field>
                      <FieldLabel>Phone Number</FieldLabel>
                      <FieldContent>
                        <FormField
                          control={phoneForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <motion.div
                                  initial={{ scale: 0.95 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.4 }}
                                  whileFocus={{ scale: 1.02 }}
                                >
                                  <Input
                                    placeholder="9876543210"
                                    {...field}
                                    type="tel"
                                  />
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FieldContent>
                    </Field>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          type="submit"
                          className="w-full"
                          loading={loading}
                        >
                          Send OTP
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Form {...otpForm}>
                <form
                  className={cn("flex flex-col gap-6 space-x-2")}
                  onSubmit={otpForm.handleSubmit(onSubmitOTP)}
                >
                  <motion.div
                    className="grid gap-6 space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Field>
                      <FieldLabel>Enter OTP</FieldLabel>
                      <FieldContent>
                        <FormField
                          control={otpForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <motion.div
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                  <InputOTP
                                    maxLength={4}
                                    {...field}
                                    className="justify-center"
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </motion.div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FieldContent>
                    </Field>

                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleBackToPhone}
                          disabled={loading}
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1"
                      >
                        <Button
                          type="submit"
                          className="w-full"
                          loading={loading}
                        >
                          Verify OTP
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
