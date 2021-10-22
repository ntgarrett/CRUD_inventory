import Meta from "./Meta";
import Header from "./Header";
import Nav from "./Nav";

// todo: add styles

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
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
