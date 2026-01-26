"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white px-2 py-0.5 text-xs text-slate-600">
      {text}
    </span>
  );
}

export function Pill({ trend, text }: { trend: "up" | "down"; text: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        trend === "up" ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
      )}
    >
      {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      {text}
    </span>
  );
}

export function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-blue-600"
        style={{ width: `${Math.max(6, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Card({
  title,
  right,
  children,
  className,
  headerClassName,
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-white shadow-sm", className)}>
      {(title || right) && (
        <div className={cn("flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b", headerClassName)}>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {right}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>}
      <input
        {...props}
        className={cn(
          "w-full rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200",
          props.className
        )}
      />
    </label>
  );
}

export function Select({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>}
      <select
        {...props}
        className={cn(
          "w-full rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200",
          props.className
        )}
      >
        {children}
      </select>
    </label>
  );
}

export function TextArea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>}
      <textarea
        {...props}
        className={cn(
          "w-full rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200",
          props.className
        )}
      />
    </label>
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50",
        props.className
      )}
    />
  );
}

export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-50",
        props.className
      )}
    />
  );
}
