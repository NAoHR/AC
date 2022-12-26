import Main from '../containers/Main';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import apiMethod from '../utils/api';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(router.isReady){
        apiMethod.isLoggedIn()
            .then(()=>{
                // 
            })
            .catch(() => {
                window.localStorage.clear();
                router.push("/login")
            })
    }
}, [router.isReady])

  return (
    <Main />
  );
}