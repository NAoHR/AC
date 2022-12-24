import { useState } from 'react';
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar
} from '@mantine/core';
import { IconAirConditioning } from '@tabler/icons';

import NavbarComp from '../components/NavbarComp';
import HeaderComp from '../components/HeaderComp';

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={ <NavbarComp opened={opened} /> }
      header={
        <HeaderComp opened={opened} setOpened={setOpened} />
      }
    >
      <Text>
        content
      </Text>
    </AppShell>
  );
}