import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import supabase from "./supabase";

export function useAuth() {
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const { active, activate, library } = useWeb3React();

  useEffect(async () => {
    if (active && processing) {
      setProcessing(false);
      setMessage("Please sign message via MetaMask.");

      const signer = library.getSigner();
      const address = await signer.getAddress();
      let data;
      let signature;

      try {
        // nonce
        const response = await fetch("/api/nonce", {
          method: "POST",
          body: JSON.stringify({ address }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        data = await response.json();
      } catch (error) {
        setMessage(error.message);
        return;
      }

      try {
        signature = await signer.signMessage(data.nonce);
      } catch (error) {
        setMessage("Login was unsuccessful.");
        return;
      }

      try {
        // signature varification
        const response = await fetch("/api/varify", {
          method: "POST",
          body: JSON.stringify({ address, signature }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await response.json();

        setMessage("Logging in...");

        await supabase.auth.setSession(data.token);
      } catch (error) {
        setMessage(error.message);
        return;
      }
    }
  }, [active, processing]);

  const handleLogin = async () => {
    setProcessing(true);
    setMessage("Connnecting to MetaMask...");

    try {
      await activate(new InjectedConnector({}), null, true);
    } catch (error) {
      setMessage("Connection was unsuccessful.");
    }
  };

  return { message, handleLogin };
}
