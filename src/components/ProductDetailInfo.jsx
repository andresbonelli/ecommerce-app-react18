import { useOutletContext } from "react-router-dom";
import Button from "./Button";

export default function ProductDetailInfo({ onProductAdd }) {
  const product = useOutletContext();

  return (
    <>
      <p>
        {product.description} - precio: <strong>${product.price}</strong> por
        unidad.
      </p>
      <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
    </>
  );
}
