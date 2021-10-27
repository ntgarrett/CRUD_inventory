import Link from "next/link";
import productStyles from "../styles/Product.module.css";

// todo:  Add sorting (name, category, count)
//        Add search bar (name)

const ProductList = ({ inventory }) => {
  return (
    <>
      <div className={productStyles.table}>
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
                  <td id={productStyles["category"]}>{product.category}</td>
                  <td id={productStyles["count"]}>{product.count}</td>
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