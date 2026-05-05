import { Metadata } from "next";

import DataDeletionContent from "./DataDeletionContent"; // Your client component

export const metadata: Metadata = {
  title: "User Data Deletion Instructions | Dashupp",
  description: "Learn how to delete your data from our platform at any time.",
  openGraph: {
    title: "User Data Deletion Instructions | Dashupp",
    description: "Learn how to delete your data from our platform at any time.",
    url: "https://www.dashupp.com/data_deletion_instruction",
    siteName: "Dashupp",
    type: "website",
  },
};

export default function DataDeletionPage() {
  return <DataDeletionContent />;
}
