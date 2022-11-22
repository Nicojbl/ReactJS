import { CartWidget } from "../CartWidget/CartWidget";
import "./NavBar.css";
import Menu from "../../assets/images/menu.svg";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <img className="logo" src={Logo} alt="ebikes logo" />
      </Link>
      <button className="nav-menu">
        <span>
          <img src={Menu} alt="menu" />
        </span>
      </button>
      <CartWidget />
      <ul className="nav-links">
        <li>
          <Link className="nav-link nav-active" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/category/Bici">
            Bici
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/category/Moto">
            Moto
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/category/Monopatin">
            Monopatin
          </Link>
        </li>
      </ul>
    </nav>
  );
};
