import { useOutletContext } from "react-router-dom";

export default function ProductDetailNutrition() {
  const product = useOutletContext();

  return (
    <table className="table table-nutrition">
      <thead>
        <tr>
          <th>Nutrientes</th>
          <th>Cant. por porción (g.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Proteinas</td>
          <td>{product.protein ?? "—"}</td>
        </tr>
        <tr>
          <td>Carbohidratos</td>
          <td>{product.carbs ?? "—"}</td>
        </tr>
        <tr>
          <td>Grasas</td>
          <td>{product.fat ?? "—"}</td>
        </tr>
        <tr>
          <td>Sal</td>
          <td>{product.salt ?? "—"}</td>
        </tr>
      </tbody>
    </table>
  );
}
