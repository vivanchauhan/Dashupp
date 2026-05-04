import Sidebar from "@/components/Sidebar";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  // return<div className="flex">{children}</div>;
  // }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-6  flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
