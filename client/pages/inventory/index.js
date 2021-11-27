import { server } from '../../config';
import { withSessionSsr } from '../../lib/withSession';
import ProductList from "../../components/ProductList";
import styles from '../../styles/Home.module.css';

const Home = ({ inventory }) => {
  return (
    <div className={styles.container}>
      <ProductList inventory={inventory} />
    </div>
  )
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
      const res = await fetch(`${server}/api`);
      const inventory = await res.json();
      
      return {
        props: {
          user: req.session.user,
          inventory,
        }
      }
    }
  }
);

export default Home;
