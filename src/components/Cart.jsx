import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Input from "./Input";
import Button from "./Button";

// TODO: Replace with your own publishable key
const stripeLoadedPromise = loadStripe("PK_REPLACE_WITH_YOUR_PUBLISHABLE_KEY");

export default function Cart(props) {
  const navigate = useNavigate();
  const { post } = useFetch("http://127.0.0.1:8000/");
  const { cart, setCart, onProductDelete } = props;
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const [email, setEmail] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    const lineItems = cart.map((product) => {
      return {
        id: product.id,
        price: product.price_id,
        quantity: product.quantity,
      };
    });

    // send request to backend to update products stock, clear cart and redirect to home.
    post("update_stock/", { cart: lineItems });
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/");

    // Stripe checkout code for later implementation
    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "/",
          cancelUrl: "/",
          customerEmail: email,
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Carrito de compras</h1>
        {cart.length === 0 && (
          <p>Aún no has añadido productos a tu carrito :(</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Producto
                  </th>
                  <th width="20%">Precio</th>
                  <th width="10%">Cantidad</th>
                  <th width="20%">Total</th>
                  <th width="5%"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={`http://127.0.0.1:8000/images/${product.image_id}`}
                          width="30"
                          height="30"
                          alt={product.name}
                        />{" "}
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                      <td>
                        <Button
                          outline
                          onClick={() => onProductDelete(product.id)}
                          className="product-delete"
                        >
                          x
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Ingresar mail para registrarse y pagar
                <br />
                <em>(metodo de pago aún no implementado)</em>
                <br></br>Sistema de checkout:
                <a href="https://stripe.com/payments/checkout"> stripe.com</a>
              </p>
              <Input
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                required
              />
              <Button type="submit">Continuar compra...</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
