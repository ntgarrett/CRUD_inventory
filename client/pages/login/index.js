import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../../config";
import loginStyles from "../../styles/Login.module.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    password: ''
  });

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
      userId: parseInt(userDetails.id),
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

    console.log(`Result: ${result}`)

    if (result.success) {
      router.push('/inventory');
    }
  };

  return (
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
  );
};

export default Login;