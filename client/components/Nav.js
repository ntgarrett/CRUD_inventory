import { useState } from "react";
import { useRouter } from "next/router";
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import navStyles from "../styles/Nav.module.css";

const Nav = (props) => {
  const { user, mutateUser } = useUser();
  const router = useRouter();  

  const LoginButton = () => {
    return (
      <li className={navStyles.loginbtn}>
        <Link href='/login'>Login</Link>
      </li>
    );
  };


  const UserMenuDropDown = () => {
    const [visible, setVisible] = useState(false);

    const handleClickAway = () => setVisible(!visible);

    return (
      <>
        <p
          className={navStyles.loginbtn}
          onClick={() => { setVisible(!visible) }}
        >
          {`${user.firstName} ${user.lastName} \u00a0 ${visible ? String.fromCharCode("9650") : String.fromCharCode("9660")}`}
        </p>
        { visible && 
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={navStyles.dropdown} onBlur={() => setVisible(false)}>
            <div className={navStyles.dropdownitem}>
              <Link href='/'>My Account</Link>
            </div>
            <div className={navStyles.dropdownitem}>
              <a 
                href='/api/logout'
                onClick={async (e) => {
                  e.preventDefault();
                  mutateUser(
                    await fetchJson('/api/logout', { method: 'POST' }),
                    false,
                  );
                  router.push('/login');
                }}
              >
                Logout
              </a>
            </div>
          </div>
          </ClickAwayListener>
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
          { user?.isLoggedIn ? <UserMenuDropDown /> : <LoginButton /> }
        </ul>
      </nav>
    </>
  );
};

// export const getServerSideProps = async (req) => {
//   const user = req.session.user;

//   if (user) {
//     return {
//       props: {
//         isLoggedIn: true,
//         user: req.session.user,
//       }
//     }
//   } else {
//     return {
//       props: {
//         isLoggedIn: false,
//       }
//     }
//   }
// };

export default Nav;