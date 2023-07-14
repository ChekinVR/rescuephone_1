import { Link } from "react-router-dom";
import style from "./dashboardWrapper.module.css";
import { useAuth } from "../context/authContext";

export function DashboardWrapper({ children }) {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <nav className={style.nav}>
        <div className={style.logo}>
          <img src="/cheems-logo.png" alt="" width={100} />
        </div>
        <Link to="/">Inicio</Link>
        <Link to="/profile">Perfil</Link>
        <Link onClick={handleLogout}>Cerrar Sesion</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
}
