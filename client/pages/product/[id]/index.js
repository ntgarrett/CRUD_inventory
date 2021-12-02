import { withSessionSsr } from "../../../lib/withSession";
import { server } from "../../../config";
import ProductItem from "../../../components/ProductItem";

const product = ({ product }) => {
  return (
    <>
      <ProductItem product={product} />
    </>
  );
};

export const getServerSideProps = withSessionSsr(   
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/401'
        }
      }
    } else {
      const param = req.url.match(/[^\/]*$/);
      const id = parseInt(param[0]);

      const res = await fetch(`${server}/api/${id}`);
      const product = await res.json();
      
      return {
        props: {
          user: req.session.user,
          product,
        }
      }
    }
  }
);

export default product;