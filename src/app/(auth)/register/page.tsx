import { RegisterForm } from "@/features/auth/RegisterForm";

export const metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-ink">Create an account</h1>
      <p className="mt-2 text-ink-soft">Register via /api/v1/auth/register, then we log you in.</p>
      <div className="panel mt-8 rounded-3xl p-6">
        <RegisterForm />
      </div>
    </main>
  );
}
