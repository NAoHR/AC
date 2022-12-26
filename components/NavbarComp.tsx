import { Navbar, MultiSelect, TextInput, Flex, Group, Avatar, Text, useMantineTheme} from "@mantine/core";
import {IconSearch, IconCirclePlus, IconAdjustmentsAlt, IconRefresh} from "@tabler/icons";

interface Navbar {
    opened: boolean
}

export default function NavbarComp(props: Navbar){
    const theme = useMantineTheme();

    return (
        <>
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 250, lg: 320 }} >
            <Flex
            direction={"column"}
            gap={"sm"}
            >
                <Text fw={600}>Terkait Data</Text>
                <Group bg={`${theme.colorScheme == 'dark' ? "dark.5" : "gray.1"}`}>
                    <Avatar color="green" radius={"xs"}>
                        <IconCirclePlus size={20} />
                    </Avatar>
                    <Text size={"sm"}>Tambah Data Baru</Text>
                </Group>
                <Group bg={`${theme.colorScheme == 'dark' ? "dark.5" : "gray.1"}`}>
                    <Avatar color="blue" radius={"xs"}>
                        <IconRefresh size={20} />
                    </Avatar>
                    <Text size={"sm"}>Refresh Data</Text>
                </Group>
                
                <Text fw={600}>Filters</Text>
                <TextInput
                icon={<IconSearch size={20} />}
                variant="filled"
                placeholder="search"
                />

                <MultiSelect
                icon={<IconAdjustmentsAlt />}
                placeholder="Pilih Bulan"
                variant="filled"
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
                />
            </Flex>
        </Navbar>
        </>
    )
}