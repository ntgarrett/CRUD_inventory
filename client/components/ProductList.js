import ProductItem from "./ProductItem";

// todo:  add styles

const ProductList = ({ inventory }) => {
  return (
    <>
      <div>
        {inventory.map((product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;