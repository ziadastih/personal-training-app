import bodyBg from "../images/dark-mode-bg.png";
import logo from "../images/logoMask.png";
import { GiBiceps } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
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
          <button className="btn toggle-register">
            get started
            <span>
              <GiBiceps style={{ color: "var(--white)" }} />
            </span>
          </button>
          <button className="btn toggle-login">
            login
            <span>
              <MdLogin style={{ color: "var(--white)" }} />
            </span>
          </button>
        </div>
      </article>

      <RegisterForm />
    </div>
  );
};

export default HomePage;
