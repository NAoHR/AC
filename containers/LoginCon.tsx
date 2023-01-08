import apiMethod from "../utils/api";

import { useRouter } from "next/router";
import { Container, Flex, Group, Title, Button, Input } from "@mantine/core";
import { IconLock, IconUser } from "@tabler/icons";
import { FormEvent, useEffect, useRef, useState } from "react";
import {toast} from "react-toastify"

export default function LoginCon(){
    const router = useRouter();
    const [isSubmit, setIS] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: FormEvent){
        setIS(!isSubmit);
        const username = usernameRef?.current?.value as string;
        const password = passwordRef?.current?.value as string;
        e.preventDefault();

        setIS(!isSubmit);

        apiMethod.login({data: {username: username, password: password}})
            .then((v)=> {
                const {token, username} = v.data.data;
                window.localStorage.setItem("token", `Bearer ${token}`);
                toast.success(`Selamat Datang ${username}`)
                router.push("/")
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {  
                setIS((v) => !v);
            })
        
    }
    useEffect(()=> {
        console.log(isSubmit);
        
    }, [])

    return (
        <>
            <Container miw="100vw" mih="100vh">
                
                <Flex justify={"center"} align={"center"} mih="100vh" direction={"column"} >
                    <Group p="sm" miw="350px">
                        <Title ta={"center"} order={2} color="gray.3" lts={3} w="100%">
                            login
                        </Title>
                            <form action="" style={{width: "100%"}} onSubmit={(e) => {handleSubmit(e)}}>
                                <Flex direction={"column"} justify="center" w="100%" gap="md">
                                    <Input
                                    icon={<IconUser />}
                                    placeholder="username"
                                    ref={usernameRef}
                                    size="md"
                                    required={true}
                                    />

                                    <Input
                                    icon={<IconLock />}
                                    placeholder="password"
                                    ref={passwordRef}
                                    size="md"
                                    type={"password"}
                                    required={true}
                                    />

                                    <Button variant="outline" color="gray" size="md" type="submit" disabled={isSubmit}>
                                        submit
                                    </Button>
                                </Flex>
                            </form>
                    </Group>
                </Flex>
            </Container>
        </>
    )
}