import Image from "next/image";
import logo from "../public/logo.png";
import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <div className={headerStyles.container}>
        <div className={headerStyles.heading}>
          <Image 
            src={logo}
            alt="logo"
            width={40}
            height={44}
          />
          <h1 className={headerStyles.title}>
            John Doe&apos;s Art Supplies
          </h1>
        </div>
        <p className={headerStyles.description}>
          Providing quality mediums since 1986
        </p>
      </div>
    </>
  );
};

export default Header;