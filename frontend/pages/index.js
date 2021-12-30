import Head from "next/head";
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
    <div>
      <Head>
        <title>Supabase Auth + MetaMask</title>
        <meta name="description" content="Supabase Auth + MetaMask" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Supabase Auth + MetaMask</h1>

        {session ? <Account /> : <Auth />}
      </div>
    </div>
  );
}
