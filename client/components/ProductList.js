import Link from "next/link";
import tableStyles from "../styles/ProductList.module.css";

// todo:  Add sorting (name, category, count)
//        Add search bar (name)

const ProductList = ({ inventory }) => {
  return (
    <>
      <div className={tableStyles.table}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td id={tableStyles["category"]}>{product.category}</td>
                  <td id={tableStyles["count"]}>{product.count}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;