import supabase from "../lib/supabase";

export default function Account() {
  const user = supabase.auth.user();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <p>Logged in address:</p>

      <p>{user.user_metadata.address}</p>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
