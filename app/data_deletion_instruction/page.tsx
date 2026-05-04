import { Metadata } from "next";

import DataDeletionContent from "./DataDeletionContent"; // Your client component

export const metadata: Metadata = {
  title: "User Data Deletion Instructions | Dashupp",
  description: "Learn how to delete your data from our platform at any time.",
};

export default function DataDeletionPage() {
  return <DataDeletionContent />;
}
