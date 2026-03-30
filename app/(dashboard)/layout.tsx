import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-64 transition-all overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
