import { server } from "../../../config";

// todo:  add edit and delete buttons
//        add a link to go back
//        add styles

const product = ({ product }) => {
  return (
    <>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>Count: {product.count}</p>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/${context.params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api`);
  const inventory = await res.json();

  const ids = inventory.map((product) => product.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false
  };
};

export default product;