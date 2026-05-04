import { Metadata } from "next";
import LoginContent from "./LoginContent"; // Your client component

export const metadata: Metadata = {
  title: "Login | Dashupp",
  description:
    "Login to Track, analyze and optimize your Meta and Google Ads in one clean dashboard.",
};

export default function LoginPage() {
  return <LoginContent />;
}
