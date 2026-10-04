"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import { storage } from "@/lib/storage";
import { API_BASE_URL } from "@/config";

import { User } from "@/types";
import HeadingPage from "../dashboard/header-title";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Field,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  userDetailsSchema,
  type UserDetailsSchema,
} from "@/types/validations/user";
import { baseQuery } from "@/lib/api";

interface UserDetailsFormProps {
  user?: User;
}

const UserDetailsForm = ({ user }: UserDetailsFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: user
      ? {
          name: user.name,
          birthDate: new Date(user.birthDate),
          birthTime: user.birthTime || "",
          gender: user.gender as "male" | "female" | "other",
          birthPlace: {
            city: user.birthPlace.city,
            state: user.birthPlace.state,
            country: user.birthPlace.country || "India",
            latitude: user.birthPlace.latitude,
            longitude: user.birthPlace.longitude,
          },
        }
      : {
          name: "",
          birthTime: "",
          gender: undefined,
          birthPlace: {
            city: "",
            state: "",
            country: "India",
            latitude: 0,
            longitude: 0,
          },
        },
  });

  const fetchCoordinates = async () => {
    const formValues = form.getValues();
    const { city } = formValues.birthPlace;

    if (!city) {
      form.setError("birthPlace", {
        message: "Please fill all location fields",
      });
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/userapp/message/coordinates?location=${city}`,
        {
          headers: {
            Authorization: `Bearer ${storage.fetch.authToken()}`,
          },
        },
      );

      if (response.data) {
        form.setValue("birthPlace.latitude", response.data.latitude);
        form.setValue("birthPlace.longitude", response.data.longitude);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
      form.setError("birthPlace", { message: "Failed to fetch coordinates" });
    }
  };

  const handleSubmit = async () => {
    if (
      !form.getValues("birthPlace.latitude") ||
      !form.getValues("birthPlace.longitude")
    ) {
      form.setError("birthPlace", {
        message: "Please click 'Get Coordinates' to fetch location data",
      });
      return;
    }

    setLoading(true);
    try {
      await baseQuery({
        url: "/user/me",
        method: "PUT",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [form.watch("birthPlace.city")]);
  return (
    <div className="space-y-6">
      <HeadingPage
        heading="User Details"
        desc="Please fill in the details below to update your profile. It's mandatory to fill in the details below to continue."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mx-auto w-[96%]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your personal details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 grid md:grid-cols-2 grid-cols-1 gap-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <FieldContent>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />

              {/* Birth Date Field */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Field orientation="vertical">
                      <FieldLabel>Birth Date</FieldLabel>
                      <FieldContent>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />

              {/* Birth Time Field */}
              <FormField
                control={form.control}
                name="birthTime"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="birthTime">
                        Birth Time (Format: HH:MM (24-hour format))
                      </FieldLabel>

                      <FieldContent>
                        <FormControl>
                          <Input
                            id="birthTime"
                            type="time"
                            placeholder="Enter birth time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="gender">Gender</FieldLabel>

                      <FieldContent className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Birth Place Section */}
          <Card>
            <CardHeader>
              <CardTitle>Birth Place</CardTitle>
              <CardDescription>
                Enter the location details of your birth place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 grid md:grid-cols-3 grid-cols-1 gap-6">
              {/* City Field */}
              <FormField
                control={form.control}
                name="birthPlace.city"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="city">City</FieldLabel>
                      <FieldContent>
                        <FormControl>
                          <Input
                            id="city"
                            placeholder="Enter city name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />

              {/* State Field */}
              <FormField
                control={form.control}
                name="birthPlace.state"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="state">State</FieldLabel>
                      <FieldContent>
                        <FormControl>
                          <Input
                            id="state"
                            placeholder="Enter state name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />

              {/* Country Field */}
              <FormField
                control={form.control}
                name="birthPlace.country"
                render={({ field }) => (
                  <FormItem>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="country">Country</FieldLabel>
                      <FieldContent>
                        <FormControl>
                          <Input
                            id="country"
                            placeholder="Enter country name"
                            {...field}
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FieldContent>
                    </Field>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailsForm;
