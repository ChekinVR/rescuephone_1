import style from "./dashboardWrapper.module.css";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export function NavBar({ children, user }) {
  const { logout } = useAuth();

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
        <div className={style.logo}>Logotipo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link onClick={handleLogout}>Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
}
/*
{state == 2 ? (
            <div className={style.logo} class="text-center">
              <img src={profileUrl} alt="" width={70} />
              <h1>{userInfo.username}</h1>
            </div>
          ) : (
            ""
          )}
          <Link to="/">Inicio</Link>
          <Link to="/profile">Perfil</Link>
          <Link onClick={handleLogout}>Cerrar Sesion</Link>
*/
