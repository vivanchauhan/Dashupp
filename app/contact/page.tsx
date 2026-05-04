import { Metadata } from "next";
import ContactContent from "./ContactContent"; // Your client component

export const metadata: Metadata = {
  title: "Contact | Dashupp",
  description: "Get in touch with our team.",
};

export default function ContactPage() {
  return <ContactContent />;
}
