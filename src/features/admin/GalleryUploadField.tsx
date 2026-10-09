"use client";

import { useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import { uploadImage } from "@/services/uploads";
import { useAuthStore } from "@/stores/auth";
import type { UploadFolder } from "@/types/api";

type Props = {
  label?: string;
  folder: UploadFolder;
  urls: string[];
  onChange: (urls: string[]) => void;
  className?: string;
};

export function GalleryUploadField({
  label = "Gallery images",
  folder,
  urls,
  onChange,
  className,
}: Props) {
  const token = useAuthStore((s) => s.token);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;

    if (!token) {
      setError("Not authenticated");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const result = await uploadImage(file, folder, token);
        uploaded.push(result.url);
      }
      onChange([...urls, ...uploaded]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white/88">{label}</p>
          <p className="mt-0.5 text-xs text-white/45">
            {urls.length
              ? `${urls.length} image${urls.length === 1 ? "" : "s"} · JPEG, PNG, WebP, GIF · max 8MB each`
              : "Add multiple images for the package gallery"}
          </p>
        </div>
        <button
          type="button"
          disabled={uploading || !token}
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : urls.length ? "Add images" : "Upload images"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => void onFileChange(e)}
        />
      </div>

      {urls.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {urls.map((url, index) => (
            <li
              key={`${url}-${index}`}
              className="overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-36 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 bg-black/25 px-3 py-2">
                <span className="text-xs text-white/55">#{index + 1}</span>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => removeAt(index)}
                  className="text-xs font-semibold text-red-300 hover:text-red-200 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
