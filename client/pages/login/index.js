import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../config";
import loginStyles from "../../styles/Login.module.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    password: ''
  });
  
  const [failedLoginPrompt, setFailedLoginPrompt] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    let body = {
      user_id: parseInt(userDetails.id),
      password: userDetails.password
    };

    const result = await fetch(`${server}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error => console.error(error.message));
    
    if (result.success === true) {
      router.push('/');
    } else {
      setFailedLoginPrompt(true);
    }
  };

  return (
    <>
      <div className={loginStyles.incorrectpopup}>
        <p
          style={{ opacity: failedLoginPrompt ? 100 : 0 }}
        >
          Incorrect username and/or password.
        </p>
      </div>
      <div className={loginStyles.container}>
        <span>Employee ID</span>
        <input
          name="id"
          type="text"
          onChange={handleChange}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
          }}
        />
        <span>Password</span>
        <input
          name="password"
          type="password"
          onChange={handleChange}
        />
        <button
          className={loginStyles.button}
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;