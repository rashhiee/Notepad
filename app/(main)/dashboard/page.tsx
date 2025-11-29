import Navbar from "@/app/components/layout/navbar";
import { RedirectToSignIn, SignInButton,
  SignUpButton, SignedIn,
  SignedOut,} from '@clerk/nextjs'
// export const dynamic = 'force-dynamic';

export default function DashboardPage() {
 return (
  <>
  <SignedIn>
    <div className="w-full bg-[#f3efe2]">

      <Navbar heading=" " />

    <div className="flex items-center bg-[#f3efe2] justify-center h-80vh">
      
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mt-[50px] mb-2">
          Welcome to Your Notes
        </h1>
        <p className="text-gray-600">
          Select a note from the sidebar or create a new one
        </p>
      </div>
    </div>
  </div>
  </SignedIn>
  <SignedOut>
  {/* <SignInButton></SignInButton> */}
  <RedirectToSignIn/>
  <SignUpButton/>
  </SignedOut>
  </>
  );
}
