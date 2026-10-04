"use client";

import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { adminLogin } from "@/lib/school-api";
import { z } from "zod";
const schoolAdminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});
type SchoolAdminLoginSchema = z.infer<typeof schoolAdminLoginSchema>;

const welcomeImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACng_5vWjo2VirfQG4VPr_jdUKkkdTvuKeSGr-FIPNjoodV7VTgv894EM1mMk1_naLwAjtrM7uwag6VsLtKR2UTkWVt5UCttfBsVTHfCVrFtDi5NBt6TaUc5BHY5vKrFQVwme7FoAxMzeD7zI9us-HQBKrOxxpMctp8uu5QD4oeXC-q6nbtcCaWKeqnbuHKupj06JMusehJUWdrtkbu_2G6jKWakWyg0nQv1HCjrqfVba0cINY84TM";

export default function SchoolAdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useForm<SchoolAdminLoginSchema>({
    resolver: zodResolver(schoolAdminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SchoolAdminLoginSchema) {
    setServerError("");
    try {
      const result = await adminLogin(values.email, values.password);
      if (!result.success) {
        setServerError(
          result.message || "The email or password you entered is incorrect.",
        );
        return;
      }
      router.replace("/admin/news-events");
      router.refresh();
    } catch {
      setServerError("We couldn’t reach the admin service. Please try again.");
    }
  }

  return (
    <main className="grid min-h-svh bg-[#fbf9f7] lg:grid-cols-[1fr_0.92fr]">
      <section className="relative flex min-h-svh flex-col px-6 py-7 sm:px-10 lg:px-16 xl:px-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-1/3 size-72 rounded-full bg-pink-100/70 blur-3xl"
        />
        <header className="relative flex items-center justify-between">
          {/* <Image src="/logo.svg" alt="The Manthan School" width={190} height={42} priority className="h-10 w-auto object-contain object-left" /> */}
          <span className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">
            <ShieldCheck className="size-4 text-emerald-600" /> Secure admin
            access
          </span>
        </header>

        <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          <div className="mb-8">
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-[#b5005d]/10 text-[#b5005d]">
              <LockKeyhole className="size-6" />
            </span>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#b5005d]">
              School administration
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-slate-600">
              Sign in to manage school news, events, and admission enquiries.
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="admin-email"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Email address
                    </label>
                    <FormControl>
                      <Input
                        {...field}
                        id="admin-email"
                        type="email"
                        autoComplete="username"
                        placeholder="you@school.org"
                        className="h-12 rounded-xl border-slate-300 bg-white px-4 shadow-sm placeholder:text-slate-400"
                        aria-invalid={Boolean(form.formState.errors.email)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="admin-password"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="h-12 rounded-xl border-slate-300 bg-white px-4 pr-12 shadow-sm placeholder:text-slate-400"
                          aria-invalid={Boolean(form.formState.errors.password)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition-colors hover:text-slate-900"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serverError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
                className="h-12 w-full rounded-xl bg-[#b5005d] text-[15px] font-semibold shadow-lg shadow-pink-900/15 hover:bg-[#99004f]"
              >
                Sign in to admin <ArrowRight className="size-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-7 flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            <p>
              Your sign-in is protected. This area is for authorized school
              administrators only.
            </p>
          </div>
        </div>

        <footer className="relative flex items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} The Manthan School</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-[#b5005d]" /> Learn · Grow · Soar
          </span>
        </footer>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#071c36] lg:block">
        <Image
          src={welcomeImage}
          alt="Students enjoying a sports day at school"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 0px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172c]/95 via-[#06172c]/25 to-[#06172c]/10" />
        <div className="absolute right-8 top-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
          The Manthan School · Noida
        </div>
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90 backdrop-blur-md">
            <Sparkles className="size-4 text-amber-300" /> A brighter future
            starts here
          </div>
          <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Every great school story begins with a curious mind.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
            One place to care for the stories, milestones, and families that
            make our campus special.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/90">
            <span className="size-2 rounded-full bg-emerald-400" />
            School admin portal
          </div>
        </div>
      </aside>
    </main>
  );
}
