import Meta from "./Meta";
import Header from "./Header";

// todo: add styles

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div>
        <main>
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
