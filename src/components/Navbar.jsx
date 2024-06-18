import { NavLink } from "react-router-dom";
import Button from "./Button";

export default function Navbar(props) {
  const { isDarkTheme, onThemeClick } = props;
  const cartCount = props.cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperToco
      </NavLink>
      <ul>
        <li className="nav-item">
          <Button className="theme-switcher" onClick={onThemeClick}>
            {isDarkTheme ? "🌞" : "🌚"}
          </Button>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/about"
          >
            Acerca de
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/products"
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Carrito ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
