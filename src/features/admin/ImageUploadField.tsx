"use client";

import { useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import { uploadImage } from "@/services/uploads";
import { useAuthStore } from "@/stores/auth";
import type { UploadFolder } from "@/types/api";

type Props = {
  label: string;
  folder: UploadFolder;
  value: string;
  onChange: (url: string) => void;
  className?: string;
};

export function ImageUploadField({ label, folder, value, onChange, className }: Props) {
  const token = useAuthStore((s) => s.token);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!token) {
      setError("Not authenticated");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const result = await uploadImage(file, folder, token);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className}>
      <p className="text-sm font-medium text-white/88">{label}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading || !token}
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => onChange("")}
            className="text-sm font-semibold text-white/55 hover:text-white disabled:opacity-50"
          >
            Remove
          </button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => void onFileChange(e)}
        />
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-3 h-36 w-full max-w-sm rounded-2xl object-cover ring-1 ring-white/10"
        />
      ) : (
        <p className="mt-2 text-xs text-white/45">JPEG, PNG, WebP, or GIF · max 8MB</p>
      )}
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
