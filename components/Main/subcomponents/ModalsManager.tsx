import useAdminStore from "../../../utils/stores";
import { Modal, Title, Text, List, ThemeIcon, Flex, Group } from "@mantine/core";
import { IconPhone, IconHome, IconMoon } from "@tabler/icons"

const DetailModal = () => {
    const currentModified = useAdminStore(state => state.currentModified);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);

    function LooperLogPanggilan(){
        const logpanggilan = currentModified.data?.logKontak

        if(logpanggilan){
            if(logpanggilan.length > 0){
                return <>
                    {
                        logpanggilan.map((v) => {
                            return (
                                <Flex justify={"space-between"} w="100%">
                                    <Text fw="bold">
                                        {v.tanggal.getDate()}/
                                        {v.tanggal.getMonth()}/
                                        {v.tanggal.getFullYear()}
                                    </Text>
                                    <Text color={v.status == "pending" ? "blue" : v.status == "mau" ? "green" : "red"} fw="bold">
                                        {v.status.toUpperCase()}
                                    </Text>
                                </Flex>
                            ) 
                        })
                    }
                </>
            }
            return <Text fw="bold" color={"red.6"}>Belum pernah dipanggil</Text>
        }
        return <Text>Tidak ada data</Text>
    }
    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            overflow={"inside"}
            opened={currentModified.display && currentModified.method == "detail"}
            onClose={()=> {setCurrentModified(false, "", null)}}
            title={
                <Title order={5} mt={"xs"} color={"dimmed"}>
                    Detail Customer
                </Title>
            }
        >   
            <Title>
                {currentModified.data?.nama}
            </Title>
            <Title order={4}>
                {currentModified.data?.bulan}
            </Title>
            <List mt="md">
                <List.Item
                 icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconPhone size={16} />
                    </ThemeIcon>
                 }
                >
                    0{currentModified.data?.telepon}
                </List.Item>

                <List.Item
                pt={"sm"}
                icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                        <IconHome size={16} />
                    </ThemeIcon>
                 }
                >
                    {currentModified.data?.alamat}
                </List.Item>
            </List>

            <Title order={5} mt={"xs"} color={"dimmed"}>
                 Log Panggilan
            </Title>
            
            <Flex w="100%" direction={"column"} gap="xs" mt="sm" pl={"sm"}>
                <LooperLogPanggilan />
                
            </Flex>
      </Modal>
    )
}

const ModalsManager = () => {
    return (
        <>
            <DetailModal />
        </>
    )
}

export default ModalsManager;