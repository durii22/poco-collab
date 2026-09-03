import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps } from "@/components/poco/Steps";
import { SignInPanel } from "@/components/poco/SignInPanel";

export const Route = createFileRoute("/create/exhibition/signin")({
  head: () => ({
    meta: [
      { title: "Sign in to publish your exhibition — POCO" },
      { name: "description", content: "Sign in at the last step only, right before confirming and publishing your online exhibition." },
      { property: "og:title", content: "Sign in to publish your exhibition — POCO" },
      { property: "og:description", content: "Login is required only immediately before publication." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  return (
    <FlowShell steps={exhibitionSteps} current={6}>
      <div className="mx-auto max-w-md py-6">
        <SignInPanel onDone={() => navigate({ to: "/create/exhibition/confirm" })} />
      </div>
    </FlowShell>
  );
}
