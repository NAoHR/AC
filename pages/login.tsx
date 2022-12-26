import LoginCon from "../containers/LoginCon";
import { useRouter } from "next/router";
import { useEffect } from "react";
import apiMethod from "../utils/api";

export default function Login(){
    const router = useRouter();

    useEffect(() => {
        if(router.isReady){
            apiMethod.isLoggedIn()
                .then(()=>{
                    router.push("/")
                })
                .catch(() => {
                    window.localStorage.clear();
                })
        }
    }, [router.isReady])
    return (
        <>
            <LoginCon />
        </>
    )
}
