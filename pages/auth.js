import AuthForm from '../components/auth/auth-form';

const AuthPage = () => {
  
  const onSubmit = async(userDetails) => {
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type':'application/json'
        }
      })
      const resData = await response.json();
      if(!response.ok) {
        throw Error('An error occured');
      }
      alert(resData.message);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }

  }
  return <AuthForm onSubmit={onSubmit}/>;
}

export default AuthPage;