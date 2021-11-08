import Link from "next/link";
import tableStyles from "../styles/ProductList.module.css";

// todo:  Add sorting (name, category, count)
//        Add search bar (name)

const ProductList = ({ inventory }) => {
  return (
    <>
      <div className={tableStyles.table}>
        <table id="inventoryTable">
          <thead>
            <tr>
              <th 
                className={tableStyles.nameCol}
              >
                Name
              </th>
              <th 
                className={tableStyles.descriptionCol}
              >
                Description
              </th>
              <th 
                className={tableStyles.categoryCol}
              >
                Category
              </th>
              <th 
                className={tableStyles.countCol}
              >
                In Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <tr>
                  <td title={product.name}>
                    {product.name}
                  </td>
                  <td title={product.description}>
                    {product.description}
                  </td>
                  <td title={product.category} className={tableStyles.columnCentered}>
                    {product.category}
                  </td>
                  <td className={tableStyles.columnCentered}>
                    {product.count}
                  </td>
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