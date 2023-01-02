import {
    Title, Flex,
    Text, Card, 
    Button, Pagination,
    Group
} from "@mantine/core";
import { IconFileDescription, IconTrash, IconEdit, IconSend } from "@tabler/icons";
import { FC, Key, use, useEffect, useState } from "react";

import useAdminStore from "../../../utils/stores";
import apiMethod from "../../../utils/api";
import { ICustomer } from "../../../interfaces/backend";
import ModalsManager from "./ModalsManager";

const DataCard: FC<ICustomer> = ({_id, alamat, bulan, logKontak, nama, telepon}) => {
    const contentEditables = useAdminStore(state => state.contentEditables);
    const setCurrentModified = useAdminStore(state => state.setCurrentModified);
    const data = {_id, alamat, bulan, logKontak, nama, telepon}

    return (
    <>
        <Card
        shadow="sm"
        p={0}
        w="370px"
        withBorder
        >
            <Flex direction={"column"} justify="space-between" h="100%">
                <Card.Section p="sm" mt="0px" >
                    <Title weight={700} order={2} lineClamp={1}>
                        {nama}
                    </Title>
                    <Text  color={"dimmed"} mt="xs">
                        {bulan}
                    </Text>

                    <Text color={"dimmed"} lineClamp={3}>
                        {telepon}
                    </Text>
                    <Text mt="sm" lineClamp={3}>
                        {alamat}
                    </Text>

                </Card.Section>
                
                <Card.Section p="sm">
                    <Text color={logKontak.length == 0 ? "red" : "white"} lineClamp={3} mb="xs">
                        {logKontak.length == 0 ? "Belum pernah dihubungi" : `${logKontak.length} kali dihubungi`}
                    </Text>
                    <Flex gap="xs" pr="xs">
                        <Button color={"grape"} variant="light" disabled={contentEditables} onClick={()=>{setCurrentModified(true, "message", data)}}>
                            <IconSend />
                        </Button>
                        <Button color={"blue"} variant="light" disabled={contentEditables} onClick={()=>{setCurrentModified(true, "detail", data)}}>
                            <IconFileDescription />
                        </Button>
                        <Button color={"teal"} variant="light" disabled={contentEditables} >
                            <IconEdit />
                        </Button>
                        <Button color={"red"} variant="light" disabled={contentEditables} onClick={()=>{setCurrentModified(true, "delete", data)}}>
                            <IconTrash />
                        </Button>
                    </Flex>
                </Card.Section>
            </Flex>
        </Card>
    </>
    )
}


const Paginate = () => {
    const pagination = useAdminStore(state => state.pagination);
    const contentEditables = useAdminStore(state => state.contentEditables);
    const setPagination = useAdminStore(state => state.setPagination);
    const setCustomer = useAdminStore(state => state.updateCustomers);
    const updateEditable = useAdminStore(state => state.updateEditable);


    function handleChange(v:number){
        setPagination({
            current: v,
            isDisabled: true,
            total: pagination.total
        })
        updateEditable(true);
        apiMethod.getDatas(v)
            .then((v) => {
                const {page, totalPages} = v.data.data;
                const customers = v.data.data.docs as ICustomer[];

                setCustomer(customers);
                setPagination({
                    current: page,
                    isDisabled: false,
                    total: totalPages
                })
                updateEditable(false);
            })
            .catch((e)=>{
                console.log(e);
            }).finally(()=>{
                updateEditable(useAdminStore.getState().contentEditables);
                setPagination({
                    ...useAdminStore.getState().pagination,
                    isDisabled: false
                })
                
                
            })
    }
    return <Pagination page={pagination.current} onChange={handleChange} total={pagination.total} color={"grape"} disabled={contentEditables} />
}



const Looper = () => {
    const customers = useAdminStore(state => state.customers);
    const filter = useAdminStore(state => state.filter);
    const [filteredData, setFD] = useState<ICustomer[]>([]);

    useEffect(()=>{
        if(typeof customers !== "boolean"){
            setFD(customers.filter((customer)=> {
                if(customer.nama.toLowerCase().includes(filter.text as string)){
                    if(filter.isNonTouched){
                        if(customer.currentLog){
                            console.log(new Date().getTime() - new Date(customer.currentLog.tanggal).getTime(), customer.currentLog.tanggal);
                            
                            if((new Date().getTime() - new Date(customer.currentLog.tanggal).getTime()) <= 60*60*24*30*2*1000){
                                return false
                            }
                        }
                    }
                    return true
                }
              }))
        }
    }, [filter, customers])
    
    
    if(typeof customers === "boolean"){
        return (
            <Text>
                Terjadi Error dalam pengambilan data
            </Text>
        )
    }else{
        if(customers.length >= 0){
            return (
                <>
                {
                    filteredData.length == 0 ? 
                    <Text>
                        Hasil Pencarian tidak ada
                    </Text>
                    :
                    filteredData.map((customer) => {
                        return <DataCard key={customer._id as Key} {...customer} />
                    })
                }
                </>
            )

        }
        return (
            <Text>
                Tidak ada data yang bisa ditampilkan
            </Text>
        )
    }
}
const DataMain = () => {
    const setPagination = useAdminStore(state => state.setPagination);
    const setCustomer = useAdminStore(state => state.updateCustomers)

    useEffect(()=>{
        apiMethod.getDatas()
            .then((v)=> {
                const customers = v.data.data.docs as ICustomer[];
                const {page, totalPages} = v.data.data;

                setCustomer(customers);
                setPagination({
                    current: page as number,
                    isDisabled: false,
                    total: totalPages as number
                })

            })

            .catch((e) => {
                console.log(e);
            })
    }, [])
    return (
        <>
        <Flex direction={"column"} gap={"sm"}>
            <Title order={2}>
                Statistik Data
            </Title>

            <Paginate />

            <Flex wrap={"wrap"} gap="sm" mt="md">
                <Looper />
            </Flex>
            <ModalsManager />
        </Flex>
        </>
    )
}

export default DataMain;