import { redirect, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { main_app_path } from 'src/router';


import { loginUser } from 'src/api/users';
// import login_svg from "src/assets/svg/pub.svg"
import logo_audit from "src/assets/images/logo_audit.png"
// import login_wave from "src/assets/images/wave_2.png"
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import './Login.css';
import { appTokenLabel } from 'src/api/axiosInstance';
import TitleSyled from 'src/components/others/TitleStyled';



const Login = () => {
  const isAccess = localStorage.getItem("accessToken-audit-visibility");
  const navigate = useNavigate();
  const toastErrorMsg = useRef(null);

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isloading, setIsloading] = useState(false);

  const showMessage = (ref, title, message) => {
    ref.current.show({
      severity: "error",
      content: () => (
        <div
          className="d-flex flex-column align-items-start py-2"
          style={{ flex: "1" }}
        >
          <div className="d-flex align-items-start gap-2">
            <i className="pi pi-times-circle h1 me-2"></i>
            <span className="fw-bold text-uppercase"> {title} </span>
          </div>
          <div className="fw-bolder fs-5 px-3 my-3 text-900">{message}</div>
        </div>
      ),
      life: 7000,
    });
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMotDePasseChange = (e) => {
    setMotDePasse(e.target.value);
  };

  
  const login = async (body) => {
    setIsloading(true);
    try {
      const response = await loginUser(body);
      if (response?.data?.access) {
      const dataResponse = response?.data;
      localStorage.setItem(appTokenLabel, dataResponse.access);
      localStorage.setItem("refreshToken-audit-visibility",
        dataResponse.refresh
      );
       redirect(`${main_app_path}/accueil`);
      }
    setIsloading(false);
      return response.data;
    } catch (error) {
    setIsloading(false);
       redirect(`/`);
      console.log("Erreur lors de la connexion", error);
       showMessage(
         toastErrorMsg,
         "Erreur Connexion",
         "Nom d'utilisateur ou mot de passe incorrect."
       );
      
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!!email && !!motDePasse) {
      const requestBody = {
        email: email,
        password: motDePasse,
      };
      await login(requestBody);
    } else {
      showMessage(
        toastErrorMsg,
        "Oupss !!",
        "Email et Mot de passe Obligatoires."
      );
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".login-audit-container .input");

    const addFocusClass = (e) => {
      let parent = e.target.parentNode.parentNode;
      parent.classList.add("focus");
    };

    const removeFocusClass = (e) => {
      let parent = e.target.parentNode.parentNode;
      if (e.target.value === "") {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", addFocusClass);
      input.addEventListener("blur", removeFocusClass);

      return () => {
        input.removeEventListener("focus", addFocusClass);
        input.removeEventListener("blur", removeFocusClass);
      };
    });
  }, []);

  useEffect(() => {
    if (!!isAccess) {
      return navigate(`${main_app_path}/accueil`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccess]);

  return (
    <>
      <Toast ref={toastErrorMsg} position="top-center" />

      <div className="login-audit-container-main">
        <div className="login-audit-container">
          {/* <img className="wave img-fluid" src={login_wave} alt="login_bg" /> */}
          <div className="login-container">
            <div className="login-container-second shadow rounded ">
              {/* <div className="img">
                <img src={login_svg} alt="login_svg" />
              </div> */}
              <div className="login-content">
                <form onSubmit={handleSubmit}>
                  <img src={logo_audit} alt="logo audit" />
                  {/* <h2 className="title text-uppercase">Audit de visibilité</h2> */}
                  <TitleSyled title="Audit de visibilité"/>
                  <div className="input-div one mt-5">
                    <div className="i">
                      <i className="pi pi-user"></i>
                    </div>
                    <div className="div">
                      <h5>Email</h5>
                      <input
                        type="email"
                        className="input"
                        required
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="i">
                      <i className="pi pi-lock"></i>
                    </div>
                    <div className="div">
                      <h5>Mot de passe</h5>
                      <input
                        type="password"
                        className="input"
                        required
                        value={motDePasse}
                        onChange={handleMotDePasseChange}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    loading={isloading}
                    label="Connexion"
                    className="rounded-pill w-100 mt-5"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
