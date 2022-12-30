import useAdminStore from "../../../utils/stores";
import { Modal, Title, Text, List, ThemeIcon, Flex, TextInput, Textarea, Select, Button } from "@mantine/core";
import { IconPhone, IconHome, IconMoon } from "@tabler/icons";
import { FormEvent, useRef, useState } from "react";
import apiMethod from "../../../utils/api";
import { TMonth } from "../../../interfaces/backend";

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


const AddModal = () => {
    const [reqFinished, setRF] = useState<boolean>(true);
    const currentModified = useAdminStore(state => state.currentModified);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const updateStats = useAdminStore(state => state.updateStats);
    const addcustomer = useAdminStore(state => state.addCustomer);

    const nameRef = useRef<HTMLInputElement>(null);
    const telpRef = useRef<HTMLInputElement>(null);
    const alamatRef = useRef<HTMLTextAreaElement>(null);
    const bulanRef = useRef<HTMLInputElement>(null);

    function sendData(e: FormEvent){
        setRF(!reqFinished);
        e.preventDefault()
        const name = nameRef?.current?.value as String;
        const telp = telpRef?.current?.value as String;
        const alamat = alamatRef?.current?.value as String;
        const bulan = bulanRef?.current?.value as TMonth;

        const body = {
            nama: name,
            telepon: telp,
            alamat: alamat,
            bulan : bulan
        }
        apiMethod.addData({data: body})
            .then((v)=> {
                const data = v.data.data
                addcustomer(data);
                setCurrentModified(false, "", null);
                updateStats(false, data, 1, data.bulan);
            })
            .catch((e)=>{
                console.log(e);
            })
            .finally(()=>{
                setRF(prev => !prev);
            })
        
    }

    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            overflow={"inside"}
            opened={currentModified.display && currentModified.method == "add"}
            onClose={()=> {if (reqFinished) setCurrentModified(false, "", null)}}
            title={
                <Title order={5} mt={"xs"} color={"dimmed"}>
                    Tambah Data Customer
                </Title>
            }
        >   
        <form onSubmit={(e) => {sendData(e)}}>
            <Flex mt={"sm"} direction="column" w="100%" gap="sm" mb="sm">
                <TextInput
                label="Nama"
                ref={nameRef}
                required={true}
                placeholder="Lebron James"
                />

                <TextInput
                required={true}
                ref={telpRef}
                label="Nomor Telepon"
                placeholder="88xxxxxx"
                />

                <Textarea
                label="Alamat"
                ref={alamatRef}
                required={true}
                autosize
                minRows={3}
                placeholder="Jalan Jalan Ke Pasar Minggu"
                />

                <Select
                label="Bulan"
                ref={bulanRef}
                required={true}
                placeholder="Pick one"
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
                <Button w="130px" style={{alignSelf: "flex-end"}} type="submit" disabled={!reqFinished} >Submit</Button>
            </Flex>
        </form>
      </Modal>
    )
}

const ModalsManager = () => {
    return (
        <>
            <DetailModal />
            <AddModal />
        </>
    )
}

export default ModalsManager;