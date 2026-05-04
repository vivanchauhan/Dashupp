import { Metadata } from "next";
import DashboardContent from "./DashboardContent"; // Your client component

export const metadata: Metadata = {
  title: "Dashboard | Dashupp",
  description:
    "Track, analyze and optimize your Facebook and Google Ads in one clean dashboard.",
};

export default function HomePage() {
  return <DashboardContent />;
}
