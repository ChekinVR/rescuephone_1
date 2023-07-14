import { useAuth } from "../context/authContext";
import { DashboardWrapper } from "../components/dashboardWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IsComplete from "./IsComplete";

export function Home() {
  const { user, logout, loading } = useAuth();
  const [state, setState] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  function handleUserNotRegistered(user) {
    navigate("/profile/complete");
  }

  if (loading) return <h1>Loading</h1>;

  return (
    <IsComplete onUserNotRegistered={handleUserNotRegistered}>
      <DashboardWrapper>
        <div className="w-full max-w-xs m-auto text-black mt-5">
          <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl mb-4">
              Welcome {user.displayName || user.email}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
            >
              Log Out
            </button>
          </div>
        </div>
      </DashboardWrapper>
    </IsComplete>
  );
}
