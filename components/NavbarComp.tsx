import { Navbar, MultiSelect, TextInput, Flex, Group, Avatar, Text, useMantineTheme, Checkbox} from "@mantine/core";
import {IconSearch, IconCirclePlus, IconAdjustmentsAlt, IconRefresh} from "@tabler/icons";
import { useEffect, useState } from "react";
import useAdminStore from "../utils/stores";

interface Navbar {
    opened: boolean
}

export default function NavbarComp(props: Navbar){
    const theme = useMantineTheme();
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const updateFilters = useAdminStore(state => state.updateFilters);
    const filter = useAdminStore(state => state.filter)

    const [check, setC] = useState(false);

    return (
        <>
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 250, lg: 320 }} >
            <Flex
            direction={"column"}
            gap={"sm"}
            >
                <Text fw={600}>Terkait Data</Text>
                <Group bg={`${theme.colorScheme == 'dark' ? "dark.5" : "gray.1"}`} onClick={()=>{setCurrentModified(true, "add", null)}} className="pointer">
                    <Avatar color="green" radius={"xs"}>
                        <IconCirclePlus size={20} />
                    </Avatar>
                    <Text size={"sm"}>Tambah Data Baru</Text>
                </Group>
                <TextInput
                icon={<IconSearch size={20} />}
                variant="filled"
                placeholder="search"
                onChange={(event) => {updateFilters({text: event.currentTarget.value, isNonTouched: useAdminStore.getState().filter.isNonTouched})}}
                />
                <Checkbox
                label="Filter histori"
                description="Tunjukkan data yang belum pernah dichat atau sudah lebih dari 2 bulan sejak terakhir chat"
                checked={check}
                onChange={(event) =>{
                    setC(event.currentTarget.checked); 
                    updateFilters({text: useAdminStore.getState().filter.text, isNonTouched: event.currentTarget.checked})
                }}
                />                
                
                <Text fw={600}>Query Data</Text>

                <MultiSelect
                icon={<IconAdjustmentsAlt />}
                placeholder="Pilih Bulan"
                variant="filled"
                data={[
                    { value: 'januari', label: 'januari' },
                    { value: 'februari', label: 'februari' },
                    { value: 'maret', label: 'maret' },
                    { value: 'april', label: 'april' },
                    { value: 'may', label: 'may' },
                    { value: 'juni', label: 'juni' },
                    { value: 'juli', label: 'juli' },
                    { value: 'agustus', label: 'agustus' },
                    { value: 'september', label: 'september' },
                    { value: 'oktober', label: 'oktober' },
                    { value: 'november', label: 'november' },
                    { value: 'desember', label: 'desember' },
                ]}
                />
            </Flex>
        </Navbar>
        </>
    )
}