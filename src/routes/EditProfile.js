import style from "../routes/EditProfile.module.css";
import style2 from "../routes/CompleteProfileView.module.css";
import { useRef, useState } from "react";
import {
  getProfilePhotoUrl,
  getUserInfo,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbarView";

export function EditProfile() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  //const [error, setError] = useState();
  const fileRef = useRef();
  const [profileUrl, setProfileUrl] = useState(null);
  const [tmpUser, setTmpUser] = useState({
    username: "",
    name: "",
    lastname: "",
    birthday: "",
    gender: "",
    country: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setTmpUser({ ...tmpUser, [name]: value });
    console.log({ ...tmpUser, [name]: value });
  };

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(user.uid, imageData);

        if (res) {
          const usercInfo = await getUserInfo(user.uid);
          const tmpPUser = { ...usercInfo };
          console.log(tmpPUser.profilePicture);
          tmpPUser.profilePicture = res.metadata.fullPath;
          console.log(tmpPUser);
          await updateUser(tmpPUser);
          const url = await getProfilePhotoUrl(tmpPUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setError("");
    try {
      const userInfo = await getUserInfo(user.uid);
      const tmpUserSubmit = { ...userInfo };
      tmpUserSubmit.name = tmpUser.name;
      tmpUserSubmit.lastname = tmpUser.lastname;
      tmpUserSubmit.birthday = tmpUser.birthday;
      tmpUserSubmit.country = tmpUser.country;
      tmpUserSubmit.gender = tmpUser.gender;
      tmpUserSubmit.processCompleted = true;
      console.log(tmpUserSubmit);
      await updateUser(tmpUserSubmit);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      //setError(error.message);
    }
  };

  function handleClick() {
    logout();
  }

  return (
    <NavBar>
      <div className="w-full max-w-lg m-auto text-black content-center mx-auto mt-10 justify-content">
        <form onSubmit={handleSubmit}>
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                Edita tu perfil, {tmpUser.username}
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                La informacion que coloques, se utilizara para fines de
                funcionalidad de la pagina y se mantendra privada la informacion
              </p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="col-span-full">
                  <label
                    htmlFor="photo"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Foto
                  </label>
                  <div
                    class="mt-2 flex items-center gap-x-3"
                    className={style2.profilePictureContainer}
                  >
                    <img src={profileUrl} alt="" width={100} />
                    <button
                      type="button"
                      onClick={handleOpenFilePicker}
                      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cambiar
                    </button>
                    <input
                      type="file"
                      className={style.fileInput}
                      style={{ display: "none" }}
                      ref={fileRef}
                      onChange={handleChangeFile}
                      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                Información Personal
              </h2>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label
                    htmlFor="name"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre(s)
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="name"
                      required
                      id="name"
                      value={tmpUser.name}
                      autoComplete="given-name"
                      onChange={handleChange}
                      class="block w-full indent-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <label
                    htmlFor="name"
                    class="block text-sm font-low leading-6 text-gray-400"
                  >
                    Campo obligatorio*
                  </label>
                </div>

                <div class="sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Apellido(s)
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      required
                      value={tmpUser.lastname}
                      onChange={handleChange}
                      autoComplete="family-name"
                      class="block w-full text-left indent-2 rounded-md border-0 text py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <label
                    htmlFor="lastname"
                    class="block text-sm font-low leading-6 text-gray-400"
                  >
                    Campo obligatorio*
                  </label>
                </div>

                <div class="sm:col-span-3">
                  <label
                    htmlFor="birthday"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de Nacimiento
                  </label>
                  <div class="mt-2">
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      required
                      value={tmpUser.birthday}
                      onChange={handleChange}
                      autoComplete="date"
                      class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  sm:leading-6"
                    />
                  </div>
                  <label
                    htmlFor="birthday"
                    class="block text-sm font-low leading-6 text-gray-400"
                  >
                    Campo obligatorio*
                  </label>
                </div>

                <div class="sm:col-span-3">
                  <label
                    htmlFor="gender"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Genero
                  </label>
                  <div class="mt-2">
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                      autoComplete="gender"
                      value={tmpUser.gender}
                      class="block w-full rounded-md indent-1 border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Mujer</option>
                      <option>Hombre</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    htmlFor="country"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pais
                  </label>
                  <div class="mt-2">
                    <select
                      id="country"
                      name="country"
                      required
                      value={tmpUser.country}
                      onChange={handleChange}
                      autoComplete="country-name"
                      class="block w-full rounded-md indent-1 border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>México</option>
                    </select>
                  </div>
                  <label
                    htmlFor="country"
                    class="block text-sm font-low leading-6 text-gray-400"
                  >
                    Campo obligatorio*
                  </label>
                </div>

                <div class="col-span-full">
                  <label
                    htmlFor="street-address"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dirección
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      class="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ciudad
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      class="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    htmlFor="region"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Estado / Providencia
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      class="block w-full rounded-md indent-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Codigo Postal
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      class="block w-full rounded-md border-0 indent-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-end gap-x-6 pb-8">
            <button
              type="button"
              onClick={handleClick}
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </NavBar>
  );
}
