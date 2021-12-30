import { useEffect, useState } from "react";
import Account from "@/components/Account";
import Auth from "@/components/Auth";
import supabase from "@/lib/supabase";

export default function Page() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md">
        <div className="text-center bg-white rounded-lg shadow-lg">
          <div className="px-12 py-6">
            <h1 className="mb-4 text-2xl font-bold">
              Supabase Auth + MetaMask
            </h1>

            {session ? <Account /> : <Auth />}
          </div>
        </div>
      </main>
    </div>
  );
}
