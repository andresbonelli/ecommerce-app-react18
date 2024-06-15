import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Button from "./Button";
import useFetch from "../hooks/useFetch";

export default function Product(props) {
  const { details } = props;
  const [product, setProduct] = useState({});
  const { get } = useFetch("http://127.0.0.1:8000/");

  const productFromCart = props.cart.find(
    (product) => product.id === details.id
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  useEffect(() => {
    get(`products/${details.id}`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, []);

  return (
    <div className="product">
      <div
        className={clsx("product-image-container", {
          "out-of-stock": details.stock === 0,
        })}
      >
        <Link to={details.stock > 0 ? `/products/${details.id}` : null}>
          <img
            src={product.image_url}
            width="100"
            height="100"
            className={clsx("product-image", {
              "out-of-stock": details.stock === 0,
            })}
            alt={details.name}
          />
          {details.stock === 0 && (
            <div className="out-of-stock-label">SIN STOCK</div>
          )}
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={() => props.onProductDelete(details.id)}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        {details.stock > 0 && (
          <p className="product-available-quantity">
            {`unidades disponibles: ${details.stock - quantity}`}
          </p>
        )}
        <Button
          outline
          disabled={details.stock === 0 || quantity >= details.stock}
          onClick={() => props.onProductAdd(details)}
        >
          ${details.price}
        </Button>
      </div>
    </div>
  );
}
