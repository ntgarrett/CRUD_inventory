import { withSessionSsr } from "../../../lib/withSession";
import ChangePasswordForm from "../../../components/ChangePasswordForm";

const passwordPage = ({ user }) => {
  return (
    <>
      <ChangePasswordForm user={user}/>
    </>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '401'
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

export default passwordPage;