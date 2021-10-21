import ProductItem from "./ProductItem";

// todo:  add styles

const ProductList = ({ inventory }) => {
  return (
    <>
      <div>
        {inventory.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;