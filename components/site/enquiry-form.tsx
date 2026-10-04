"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, UserRound } from "lucide-react";
import {
  createEnquiry,
  ENQUIRY_CLASS_OPTIONS,
  EnquiryClass,
} from "@/lib/school-api";

export function EnquiryForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setFieldErrors({});
    const formData = new FormData(event.currentTarget);
    if (!formData.get("consent")) {
      setFieldErrors({
        consent: "Please agree to be contacted about admissions.",
      });
      setBusy(false);
      return;
    }
    try {
      const result = await createEnquiry({
        parentName: String(formData.get("parentName") || "").trim(),
        studentName: String(formData.get("studentName") || "").trim(),
        classApplying: String(
          formData.get("classApplying") || "",
        ) as EnquiryClass,
        mobile: String(formData.get("mobile") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        message: String(formData.get("message") || "").trim(),
      });
      if ("errors" in result) {
        setFieldErrors(result.errors || {});
        setMessage(
          result.message ||
            "We could not submit your enquiry. Please try again.",
        );
      } else {
        setDone(true);
        setMessage(result.message || "Thanks. Your enquiry has been received.");
      }
    } catch {
      setMessage("We could not connect to admissions. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[2rem] bg-white p-6 text-[#101c29] shadow-[0_12px_40px_rgba(0,46,94,.1)] sm:p-8 md:p-9"
    >
      <h2 className="font-display text-2xl font-black uppercase leading-tight text-[#b5005d] sm:text-3xl">
        Tell us about your child
      </h2>
      <p className="mt-2 text-xs leading-5 text-[#355f96] sm:text-sm">
        Five quick fields. We map age to programme so you do not have to guess.
      </p>
      {message && (
        <p
          role="status"
          className={`mt-5 rounded-xl px-4 py-3 text-sm ${done ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}
        >
          {message}
        </p>
      )}
      <div className="mt-6 grid gap-x-4 gap-y-4 sm:grid-cols-2">
        <Field
          name="parentName"
          label="Parent’s Full Name"
          placeholder="Your full name"
          icon={<UserRound size={15} />}
          error={fieldErrors.parentName}
          required
        />
        <Field
          name="studentName"
          label="Child’s Full Name"
          placeholder="Child’s full name"
          icon={<span>☺</span>}
          error={fieldErrors.studentName}
          required
        />
        <label className="grid gap-1.5 text-[10px] font-bold text-[#26313f]">
          Class Applying For <b className="text-[#b5005d]">*</b>
          <select
            required
            name="classApplying"
            aria-invalid={Boolean(fieldErrors.classApplying)}
            defaultValue=""
            className="h-10 rounded-lg border-0 bg-[#f4f6fc] px-3 text-xs font-medium outline-none focus:ring-2 focus:ring-[#98c0fd]"
          >
            <option value="" disabled>
              Select a programme
            </option>
            {ENQUIRY_CLASS_OPTIONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {fieldErrors.classApplying && (
            <span className="text-[10px] font-medium text-red-600">
              {fieldErrors.classApplying}
            </span>
          )}
        </label>
        <label className="grid gap-1.5 text-[10px] font-bold text-[#26313f]">
          Mobile Number <b className="text-[#b5005d]">*</b>
          <span className="flex h-10 overflow-hidden rounded-lg bg-[#f4f6fc]">
            <span className="grid place-items-center bg-[#e4efff] px-3 text-xs text-[#355f96]">
              +91
            </span>
            <input
              required
              name="mobile"
              type="tel"
              inputMode="tel"
              minLength={10}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              aria-invalid={Boolean(fieldErrors.mobile)}
              placeholder="9876543210"
              className="min-w-0 flex-1 bg-transparent px-3 text-xs font-medium outline-none"
            />
            <Phone size={14} className="mr-3 self-center text-[#8e6f77]" />
          </span>
          {fieldErrors.mobile && (
            <span className="text-[10px] font-medium text-red-600">
              {fieldErrors.mobile}
            </span>
          )}
        </label>
        <label className="grid gap-1.5 text-[10px] font-bold text-[#26313f] sm:col-span-2">
          Email Address{" "}
          <span className="float-right text-[9px] text-[#8e6f77]">
            Optional
          </span>
          <span className="flex h-10 items-center rounded-lg bg-[#f4f6fc] px-3">
            <input
              name="email"
              type="email"
              aria-invalid={Boolean(fieldErrors.email)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none"
            />
            <Mail size={14} className="text-[#8e6f77]" />
          </span>
          {fieldErrors.email && (
            <span className="text-[10px] font-medium text-red-600">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <label className="grid gap-1.5 text-[10px] font-bold text-[#26313f] sm:col-span-2">
          Specific Questions or Notes{" "}
          <span className="float-right text-[9px] text-[#8e6f77]">
            Optional
          </span>
          <textarea
            name="message"
            rows={3}
            className="rounded-lg bg-[#f4f6fc] px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#98c0fd]"
            placeholder="How can we help?"
          />
        </label>
      </div>
      <label className="mt-5 flex items-start gap-2 text-[10px] leading-4 text-[#5a3f47]">
        <input
          name="consent"
          type="checkbox"
          className="mt-0.5 size-3.5 accent-[#b5005d]"
        />
        <span>
          I agree to be contacted about admissions at The Manthan School Noida
          campus via Call, WhatsApp, or SMS.
        </span>
      </label>
      {fieldErrors.consent && (
        <p className="mt-1 text-[10px] font-medium text-red-600">
          {fieldErrors.consent}
        </p>
      )}
      <button
        disabled={busy || done}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e01276] px-6 py-3.5 text-xs font-extrabold uppercase text-white shadow-[0_8px_18px_rgba(181,0,93,.25)] transition hover:bg-[#b5005d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Submitting…" : done ? "Enquiry received" : "Submit enquiry"}
        <ArrowRight size={16} />
      </button>
      <Link
        href="/enquiry"
        className="mt-4 block text-center text-[10px] font-extrabold text-[#00666e]"
      >
        Start complete online registration directly →
      </Link>
      <p className="mt-3 border-t border-[#e4efff] pt-3 text-center text-[9px] font-semibold text-[#8e6f77]">
        ▤ &nbsp; Age Criteria &nbsp; • &nbsp; ▣ Fee Structure &nbsp; • &nbsp; ⇩
        Download Brochure
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  icon,
  required = false,
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="grid gap-1.5 text-[10px] font-bold text-[#26313f]">
      {label} {required && <b className="text-[#b5005d]">*</b>}
      <span className="flex h-10 items-center rounded-lg bg-[#f4f6fc] px-3">
        <input
          required={required}
          name={name}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none"
        />
        {icon}
      </span>
      {error && (
        <span className="text-[10px] font-medium text-red-600">{error}</span>
      )}
    </label>
  );
}
