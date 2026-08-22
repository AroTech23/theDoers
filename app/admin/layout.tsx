import AdminNavbar from '@/components/admin/AdminNavbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <AdminNavbar />
      <div className="flex-1">
        {children}
      </div>
      <footer className="border-t border-[#E5E7EB] bg-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} theDoers.com Administration Platform</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#4F46E5]">Privacy Policy</a>
            <a href="#" className="hover:text-[#4F46E5]">Terms of Service</a>
            <a href="#" className="hover:text-[#4F46E5]">Support</a>
            <a href="#" className="hover:text-[#4F46E5]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
