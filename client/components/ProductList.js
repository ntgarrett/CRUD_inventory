import productStyles from "../styles/Product.module.css";

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
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td id={productStyles["category"]}>{product.category}</td>
                <td id={productStyles["count"]}>{product.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;