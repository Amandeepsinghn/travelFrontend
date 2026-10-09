"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ApiError } from "@/lib/api";
import { isAdmin } from "@/lib/auth";
import { cn } from "@/lib/utils";
import * as commentsApi from "@/services/comments";
import { useAuthStore } from "@/stores/auth";
import type { CommentOut } from "@/types/api";

type Target = "package" | "hotel";

type Props = {
  target: Target;
  slug: string;
  initialComments: CommentOut[];
};

function formatWhen(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm text-sun" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-ink/20">{"★".repeat(Math.max(0, 5 - rating))}</span>
    </span>
  );
}

export function CommentSection({ target, slug, initialComments }: Props) {
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  const [comments, setComments] = useState(initialComments);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return;

    const trimmed = body.trim();
    if (!trimmed) {
      setError("Write something first.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const payload = {
        body: trimmed,
        rating: rating ?? undefined,
      };
      const created =
        target === "package"
          ? await commentsApi.createPackageComment(slug, payload, token)
          : await commentsApi.createHotelComment(slug, payload, token);
      setComments((prev) => [created, ...prev]);
      setBody("");
      setRating(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not post comment");
    } finally {
      setPending(false);
    }
  }

  async function onDelete(id: number) {
    if (!token) return;
    setDeletingId(id);
    setError(null);
    try {
      await commentsApi.deleteComment(id, token);
      setComments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete comment");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="panel rounded-3xl p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">
            Comments
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {comments.length
              ? `${comments.length} review${comments.length === 1 ? "" : "s"}`
              : "Be the first to leave a note."}
          </p>
        </div>
      </div>

      {hydrated && user && token ? (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 border-t border-ink/8 pt-6">
          <Textarea
            label="Your comment"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={2000}
            required
            placeholder="How was the trip or stay?"
          />
          <div>
            <p className="text-sm font-medium text-ink">Rating (optional)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating((current) => (current === value ? null : value))}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-semibold transition",
                    rating === value
                      ? "bg-lagoon text-white"
                      : "bg-white/70 text-ink-soft ring-1 ring-ink/10 hover:text-ink",
                  )}
                  aria-pressed={rating === value}
                >
                  {value}★
                </button>
              ))}
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Posting…" : "Post comment"}
          </Button>
        </form>
      ) : (
        <p className="mt-6 border-t border-ink/8 pt-6 text-sm text-ink-soft">
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="font-semibold text-lagoon hover:text-lagoon-deep"
          >
            Log in
          </Link>{" "}
          to leave a comment.
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {comments.length ? (
          comments.map((comment) => {
            const canDelete =
              !!user &&
              (user.id === comment.user.id || isAdmin(user));
            return (
              <li
                key={comment.id}
                className="rounded-2xl border border-ink/8 bg-white/55 px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">
                      {comment.user.first_name} {comment.user.last_name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink/55">
                      {formatWhen(comment.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {comment.rating ? <Stars rating={comment.rating} /> : null}
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => void onDelete(comment.id)}
                        disabled={deletingId === comment.id}
                        className="text-xs font-semibold text-ink-soft hover:text-red-600 disabled:opacity-50"
                      >
                        {deletingId === comment.id ? "Removing…" : "Delete"}
                      </button>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                  {comment.body}
                </p>
              </li>
            );
          })
        ) : (
          <li className="text-sm text-ink-soft">No comments yet.</li>
        )}
      </ul>
    </section>
  );
}
