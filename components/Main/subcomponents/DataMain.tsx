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

const DataCard: FC<ICustomer> = ({_id, alamat, bulan, logKontak, nama, telepon}) => {
    const pagination = useAdminStore(state => state.pagination);

    return (
    <>
        <Card
        shadow="sm"
        p={0}
        w="370px"

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
                    <Flex gap="xs" pr="xs">
                        <Button color={"grape"} variant="light" disabled={pagination.isDisabled}>
                            <IconSend />
                        </Button>
                        <Button color={"blue"} variant="light" disabled={pagination.isDisabled}>
                            <IconFileDescription />
                        </Button>
                        <Button color={"teal"} variant="light" disabled={pagination.isDisabled}>
                            <IconEdit />
                        </Button>
                        <Button color={"red"} variant="light" disabled={pagination.isDisabled}>
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
    const setPagination = useAdminStore(state => state.setPagination);
    const setCustomer = useAdminStore(state => state.updateCustomers)


    function handleChange(v:number){
        setPagination({
            current: v,
            isDisabled: true,
            total: pagination.total
        })
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
            })
            .catch((e)=>{
                console.log(e);
            }).finally(()=>{
                setPagination({
                    ...useAdminStore.getState().pagination,
                    isDisabled: false
                })
                
                
            })
    }
    return <Pagination page={pagination.current} onChange={handleChange} total={pagination.total} color={"grape"} disabled={pagination.isDisabled} />
}



const Looper = () => {
    const customers = useAdminStore(state => state.customers);
    
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
                    customers.map((customer)=> {
                        return (
                            <DataCard key={customer._id as Key} {...customer} />
                        )
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
        </Flex>
        </>
    )
}

export default DataMain;