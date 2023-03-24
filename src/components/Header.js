import logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a href="#" className="header__logo">
        <img className="header__logo-pic" src={logo} alt="Логотип" />
      </a>
    </header>
  );
}
