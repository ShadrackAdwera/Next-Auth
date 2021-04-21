import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import AuthForm from '../components/auth/auth-form';

const AuthPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    getSession().then(session=>{
      if(session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    })
  },[router]);
  
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
  if(isLoading) {
    return <p>Loading...</p>
  }
  return <AuthForm onSubmit={onSubmit}/>;
}

export default AuthPage;