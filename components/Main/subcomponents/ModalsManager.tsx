import useAdminStore from "../../../utils/stores";
import { Modal, Title, Text, List, ThemeIcon, Flex, TextInput, Textarea, Select, Button, Group, Avatar } from "@mantine/core";
import { IconPhone, IconHome, IconTrash } from "@tabler/icons";
import {toast} from "react-toastify"

import { FormEvent, useEffect, useRef, useState } from "react";
import apiMethod from "../../../utils/api";
import { ICustomer, ILogKontak, TMonth } from "../../../interfaces/backend";

const DetailModal = () => {
    const currentModified = useAdminStore(state => state.currentModified);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);

    function LooperLogPanggilan(){
        
        const logpanggilan = currentModified.data?.logKontak

        if(logpanggilan){
            if(logpanggilan.length > 0){
                return <>
                    {
                        logpanggilan.map((v, i) => {
                            v.tanggal = new Date(v.tanggal);

                            return (
                                <Flex justify={"space-between"} w="100%" key={i}>
                                    <Text fw="bold">
                                        {v.tanggal.getDate()}/
                                        {v.tanggal.getMonth()+1}/
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
                toast.success("Data Berhasil Ditambahkan");
            })
            .catch((e)=>{
                const err = e.response.data.message || "terjadi error";
                toast.error(err);
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
                <Button w="130px" style={{alignSelf: "flex-end"}} type="submit" disabled={!reqFinished} variant="light" >Submit</Button>
            </Flex>
        </form>
      </Modal>
    )
}

const DeleteModal = () => {
    const [reqFinished, setRF] = useState<boolean>(true);
    const currentModified = useAdminStore(state => state.currentModified);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const updateStats = useAdminStore(state => state.updateStats);
    const deleteCustomers = useAdminStore(state => state.deleteCustomer);

    function deleteData(){
        setRF(!reqFinished);
        if(currentModified.data?._id){
            apiMethod.deleteCustomer({data: currentModified.data._id})
                .then((v) => {
                    if(currentModified.data?._id){
                        
                        deleteCustomers(currentModified.data?._id)
                        updateStats(false, false, -1, currentModified.data?.bulan);
                        setCurrentModified(false, "", null);
                        toast.success("Data Berhasil Dihapus")
                    }
                })
                .catch((e) => {
                    const err = e.response.data.message || "terjadi error";
                    toast.error(err);
                })
                .finally(()=>{
                    setRF(prev => !prev);
                })
        }


        
    }

    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            overflow={"inside"}
            opened={currentModified.display && currentModified.method == "delete"}
            onClose={()=> {if (reqFinished) setCurrentModified(false, "", null)}}
            title={
                <Title order={5} mt={"xs"} color={"dimmed"}>
                    Hapus Data Customer
                </Title>
            }
        >   
        <Text>
            Apakah kamu yakin untuk menghapus data <span style={{fontWeight: "bold"}}>{currentModified.data?.nama}</span>
        </Text>
        
        <Flex gap={"sm"} mt="md">
            <Button  disabled={!reqFinished} variant="light" onClick={deleteData}>Yakin</Button>
            <Button  disabled={!reqFinished} variant="light" color={"red"} onClick={()=> {if (reqFinished) setCurrentModified(false, "", null)}}>Tidak</Button>
        </Flex>
      </Modal>
    )
}

const SendMessageModal = () => {
    const [reqFinished, setRF] = useState<boolean>(true);
    const currentModified = useAdminStore(state => state.currentModified);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const editCustomer = useAdminStore(state => state.editCustomer);
    const [text, setT] = useState<string>("");

    useEffect(()=>{
        const date = new Date().getHours();
        
        const greet = date > 0 && date < 12 ? "Selamat Pagi" : date >= 12 && date <= 15 ? "Selamat Siang" : date > 15 && date <= 18 ? "Selamat Sore" : "Selamat Malam";
        setT(`${greet}, Yth, ${currentModified?.data?.nama} Pelanggan Panasonic. Kami dari Otorize Service Panasonic Menginfokan Bahwa Ac anda sudah waktunya melakukan perawatan rutin berkala. Jika anda berkenan silahkan balas Pesan ini agar dapat segera di Tindak Lanjuti`)
    }, [currentModified])


    function sendData() {
        setRF(!reqFinished);
        apiMethod.addlog({data: currentModified.data?._id})
            .then((v) => {
                const data = v.data.data as ICustomer;                
                window.open(`https://api.whatsapp.com/send?phone=62${currentModified.data?.telepon}&text=${text}`, '_blank');
                if(currentModified.data?._id){
                    data.currentLog = data.logKontak[data.logKontak.length -1];
                    editCustomer(currentModified.data?._id, data);
                }
                setCurrentModified(false, "", null);
                toast.success("Log Histori Terupdate");
            })
            .catch((e) => {
                const err = e.response.data.message || "terjadi error";
                toast.error(err);
                
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
            opened={currentModified.display && currentModified.method == "message"}
            onClose={()=> {if (reqFinished) setCurrentModified(false, "", null)}}
            title={
                <Title order={5} mt={"xs"} color={"dimmed"}>
                    Kirim Pesan
                </Title>
            }
        >   
        <Text>
            Apakah Anda ingin mengirim pesan ke <span style={{fontWeight: "bold"}}>{currentModified.data?.nama}</span>
        </Text>
        <Textarea
        placeholder="Autosize with no rows limit"
        mt={"sm"}
        onChange={(e)=> {setT(e.target.value)}}
        value={text.toLowerCase()}
        autosize
        minRows={2}
        autoCorrect={"false"}
        />

        <Flex mt="sm" gap={"sm"} justify="flex-end">
            <Button  disabled={!reqFinished} variant="light" onClick={sendData} >Kirim dengan Database</Button>
            <Button  component="a" href={`https://api.whatsapp.com/send?phone=62${currentModified.data?.telepon}&text=${text}`} target={"_blank"} variant="light" color={"red"} onClick={()=> {if (reqFinished) setCurrentModified(false, "", null)}}>Hanya Kirim</Button>
        </Flex>
      </Modal>
    )
}


const EditModal = () => {
    const [reqFinished, setRF] = useState<boolean>(true);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const currentModified = useAdminStore(state => state.currentModified);
    const editCustomer = useAdminStore(state => state.editCustomer)

    const [dataBeingModified, setDBM] = useState(currentModified.data);

    const nameRef = useRef<HTMLInputElement>(null);
    const telpRef = useRef<HTMLInputElement>(null);
    const alamatRef = useRef<HTMLTextAreaElement>(null);
    const bulanRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(currentModified.data){
            setDBM(currentModified.data)
        }
        
    }, [currentModified])

    return (
        <>
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            overflow={"inside"}
            opened={currentModified.display && currentModified.method == "edit"}
            onClose={()=> {if (reqFinished) setCurrentModified(false, "", null)}}
            title={
                <Title order={5} mt={"xs"} color={"dimmed"}>
                    Edit Data Customer
                </Title>
            }
        >   
        <form onSubmit={(e) => {
            e.preventDefault();
            setRF(!reqFinished);
            apiMethod.editCustomer({data: dataBeingModified as ICustomer})
                .then((v) => {
                    const data = v.data.data as ICustomer;
                    editCustomer(data._id, data)
                    setCurrentModified(false, "", null);
                    toast.success("Customer Terupdate");
                })
                .catch((e) => {
                    const err = e.response.data.message || "terjadi error";
                    toast.error(err);
                })
                .finally(() => {
                    setRF(prev => !prev);
                })
            

        }}>
            <Flex mt={"sm"} direction="column" w="100%" gap="sm" mb="sm">
                <TextInput
                label="Nama"
                ref={nameRef}
                onChange={(e) => { if (dataBeingModified) {setDBM({...dataBeingModified, "nama" : e.target.value}); } }}
                required={true}
                defaultValue={currentModified.data?.nama as string}
                placeholder="Lebron James"
                />

                <TextInput
                required={true}
                ref={telpRef}
                label="Nomor Telepon"
                onChange={(e) => { if (dataBeingModified) {setDBM({ ...dataBeingModified , "telepon" : e.target.value}); } }}
                defaultValue={currentModified.data?.telepon as string}
                placeholder="88xxxxxx"
                />

                <Textarea
                label="Alamat"
                ref={alamatRef}
                required={true}
                onChange={(e) => { if (dataBeingModified) {setDBM({ ...dataBeingModified , "alamat" : e.target.value}); } }}
                defaultValue={currentModified.data?.alamat as string}
                autosize
                minRows={3}
                placeholder="Jalan Jalan Ke Pasar Minggu"
                />

                <Select
                label="Bulan"
                ref={bulanRef}
                defaultValue={currentModified.data?.bulan as string}
                onChange={(e) => { if (dataBeingModified) {setDBM({ ...dataBeingModified , "bulan" : e as TMonth}); } }}
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
                <Flex w="100%" mb={"sm"} direction={"column"} gap="xs">
                    <Title order={5} mb={"xs"} >Histori Panggilan</Title>
                    {
                        currentModified.data?.logKontak.length == 0 ?
                        <Text>Tidak ada Histori Panggilan</Text> 
                        : 
                        dataBeingModified?.logKontak.map((item) => {
                            
                            const dt = new Date(item.tanggal)

                            return (
                                <Flex justify={"space-between"} w="100%" pl={"xs"} align="center"  key={item._id}>
                                    <Text fw="bold">
                                        {dt.getDate()}/
                                        {dt.getMonth()+1}/
                                        {dt.getFullYear()}
                                    </Text>
                                    <Group>
                                        <Select
                                        w="120px"
                                        // ref={bulanRef}
                                        required={true}
                                        placeholder="Status"
                                        onChange={(e: "pending" | "mau" | "tidak") => { if (dataBeingModified) {setDBM({ ...dataBeingModified , "logKontak" : dataBeingModified.logKontak.map((subitem) => {
                                            if(subitem._id === item._id){
                                                return {
                                                    ...subitem,
                                                    status: e
                                                }
                                            }
                                            return subitem
                                        })}); } }}
                                        defaultValue={item.status}
                                        data={[
                                            { value: 'pending', label: 'pending' },
                                            { value: 'mau', label: 'mau' },
                                            { value: 'tidak', label: 'tidak' }
                                        ]}
                                        />
                                        <Avatar color={"red"} className="pointer" onClick={() => {if(dataBeingModified) { setDBM({...dataBeingModified, "logKontak" : dataBeingModified.logKontak.filter(e => e._id !== item._id) })}}}>
                                            <IconTrash />
                                        </Avatar>
                                    </Group>
                                </Flex>
                            )
                        })
                    }
                </Flex>
                <Button w="130px" style={{alignSelf: "flex-end"}} type="submit" disabled={!reqFinished} variant="light" >Submit</Button>
            </Flex>
        </form>
      </Modal>
        </>
    )
}

const ModalsManager = () => {
    return (
        <>
            <DetailModal />
            <AddModal />
            <DeleteModal />
            <SendMessageModal />
            <EditModal />
        </>
    )
}

export default ModalsManager