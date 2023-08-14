import { useAuth } from "../context/authContext";
import { NavBar } from "../components/navbarView";

export function Home() {
  const { user, userInfo, logout, loading } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <NavBar userInfo>
      <div className="w-full max-w-xs m-auto text-black mt-5">
        <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl mb-4">
            Bienvenido,
            {"" + userInfo.username ||
              " " + user.displayName ||
              " " + user.email}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          >
            Log Out
          </button>
        </div>
      </div>
    </NavBar>
  );
}
