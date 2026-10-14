"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { inquiryTypes, type InquiryType } from "@/config/site";
import {
  LIMITS,
  contactSchema,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact/schema";
import { Arrow, buttonClasses } from "@/components/ui/Button";

type Values = Record<ContactField, string>;
type Errors = Partial<Record<ContactField, string>>;

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "inquiry", "message"];

const messageHints: Record<InquiryType | "", string> = {
  digital: "What are you looking to build or improve? Any timeline or budget range helps.",
  partnership: "What do you supply, in what quantities, and how do you prefer to work?",
  resale: "What do you have available? Include condition, quantity, and your asking price if you have one.",
  general: "How can we help?",
  "": "Tell us a little about what you have in mind.",
};

function validate(values: Values): Errors {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

const idle: ContactFormState = { status: "idle" };

export function ContactForm({ defaultInquiry }: { defaultInquiry: InquiryType | null }) {
  // Without JavaScript the form posts natively to the Server Action and this state carries the result.
  const [nativeState, formAction] = useActionState(submitInquiry, idle);
  const [result, setResult] = useState<ContactFormState | null>(null);
  const state = result ?? nativeState;

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    company: "",
    inquiry: defaultInquiry ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const mountedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const id = (f: string) => `${uid}-${f}`;

  function update(field: ContactField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      // Re-validate the edited field so its message clears as soon as it's fixed.
      const next = validate({ ...values, [field]: value });
      setErrors((e) => ({ ...e, [field]: next[field] }));
    }
  }

  function onBlur(field: ContactField) {
    // Don't flag empty fields on blur; that happens on submit.
    if (!values[field]) return;
    const next = validate(values);
    setErrors((e) => ({ ...e, [field]: next[field] }));
  }

  function focusField(field: ContactField) {
    const el =
      field === "inquiry"
        ? formRef.current?.querySelector<HTMLInputElement>('input[name="inquiry"]:checked, input[name="inquiry"]')
        : formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`);
    el?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setResult({ status: "error", message: "Please correct the highlighted fields." });
      const first = FIELD_ORDER.find((f) => clientErrors[f]);
      if (first) focusField(first);
      return;
    }

    const formData = new FormData(event.currentTarget);
    if (mountedAt.current) formData.set("startedAt", String(mountedAt.current));

    setPending(true);
    setResult(null);
    try {
      const response = await submitInquiry(idle, formData);
      setResult(response);
      if (response.status === "error") {
        setErrors(response.fieldErrors ?? {});
        requestAnimationFrame(() => {
          const first = FIELD_ORDER.find((f) => response.fieldErrors?.[f]);
          if (first) focusField(first);
          else alertRef.current?.focus();
        });
      } else {
        setErrors({});
      }
    } catch {
      setResult({
        status: "error",
        message: "We couldn’t reach the server, so your message was not sent. Check your connection and try again.",
      });
      requestAnimationFrame(() => alertRef.current?.focus());
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setValues({ name: "", email: "", company: "", inquiry: defaultInquiry ?? "", message: "" });
    setErrors({});
    setResult({ status: "idle" });
    mountedAt.current = Date.now();
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus());
  }

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-paper-line bg-paper p-8 sm:p-10" role="status">
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-accent text-white">
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 ref={successRef} tabIndex={-1} className="display mt-8 text-4xl outline-none">
          Message sent.
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          Thanks for reaching out. Your message was delivered, and we’ll reply to the email address you provided.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          <button type="button" onClick={reset} className="font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink">
            Send another message
          </button>
          <Link href="/" className="font-medium underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const fieldErrors: Errors = result ? errors : { ...(nativeState.status === "error" ? nativeState.fieldErrors : {}), ...errors };
  const describedBy = (f: ContactField, extra?: string) =>
    [fieldErrors[f] ? id(`${f}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
      aria-describedby={id("required-note")}
      className="relative rounded-2xl border border-paper-line bg-paper p-6 sm:p-10"
    >
      <p id={id("required-note")} className="text-sm text-muted">
        Fields marked <span aria-hidden="true" className="text-accent">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div
        ref={alertRef}
        tabIndex={-1}
        role="alert"
        className={state.status === "error" ? "mt-6 rounded-xl border border-danger/30 bg-danger/[0.06] px-5 py-4 text-[0.95rem] text-danger outline-none" : "sr-only"}
      >
        {state.status === "error" ? state.message : ""}
      </div>

      <div className="mt-8 grid gap-7 sm:grid-cols-2">
        <Field id={id("name")} label="Name" required error={fieldErrors.name} errorId={id("name-error")}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={inputClass(!!fieldErrors.name)}
          />
        </Field>

        <Field id={id("email")} label="Email" required error={fieldErrors.email} errorId={id("email-error")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={inputClass(!!fieldErrors.email)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={id("company")}
            label="Company name"
            hint="Optional"
            error={fieldErrors.company}
            errorId={id("company-error")}
          >
            <input
              id={id("company")}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.company.max}
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              onBlur={() => onBlur("company")}
              aria-invalid={fieldErrors.company ? true : undefined}
              aria-describedby={describedBy("company")}
              className={inputClass(!!fieldErrors.company)}
            />
          </Field>
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-describedby={fieldErrors.inquiry ? id("inquiry-error") : undefined}
        >
          <legend className="text-[0.95rem] font-medium">
            Inquiry type <span aria-hidden="true" className="text-accent">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {inquiryTypes.map((t) => (
              <label
                key={t.value}
                className={`group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[0.95rem] transition-colors duration-200 has-[:checked]:border-accent has-[:checked]:bg-accent/[0.05] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                  fieldErrors.inquiry ? "border-danger/50" : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="inquiry"
                  value={t.value}
                  required
                  checked={values.inquiry === t.value}
                  onChange={() => update("inquiry", t.value)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="flex size-4 shrink-0 items-center justify-center rounded-full border border-ink/35 transition-colors peer-checked:border-accent peer-checked:bg-accent"
                >
                  <span className="size-1.5 rounded-full bg-paper" />
                </span>
                {t.label}
              </label>
            ))}
          </div>
          {fieldErrors.inquiry ? <ErrorText id={id("inquiry-error")}>{fieldErrors.inquiry}</ErrorText> : null}
        </fieldset>

        <div className="sm:col-span-2">
          <Field
            id={id("message")}
            label="Message"
            required
            error={fieldErrors.message}
            errorId={id("message-error")}
          >
            <textarea
              id={id("message")}
              name="message"
              required
              rows={7}
              minLength={LIMITS.message.min}
              maxLength={LIMITS.message.max}
              placeholder={messageHints[values.inquiry as InquiryType | ""]}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              onBlur={() => onBlur("message")}
              aria-invalid={fieldErrors.message ? true : undefined}
              aria-describedby={describedBy("message", id("message-count"))}
              className={`${inputClass(!!fieldErrors.message)} min-h-40 resize-y py-3 leading-relaxed`}
            />
          </Field>
          <p id={id("message-count")} className="mt-2 text-right font-mono text-xs text-muted">
            {values.message.length.toLocaleString()} / {LIMITS.message.max.toLocaleString()}
            <span className="sr-only"> characters</span>
          </p>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-5 border-t border-paper-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          We use your details only to respond to this inquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
            privacy notice
          </Link>
          .
        </p>
        <button type="submit" disabled={pending} className={buttonClasses("primary", "min-w-44")}>
          {pending ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
              />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <Arrow />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {pending ? "Sending your message." : ""}
      </p>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `mt-2 block w-full rounded-xl border bg-white/60 px-4 py-3 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-muted/80 focus:bg-white focus:outline-none focus-visible:outline-none focus:ring-4 ${
    invalid
      ? "border-danger/60 focus:border-danger focus:ring-danger/15"
      : "border-ink/15 hover:border-ink/35 focus:border-accent focus:ring-accent/15"
  }`;
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-[0.95rem] font-medium">
        <span>
          {label} {required ? <span aria-hidden="true" className="text-accent">*</span> : null}
        </span>
        {hint ? <span className="text-sm font-normal text-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-danger">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-3.5 shrink-0" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.5h1.5v4.75h-1.5V4.5zm0 6h1.5V12h-1.5v-1.5z" />
      </svg>
      <span>{children}</span>
    </p>
  );
}
