import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import Logo from "../../assets/images/logo.svg";
import "./NavBar.css";

export const NavbarComponent = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <img className="logo" src={Logo} alt="ebikes logo" />
      </Link>
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
      <CartWidget />
    </nav>
  );
};
