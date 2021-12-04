import { withSessionSsr } from "../../lib/withSession";
import useUser from "../../lib/useUser";
import Account from "../../components/Account";

const account = () => {
  const { user, mutateUser } = useUser();
  
  return (
    <>
      <Account user={user} />
    </>
  );
}

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

export default account;