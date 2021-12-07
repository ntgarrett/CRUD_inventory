import { withSessionSsr } from "../../../lib/withSession";
import NewEmployee from "../../../components/NewEmployee";

const employee = () => {
  return (
    <>
      <NewEmployee />
    </>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user || user.isAdmin === false) {
      return {
        redirect: {
          permanent: false,
          destination: '/401'
        }
      }
    } else {
      return {
        props: {
          user: req.session.user,
        }
      }
    }
  }
);

export default employee;