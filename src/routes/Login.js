import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  //Funcion para que incie sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //Se manda la peticiòn con un intento o error
    try {
      //Si se completa la peticion se realiza el metodo de incio de sesión
      await login(user.email, user.password);
      //lo llevamos a la pagina de incio con la sesiòn y iniciada
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/missing-password") {
        setError("Porfavor coloca una contraseña :)");
      } else if (error.code === "auth/wrong-password") {
        setError(
          "La contraseña que colocaste es incorrecta, intentalo de nuevo"
        );
      } else {
        setError(error.code);
      }
    }
  };

  const handleGoogSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Porfavor ingresa tu correo");
    try {
      await resetPassword(user.email);
      setError(
        "Te hemos enviado un correo a tu direccion de correo electronico para que restablezcas tu contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center text-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/cheems-logo.png"
          alt="RescuePhone"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Bienvenido {user.email}, Inicia Sesión
        </h2>
        <div className="mt-4">{error && <Alert message={error} />}</div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <div className="text-sm text-right mt-2">
              <a
                href="#!"
                onClick={handleResetPassword}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Olvidaste tu Contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="mx-auto h-10 w-auto text-center">
            <p> Acceso rápido con</p>
            <input
              className="mt-2 mx-auto h-10 w-auto hover:bg-black-700"
              type="image"
              onClick={handleGoogSignin}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Iniciar sesion con google"
            ></input>
          </div>
        </form>

        <p className="mt-14 text-center text-sm text-gray-500">
          No eres usuario?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Registrate Aqui!!
          </a>
        </p>
      </div>
    </div>
  );
}
