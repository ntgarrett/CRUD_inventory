import { server } from '../config';
import ProductList from "../components/ProductList";
//import Image from 'next/image';
//import styles from '../styles/Home.module.css';

const Home = ({ inventory }) => {
  return (
    <div>
      <h1>Art Supplies Inventory</h1>
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
