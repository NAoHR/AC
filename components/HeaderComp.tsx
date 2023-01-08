import {Dispatch, SetStateAction} from "react";
import { useRouter } from "next/router";

import {
    useMantineTheme,
    Header,
    Text,
    MediaQuery,
    Burger,
    Avatar,
    Flex,
    Button
} from '@mantine/core';
import { IconAirConditioning, IconLogout } from '@tabler/icons';
import {toast} from "react-toastify"


interface HeaderInterface {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>
}

export default function HeaderComp(props: HeaderInterface){
    const { opened, setOpened } = props;
    const theme = useMantineTheme();

    const router = useRouter();
    return (
        <>
        <Header height={{ base: 70 }} p="md">
          <Flex align={"center"} justify="space-between">
            <Flex align={"center"} h="100%" justify={"flex-start"}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o : boolean) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Avatar color="blue" radius="sm" mr={"sm"}>
                <IconAirConditioning size={20} />
              </Avatar>
              <MediaQuery smallerThan={"sm"} styles={{display: "none"}}>
                <Text fw={"700"}>AC Management System</Text>
              </MediaQuery>
            </Flex>
            <Button variant="outline" radius={"sm"} onClick={() => {
              window.localStorage.clear();
              toast.success("Kamu telah logout")
              router.push("/login")
            }}>
              <IconLogout size={18} />
            </Button>
          </Flex>
        </Header>
        </>
    )
}