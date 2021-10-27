import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <div className={headerStyles.container}>
        <h1 className={headerStyles.title}>
          Art Supplies Inventory
        </h1>
        <p className={headerStyles.description}>
          Providing quality mediums since 1986
        </p>
      </div>
    </>
  );
};

export default Header;