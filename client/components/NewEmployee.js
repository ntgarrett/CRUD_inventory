import { useState } from "react";
import { useRouter } from "next/router";
import { server } from "../config";
import employeeStyles from "../styles/NewEmployee.module.css";

const getTodaysDateFormatted = () => {
  const date = new Date();
  const mm = date.getMonth() < 9 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  
  return `${date.getFullYear()}-${mm}-${dd}`;
}

const NewEmployee = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    userId: '',
    password: 'changeme123',
    firstName: '',
    lastName: '',
    birthDate: '',
    hireDate: getTodaysDateFormatted(),
    isAdmin: false
  });

  const router = useRouter();

  function cannotSubmit() {
    if (employeeInfo.userId.length === 0 || employeeInfo.firstName.length === 0 || employeeInfo.lastName.length === 0 || employeeInfo.birthDate == null) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (e) => {
    const target = e.target;
    
    setEmployeeInfo((prevState) => ({
      ...prevState,
      [target.name]: target.name == 'isAdmin' ? target.checked : target.value,
    }));
  };

  const handleSubmit = async () => {
    let body = {
      user_id: parseInt(employeeInfo.userId),
      password: employeeInfo.password,
      first_name: employeeInfo.firstName,
      last_name: employeeInfo.lastName,
      birth_date: employeeInfo.birthDate,
      hire_date: employeeInfo.hireDate,
      administrator: employeeInfo.isAdmin
    };

    const newEmployee = await fetch(`${server}/api/employees/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error => console.log(error));

    router.push('/employees');
  };


  return (
    <>
      <div className={employeeStyles.container}>
        <h2>
          New Employee Details
        </h2>
        <div className={employeeStyles.formfield}>
          <label>Employee ID</label>
          <input 
            name="userId"
            type="text"
            maxLength={6}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            }}
          />
        </div>

        <div className={employeeStyles.formfield}>
          <label>First Name</label>
          <input 
            name="firstName"
            type="text"
            maxLength={32}
            onChange={handleChange}
          />
        </div>

        <div className={employeeStyles.formfield}>
          <label>Last Name</label>
          <input 
            name="lastName"
            type="text"
            maxLength={32}
            onChange={handleChange}
          />
        </div>

        <div className={employeeStyles.formfield}>
          <label>Date of Birth</label>
          <input 
            name="birthDate"
            type="date"
            onChange={handleChange}
          />
        </div>

        <div className={employeeStyles.adminfield}>
          <label>Make Administrator</label>
          <input
            className={employeeStyles.checkbox} 
            name="isAdmin"
            type="checkbox"
            onChange={handleChange}
          />
        </div>

        <div className={employeeStyles.btncontainer}>
          <button
            onClick={() => {
              router.push('/employees');
            }}
          >
            Cancel
          </button>
          <button
            disabled={cannotSubmit()}
            onClick={() => {
              if (window.confirm('Add new employee?')) {
                handleSubmit();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default NewEmployee;