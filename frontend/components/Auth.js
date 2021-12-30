import { useAuth } from "@/lib/hooks";

export default function Auth() {
  const { message, handleLogin } = useAuth();

  return (
    <>
      <p>{message || "Connect MetaMask wallet to access your account."}</p>

      <button onClick={handleLogin}>MetaMask</button>
    </>
  );
}
