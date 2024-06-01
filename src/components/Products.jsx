import { useState, useEffect } from "react";
import Product from "./Product";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch("http://127.0.0.1:8000/");
  //"https://react-tutorial-demo.firebaseio.com/"

  useEffect(() => {
    get("products")
      //"supermarket.json"
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log("Could not load products", error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Productos</h1>
      <p>
        Productos disponibles en stock:<br></br>
        <em>
          (los datos en inglés es porque son traidos con API desde un endpoint
          externo)
        </em>
      </p>
      <div className="products-grid">
        {loading && <Loader />}
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              details={product}
              cart={props.cart}
              onProductAdd={props.onProductAdd}
              onProductDelete={props.onProductDelete}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
