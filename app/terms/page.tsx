import { Metadata } from "next";

import TermsContent from "./TermsContent"; // Your client component

export const metadata: Metadata = {
  title: "Terms of Service | Dashupp",
  description:
    "Read our terms of service and understand how we collect, use, and protect your data.",
};

export default function TermsPage() {
  return <TermsContent />;
}
