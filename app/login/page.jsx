// app/login/page.jsx
import LoginClient from "./LoginClient";

// Optional: force this route to be dynamic (no static prerender)
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return <LoginClient />;
}
