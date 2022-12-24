import {Dispatch, SetStateAction} from "react";

import {
    useMantineTheme,
    Header,
    Text,
    MediaQuery,
    Burger,
    Avatar
} from '@mantine/core';
import { IconAirConditioning } from '@tabler/icons';


interface HeaderInterface {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>
}

export default function HeaderComp(props: HeaderInterface){
    const { opened, setOpened } = props;
    const theme = useMantineTheme();

    return (
        <>
        <Header height={{ base: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
            <Text fw={"700"}>AC Management System</Text>
          </div>
        </Header>
        </>
    )
}