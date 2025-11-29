// import SidebarUI from "@/app/components/layout/sidebar";
import LeftbarUI from "@/app/components/layout/leftbar";
// import Navbar from "@/app/components/layout/navbar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f3efe2]">
     
      <LeftbarUI/>
      
      <div className="flex-1">{children}</div>
    </div>
  );
}
