import { useRef } from 'react';

import classes from './profile-form.module.css';

function ProfileForm() {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const onChangePassword = async(e) => {
    e.preventDefault();
    const inputOldPassword = oldPasswordRef.current.value;
    const inputNewPassword = newPasswordRef.current.value;
    const payload = {
      oldPassword: inputOldPassword,
      newPassword: inputNewPassword
    }
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type':'application/json'
        }
      });
      const resData = await response.json();
      if(!response.ok) {
        throw new Error('An error occured');
      }
      alert(resData.message);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className={classes.form} onSubmit={onChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;