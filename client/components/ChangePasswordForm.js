import { useState } from "react";
import { server, database } from "../config";
import { useRouter } from "next/router";
import passwordStyles from "../styles/Password.module.css";

const ChangePasswordForm = ({ user }) => {
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordRetyped: ''
  });

  const [failedCredentials, setFailedCredentials] = useState(false);

  const router = useRouter();
  
  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;

    setPasswordFields({
      ...passwordFields,
      [target.name]: target.value
    });
  };

  function cannotSubmit() {
    return Object.values(passwordFields).some(field => 
      field.length == 0
    );
  };

  const handleSubmit = async () => {
    const fields = { 
      userId: user.userId,
      password: passwordFields.oldPassword
    };

    const passwordCheck = await fetch(`${database}/user/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    }).then(response => response.json());

    if (passwordCheck.success) {
      if (passwordFields.newPassword === passwordFields.newPasswordRetyped) {
        const body = {
          id: user.userId,
          oldPassword: passwordFields.oldPassword,
          newPassword: passwordFields.newPassword
        };

        const result = await fetch(`${server}/api/account/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(response => response.json())
    
        if (result.success === true) {
          router.push('/account');
        } else {
          setFailedCredentials(true);
        } 
      } else {
        setFailedCredentials(true);
      }
    } else {
      setFailedCredentials(true);
    }
  };

  return (
    <>
      { failedCredentials && <div className={passwordStyles.incorrectpopup}>
        <p>
          Incorrect password or new passwords don't match.
        </p>
      </div>}
      <div className={passwordStyles.container}>
        <label>Old Password</label>
        <input
          name="oldPassword"
          type="password"
          onChange={handleChange}
        />
        <label>New Password</label>
        <input
          name="newPassword"
          type="password"
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <input
          name="newPasswordRetyped"
          type="password"
          onChange={handleChange}
        />
        <div className={passwordStyles.btncontainer}>
          <button
            onClick={() => {
              router.push('/account');
            }}
          >
            Cancel
          </button>
          <button
            disabled={cannotSubmit()}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;