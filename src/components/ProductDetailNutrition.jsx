import { useOutletContext } from "react-router-dom";

export default function ProductDetailNutrition() {
  const product = useOutletContext();
  //const nutrition = product.nutrition;
  console.log(`Producto: ${product}`);

  return (
    <table className="table table-nutrition">
      <thead>
        <tr>
          <th>Nutrientes</th>
          <th>Cant. por porción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Proteinas</td>
          <td>{product.protein}g</td>
        </tr>
        <tr>
          <td>Carbohidratos</td>
          <td>{product.carbs}g</td>
        </tr>
        <tr>
          <td>Grasas</td>
          <td>{product.fat}g</td>
        </tr>
        <tr>
          <td>Sal</td>
          <td>{product.salt}g</td>
        </tr>
      </tbody>
    </table>
  );
}
