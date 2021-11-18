import errorStyles from "../styles/ErrorPage.module.css";

const Error500 = () => {
  return (
    <div className={errorStyles.container}>
      <h1 className={errorStyles.title}>500 <span>- An internal server has occurred.</span></h1>
    </div>
  );
};

export default Error500;