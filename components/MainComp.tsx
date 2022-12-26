import {Container, Group, Flex, useMantineTheme} from "@mantine/core";

import DataDetail from "./Main/DataDetails";
import DataMain from "./Main/DataMain";



export default function MainCom(){
    const theme = useMantineTheme();

    return (
    <>
    <Container miw="100%">
        <Group w="100%">
            <Flex
            direction={"column"}
            gap={"lg"}
            >
                <DataDetail />
                <DataMain />  
                
            </Flex>
        </Group>
    </Container>
    </>
    )
}