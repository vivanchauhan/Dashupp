import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-[var(--border)] pt-10 pb-6 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* BRAND */}
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-achiko text-3xl font-extrabold   group-hover:opacity-80 transition bg-[var(--background)] text-[var(--foreground)] ">
                DASHUPP
              </span>
            </Link>
            <p>
              Track and analyze your ad performance across platforms in one
              clean dashboard.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="font-medium text-[var(--foreground)] mb-3">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="hover:text-white transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/integrations"
                  className="hover:text-white transition"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-medium text-[var(--foreground)] mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>

              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/data_deletion_instruction"
                  className="hover:text-white transition"
                >
                  User Data Deletion Instructions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[var(--border)] pt-6">
          <p>© {new Date().getFullYear()} Dashupp. All rights reserved.</p>

          <p className="mt-2 md:mt-0">
            Built with Next.js, Supabase & ❤️ by Vivan
          </p>
        </div>
      </div>
    </footer>
  );
}
