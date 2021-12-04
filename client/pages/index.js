import { useRouter } from "next/router";
import dashboardStyles from "../styles/Dashboard.module.css";

const Dashboard = () => {
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

export default Dashboard;