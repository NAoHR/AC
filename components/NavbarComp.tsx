import { Navbar, MultiSelect, TextInput, Flex, Group, Avatar, Text, useMantineTheme, Checkbox, Button} from "@mantine/core";
import {IconSearch, IconCirclePlus, IconAdjustmentsAlt, IconSend} from "@tabler/icons";
import { useState } from "react";
import apiMethod from "../utils/api";
import useAdminStore from "../utils/stores";
import {ICustomer} from "../interfaces/backend"

interface Navbar {
    opened: boolean
}

export default function NavbarComp(props: Navbar){
    const theme = useMantineTheme();
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const updateFilters = useAdminStore(state => state.updateFilters);
    const contentEditables = useAdminStore(state => state.contentEditables);
    const updateEditable = useAdminStore(state => state.updateEditable);
    const setCustomer = useAdminStore(state => state.updateCustomers);
    const setPagination = useAdminStore(state => state.setPagination);
    const updateQuery = useAdminStore(state => state.updateQuery);

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
                onChange={(e) => {e.length == 0 ? updateQuery("all") : updateQuery(e.join(","))}}
                />
                <Button leftIcon={<IconSend />} variant="light" mt={"xs"} disabled={contentEditables} onClick={() => {
                    updateEditable(true)
                    
                    apiMethod.getDatas(1, useAdminStore.getState().query)
                        .then((v) => {
                            const {page, totalPages} = v.data.data;
                            const customers = v.data.data.docs as ICustomer[];

                            setCustomer(customers);
                            
                            setPagination({
                                current: page,
                                isDisabled: false,
                                total: totalPages
                            })
                            updateEditable(false)
                        })
                        .catch((e) => {

                        })
                        .finally(() => {
                            updateEditable(useAdminStore.getState().contentEditables);
                        })
                }}>
                  Dapatkan Data
                </Button>
            </Flex>
        </Navbar>
        </>
    )
}