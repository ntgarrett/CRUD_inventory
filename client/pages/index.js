import { useRouter } from "next/router";
import { withSessionSsr } from "../lib/withSession";
import dashboardStyles from "../styles/Dashboard.module.css";

const Dashboard = ({ user }) => {
  const router = useRouter();

  return (
    <>
      <div className={dashboardStyles.container}>
        <h2>
          Dashboard
        </h2>
        <button
          onClick={() => {
            router.push('/inventory');
          }}
        >
          Inventory
        </button>
        <button
          onClick={() => {
            router.push('/account');
          }}
        >
          My Account
        </button>
        <button
          onClick={() => {
            router.push('/employees')
          }}
        >
          Employees
        </button>
      </div>
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

export default Dashboard;