import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps } from "@/components/poco/Steps";
import { SignInPanel } from "@/components/poco/SignInPanel";

export const Route = createFileRoute("/create/album/signin")({
  head: () => ({
    meta: [
      { title: "Sign in to publish your album — POCO" },
      { name: "description", content: "Sign in at the last step only, right before confirming and publishing your digital album." },
      { property: "og:title", content: "Sign in to publish your album — POCO" },
      { property: "og:description", content: "Login is required only immediately before publication." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  return (
    <FlowShell steps={albumSteps} current={7}>
      <div className="mx-auto max-w-md py-6">
        <SignInPanel onDone={() => navigate({ to: "/create/album/confirm" })} />
      </div>
    </FlowShell>
  );
}
