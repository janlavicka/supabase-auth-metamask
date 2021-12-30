import { useAuth } from "@/lib/hooks";

export default function Auth() {
  const { message, handleLogin } = useAuth();

  return (
    <>
      <p className="mb-4 text-base text-gray-700">
        {message || "Connect MetaMask wallet to access your account."}
      </p>

      <button
        className="flex items-center justify-center w-full px-10 py-4 font-bold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300"
        onClick={handleLogin}
      >
        <img src="/metamask.svg" alt="MetaMask" className="h-8 mr-4" />
        MetaMask
      </button>
    </>
  );
}
