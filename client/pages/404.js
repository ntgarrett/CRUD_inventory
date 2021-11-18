import errorStyles from "../styles/ErrorPage.module.css";

const Error404 = () => {
  return (
    <div className={errorStyles.container}>
      <h1 className={errorStyles.title}>404 <span>- Page not found.</span></h1>
    </div>
  );
};

export default Error404;