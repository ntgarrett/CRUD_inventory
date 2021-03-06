import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import accountStyles from "../styles/Account.module.css";

const dateFormat = { year: 'numeric', month: '2-digit', day: '2-digit' };

const Account = () => {
  const { user, mutate } = useUser();

  const router = useRouter();

  return (
    <>
      <h2 className={accountStyles.title}>My Account</h2>
      <div className={accountStyles.container}>
        <div className={accountStyles.row}>
          <label>ID</label>
          <p>
            {`${user?.userId}`}
          </p>
        </div>
        <div className={accountStyles.row}>
          <label>Name</label>
          <p>
            {`${user?.firstName} ${user?.lastName}`}
          </p>
        </div>
        <div className={accountStyles.row}>
          <label>Date of Birth</label>
          <p>
            {`${new Date(user?.birthDate).toLocaleDateString(undefined, dateFormat).split('/').join('-')}`}
          </p>
        </div>
        <div className={accountStyles.row}>
          <label>Joined</label>
          <p>
            {`${new Date(user?.hireDate).toLocaleDateString(undefined, dateFormat).split('/').join('-')}`}
          </p>
        </div>
        <div className={accountStyles.btncontainer}>
          <button
            className={accountStyles.btn}
            onClick={() => {
              router.push('/account/password');
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;