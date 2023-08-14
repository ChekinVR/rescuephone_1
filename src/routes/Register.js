import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { registerNewUser, registerNewUserDoc } from "../firebase/firebase";

export function Register() {
  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { tmpUser, setTmpUser, signup } = useAuth();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(userRegister);
      await signup(userRegister.email, userRegister.password);
      setTmpUser(userRegister);
      navigate("/profile/complete");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/missing-password") {
        setError("Porfavor coloca una contraseña :)");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/cheems-logo.png"
          alt="RescuePhone"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Bienvenido a la familia {userRegister.email}
        </h2>
        <div className="mt-4">{error && <Alert message={error} />}</div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tuemail@dominio.ltd"
                autoComplete="email"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 text-center ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 text-center ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p className="mt-14 text-center text-sm text-gray-500">
          Ya eres usuario?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Inicia Sesion Aqui!!
          </a>
        </p>
      </div>
    </div>
  );
}
