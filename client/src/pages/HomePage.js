import bodyBg from "../images/dark-mode-bg.png";
import logo from "../images/logoNoBg.png";
import { GiBiceps } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import RegisterForm from "../components/homepageComponents/RegisterForm";
import LoginForm from "../components/homepageComponents/LoginForm";
import useToggle from "../customHooks/toggleHook";

const HomePage = () => {
  const { toggleFunc: toggleRegister, isToggled: registerFormState } =
    useToggle();
  const { toggleFunc: toggleLogin, isToggled: loginFormState } = useToggle();

  return (
    <div className="homepage">
      {/* =============logo ===================== */}
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      {/* ====================bg img ======================== */}
      <div className="bg-container">
        <img src={bodyBg} alt="bg" className="bg-img" />
      </div>
      {/* ===============slogan and description ============= */}
      <article className="homepage-main">
        <div className="text-content">
          <div className="slogan">
            <h2>
              think <span>you</span> can,
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
          {/* =============toggle form   buttons ======================== */}

          <button className="btn toggle-register" onClick={toggleRegister}>
            get started
            <span>
              <GiBiceps style={{ color: "var(--white)" }} />
            </span>
          </button>
          <button className="btn toggle-login" onClick={toggleLogin}>
            login
            <span>
              <MdLogin style={{ color: "var(--white)" }} />
            </span>
          </button>
        </div>
      </article>
      {/* =======================Forms ===================== */}
      <RegisterForm formState={registerFormState} toggleForm={toggleRegister} />
      <LoginForm formState={loginFormState} toggleForm={toggleLogin} />
    </div>
  );
};

export default HomePage;
