import { useState } from "react";

import bodyBg from "../images/dark-mode-bg.png";
import logo from "../images/logoNoBg.png";
import { GiBiceps } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import RegisterForm from "../components/homepageComponents/RegisterForm";
import LoginForm from "../components/homepageComponents/LoginForm";

const HomePage = () => {
  const [formsState, setFormsState] = useState([
    {
      name: "login",
      toggle: false,
    },
    {
      name: "sign up",
      toggle: false,
    },
  ]);

  const toggleForm = (e) => {
    let name = e.target.dataset.id;

    setFormsState((prevState) => {
      return prevState.map((form) => {
        return form.name === name ? { ...form, toggle: !form.toggle } : form;
      });
    });
  };

  return (
    <div className="homepage">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      <div className="bg-container">
        <img src={bodyBg} alt="bg" className="bg-img" />
      </div>
      <article className="homepage-main">
        <div className="text-content">
          <div className="slogan">
            <h2>
              think <span>you</span> can
            </h2>
            <h1>
              you <span>can!</span>
            </h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            delectus tenetur nesciunt laudantium eos beatae suscipit omnis,
            deserunt dolore eveniet.
          </p>
          <button
            className="btn toggle-register"
            data-id="sign up"
            onClick={toggleForm}
          >
            get started
            <span>
              <GiBiceps style={{ color: "var(--white)" }} />
            </span>
          </button>
          <button
            className="btn toggle-login"
            data-id="login"
            onClick={toggleForm}
          >
            login
            <span>
              <MdLogin style={{ color: "var(--white)" }} />
            </span>
          </button>
        </div>
      </article>

      <RegisterForm formState={formsState[1].toggle} toggleForm={toggleForm} />
      <LoginForm formState={formsState[0].toggle} toggleForm={toggleForm} />
    </div>
  );
};

export default HomePage;
