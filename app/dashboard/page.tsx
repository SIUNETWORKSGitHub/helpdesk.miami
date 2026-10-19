import { MemberDashboard } from "@/components/MemberDashboard";
import { Navigation } from "@/components/Navigation";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <MemberDashboard />
      </main>
    </div>
  );
}
