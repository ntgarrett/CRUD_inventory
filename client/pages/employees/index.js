import { withSessionSsr } from "../../lib/withSession";
import { server } from "../../config";
import EmployeeList from "../../components/EmployeeList";

const employees = ({ employees }) => {
  return (
    <>
      <EmployeeList employees={employees} />
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
      const employees = await fetch(`${server}/api/employees`).then(response => response.json());

      return {
        props: {
          user: req.session.user,
          employees,
        }
      }
    }
  }
);

export default employees;