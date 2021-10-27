import { server } from '../config';
import ProductList from "../components/ProductList";
import styles from '../styles/Home.module.css';

const Home = ({ inventory }) => {
  return (
    <div className={styles.container}>
      <ProductList inventory={inventory} />
    </div>
  )
};

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api`);
  const inventory = await res.json();
  
  return {
    props: {
      inventory,
    }
  }
};

export default Home;
