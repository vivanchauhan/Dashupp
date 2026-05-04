import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent"; // Your client component

export const metadata: Metadata = {
  title: "Privacy Policy | Dashupp",
  description:
    "Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
