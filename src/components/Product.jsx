import { Link } from "react-router-dom";
import clsx from "clsx";
import Button from "./Button";

export default function Product(props) {
  const { details } = props;

  const productFromCart = props.cart.find(
    (product) => product.id === details.id
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  return (
    <div className="product">
      <div
        className={clsx("product-image-container", {
          "out-of-stock": details.stock === 0,
        })}
      >
        <Link to={details.stock > 0 ? `/products/${details.id}` : null}>
          <img
            src={`https://beca0178-467f-4827-880f-b27b5fff42ea-dev.e1-us-cdp-2.choreoapis.dev/ecommerceapp/backend/v1/images/${details.image_id}`}
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
