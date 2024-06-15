import { useOutletContext } from "react-router-dom";

export default function ProductDetailStorage() {
  const storage = useOutletContext().storage;

  return (
    <p>
      <strong>Recomendaciones de almacenamiento:</strong>
      <br></br>
      {storage ? storage : "—"}
    </p>
  );
}
