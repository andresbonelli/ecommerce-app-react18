import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import Button from "./Button";
import useFetch from "../hooks/useFetch";

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const params = useParams();
  const { cart } = props;

  const productFromCart = cart.find(
    (existingProduct) => existingProduct.id === product.id
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <div className="product-image-container">
          <img
            src={product.image}
            width="125"
            height="125"
            className="product-details-image"
            alt={product.name}
          />
          {quantity > 0 && (
            <div className="product-quantity-container">
              <div className="product-quantity">{quantity}</div>
            </div>
          )}
          <div>
            {quantity > 0 && (
              <Button
                outline
                onClick={() => props.onProductDelete(product.id)}
                className="product-delete"
              >
                x
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to=""
                end
              >
                Detalle
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="nutrition"
              >
                Info nutricional
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "tab-active" : "")}
                to="storage"
              >
                Almacenamiento
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet context={product} />
      </div>
    </div>
  );
}
