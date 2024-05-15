import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-layout">
      <div>
        <h1>Super Toco</h1>
        <p>
          Bienvenido a <em>Toco</em> app, hace las compras desde la comodidad de
          tu casa y recibilas en tu puerta.
        </p>
        <Link to="/products" className="btn btn-default">
          Empezar...
        </Link>
      </div>
      <img
        src="https://res.cloudinary.com/dbfn5lnvx/image/upload/q_auto,w_700/v1607770215/react-tutorial/supermarket/home.jpg"
        width="350"
        height="240"
        className="rounded home-image"
        alt=""
      />
    </div>
  );
}
