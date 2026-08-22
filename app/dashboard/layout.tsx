import DoerNavbar from '@/components/layout/DoerNavbar'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <DoerNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="w-full bg-white border-t border-[#E5E7EB] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold text-[#111827]">theDoers</div>
          <div className="flex items-center gap-6 text-sm text-[#6B7280]">
            <Link href="/terms" className="hover:text-[#111827]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#111827]">Privacy</Link>
            <Link href="/support" className="hover:text-[#111827]">Support</Link>
            <Link href="/feedback" className="hover:text-[#111827]">Feedback</Link>
          </div>
          <div className="text-xs text-[#9CA3AF]">
            theDoers © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}
