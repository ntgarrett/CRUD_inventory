import Link from "next/link";
// add styles

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href='/'>Inventory</Link>
          </li>
          <li>
            <Link href='/new'>Add New Product</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;