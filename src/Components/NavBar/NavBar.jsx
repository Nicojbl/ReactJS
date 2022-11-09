import { CartWidget } from "../CartWidget/CartWidget";
import "./NavBar.css";
import Menu from "../../assets/images/menu.svg";
import Logo from "../../assets/images/logo.svg";

export const NavBar = () => {
  return (
    <nav className="nav">
      <a href="index.html">
        <img className="logo" src={Logo} alt="ebikes logo" />
      </a>
      <button className="nav-menu">
        <span>
          <img src={Menu} alt="menu" />
        </span>
      </button>
      <CartWidget />
      <ul className="nav-links">
        <li>
          <a className="nav-link nav-active" href="index.html">
            Home
          </a>
        </li>
        <li>
          <a className="nav-link" href="page/quienes_somos.html">
            Quienes somos
          </a>
        </li>
        <li>
          <a className="nav-link" href="page/contacto.html">
            Contacto
          </a>
        </li>
        <li>
          <a className="nav-link" href="page/iniciar_sesion.html">
            Iniciar Sesion
          </a>
        </li>
      </ul>
    </nav>
  );
};
