import supabase from "@/lib/supabase";

export default function Account() {
  const user = supabase.auth.user();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <p className="mb-2 text-base font-semibold text-gray-900">
        Logged in address:
      </p>

      <p className="mb-4 text-base text-gray-700 truncate">
        {user.user_metadata.address}
      </p>

      <button
        onClick={handleLogout}
        className="px-4 py-2 font-bold bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Logout
      </button>
    </>
  );
}
