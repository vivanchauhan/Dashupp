import { Metadata } from "next";
import IntegrationContent from "./IntegrationContent"; // Your client component

export const metadata: Metadata = {
  title: "Integrations | Dashupp",
  description:
    "Connect, analyze and optimize your Facebook and Google Ads in one clean dashboard.",
};

export default function IntegrationsPage() {
  return <IntegrationContent />;
}
