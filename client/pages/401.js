import errorStyles from "../styles/ErrorPage.module.css";

const Error401 = () => {
  return (
    <div className={errorStyles.container}>
      <h1 className={errorStyles.title}>401 <span>- Unauthorized.</span></h1>
    </div>
  );
};

export default Error401;