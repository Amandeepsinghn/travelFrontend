import { ProfilePanel } from "@/features/auth/ProfilePanel";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-ink">Your profile</h1>
      <p className="mt-2 text-ink-soft">Loaded from /api/v1/auth/me with your bearer token.</p>
      <div className="panel mt-8 rounded-3xl p-6">
        <ProfilePanel />
      </div>
    </main>
  );
}
