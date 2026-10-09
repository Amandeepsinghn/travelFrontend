import { RegisterForm } from "@/features/auth/RegisterForm";

export const metadata = {
  title: "Become member",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-ink">Create an account</h1>
      <p className="mt-2 text-ink-soft">Join Trail Panda and start planning your next trip.</p>
      <div className="panel mt-8 overflow-hidden rounded-3xl p-6">
        <RegisterForm />
      </div>
    </main>
  );
}
