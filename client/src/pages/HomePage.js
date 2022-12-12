import bodyBg from "../images/dark-mode-bg.png";
import logo from "../images/logo1.svg";

const HomePage = () => {
  return (
    <div className="Homepage">
      <img src={logo} alt="logo" className="logo-img" />
      <div className="bg-container">
        <img src={bodyBg} alt="bg" className="bg-img" />
      </div>
    </div>
  );
};

export default HomePage;
