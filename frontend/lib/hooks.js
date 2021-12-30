import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";

export function useAuth() {
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const { active, activate } = useWeb3React();

  useEffect(async () => {
    if (active && processing) {
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
