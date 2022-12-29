import {Group, Title, Flex, Avatar, Text, useMantineTheme} from "@mantine/core";
import { IconAbacus } from "@tabler/icons";
import { useEffect } from "react";
import { ICustStat } from "../../../interfaces/backend";

import useAdminStore from "../../../utils/stores";
import apiMethod from "../../../utils/api";

import { FC, Key } from "react";

const DataCard: FC<ICustStat> = ({_id, count}) => {
    const theme = useMantineTheme();

    return (
        <>
        <Group bg={`${theme.colorScheme == 'dark' ? "dark.5" : "rgba(248, 240, 252, 1)"}`} pr={"xs"} fw="bold">
            <Avatar color="grape" radius={"xs"}>
                <IconAbacus size={20} />
            </Avatar>
            <Flex gap="sm">
                <Text size={"sm"}>{count}</Text>
                <Text size={"sm"}>
                    {_id}
                </Text>
            </Flex>
        </Group>
        </>
    )
}


const Looper = () => {
    const customerStat = useAdminStore(state => state.customersStats);
    
    if(typeof customerStat === "boolean"){
        return (
            <Text>
                Terjadi Error dalam pengambilan data
            </Text>
        )
    }else{
        if(customerStat.length >= 0){
            return (
                <>
                <DataCard key={"total"} _id={"total"} count={customerStat.map((v)=> v.count).reduce((prev, now) => prev + now, 0)} />
                {
                    customerStat.map((stat)=> {
                        return (
                            <DataCard key={stat._id as Key} {...stat} />
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
const DataDetail = () => {
    const updateStats = useAdminStore(state => state.updateStats);

    useEffect(()=>{
        apiMethod.getDetails()
            .then((v)=>{
                const data: ICustStat[] = v.data.data;
                updateStats(true, data, 0)
            })
            .catch((e)=>{
                updateStats(true, false, 0)
            })
            .finally(()=>{
                
            })
    }, [])
    return (
        <>
        <Flex direction={"column"} gap={"sm"}>
            <Title order={2}>
                Statistik Data
            </Title>
            <Flex wrap={"wrap"} gap="xs">

                <Looper />

            </Flex>
        </Flex>
        </>
    )
}

export default DataDetail;