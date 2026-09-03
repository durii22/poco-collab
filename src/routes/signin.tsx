import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header, Footer } from "@/components/poco/Header";
import { SignInPanel } from "@/components/poco/SignInPanel";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — POCO" },
      { name: "description", content: "Sign in to POCO to publish and manage your exhibitions and digital albums." },
      { property: "og:title", content: "Sign in — POCO" },
      { property: "og:description", content: "Prototype sign-in for the POCO exhibition and album builder." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Header back />
      <main className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <SignInPanel onDone={() => navigate({ to: "/" })} />
      </main>
      <Footer />
    </div>
  );
}
