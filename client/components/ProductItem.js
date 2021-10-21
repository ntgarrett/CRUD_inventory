// todo:  add styles

const ProductItem = ({ product }) => {
  return (
    <>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>{product.count}</p>
    </>
  );
};

export default ProductItem;