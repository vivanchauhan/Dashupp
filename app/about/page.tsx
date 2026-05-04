import { Metadata } from "next";
import AboutContent from "./AboutContent"; // Your client component

export const metadata: Metadata = {
  title: "About | Dashupp",
  description: "Learn about Dashupp and our mission to simplify ad management.",
};

export default function AboutPage() {
  return <AboutContent />;
}
