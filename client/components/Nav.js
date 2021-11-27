import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import navStyles from "../styles/Nav.module.css";

const Nav = (props) => {
  const router = useRouter();
  
  const LoginButton = () => {
    return (
      <>
        <Link href='/login'>Login</Link>
      </>
    );
  };

  const UserMenuDropDown = () => {
    const [visible, setVisible] = useState(false);
    const user = props.user;

    return (
      <>
        <p
          onClick={() => { setVisible(!visible) }}
        >
          {`${user.fname} ${user.lname} ${visible ? String.fromCharCode("9650") : String.fromCharCode("9660")}`}
        </p>
        { visible && 
        <div>
          <div>
            <Link href='/'>Account Details</Link>
          </div>
          <div>
            <Link href='/api/logout'>Logout</Link>
          </div>

        </div>
        }
      </>
    );
  };

  return (
    <>
      <nav className={navStyles.nav}>
        <ul>
          <li>
            <Link href='/'>Dashboard</Link>
          </li>
          <li>
            <Link href='/inventory'>Inventory</Link>
          </li>
          <li>
            <Link href='/new'>New Product</Link>
          </li>
          { props.isLoggedIn ? <UserMenuDropDown /> : <LoginButton /> }
        </ul>
      </nav>
    </>
  );
};

export const getServerSideProps = async (req) => {
  const user = req.session.user;

  if (!user) {
    return {
      props: {
        isLoggedIn: true,
        user: req.session.user,
      }
    }
  } else {
    return {
      props: {
        isLoggedIn: false,
      }
    }
  }
};

export default Nav;