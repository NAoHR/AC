import { useState } from 'react';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';

import NavbarComp from '../components/NavbarComp';
import HeaderComp from '../components/HeaderComp';
import MainComp from '../components/Main/MainComp';

export default function Main() {
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
      header={ <HeaderComp opened={opened} setOpened={setOpened} /> }
    >
      <MainComp />
    </AppShell>
  );
}