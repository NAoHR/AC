import {
    Title, Flex,
    Text, Card, Button,
} from "@mantine/core";
import { IconFileDescription, IconTrash, IconEdit, IconSend } from "@tabler/icons";

const DataCard = () => {
    
    return (
    <>
        <Card
        shadow="sm"
        p={0}
        maw="370px"
        >
            <Flex direction={"column"}>
                <Card.Section p="sm" mt="0px" >
                    <Title weight={700} order={2} lineClamp={1}>
                        PT. Lorem Ipsum
                    </Title>
                    <Text  color={"dimmed"} mt="xs">
                        januari
                    </Text>

                    <Text color={"dimmed"} lineClamp={3}>
                        091231231
                    </Text>
                    <Text mt="sm" lineClamp={3}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, autem? Enim sint cum quibusdam officiis eius sequi aperiam totam perferendis temporibus, quo iure voluptas perspiciatis, obcaecati voluptates libero alias deleniti.
                    </Text>

                </Card.Section>
                
                <Card.Section p="sm">
                    <Flex gap="xs" pr="xs">
                        <Button color={"grape"} variant="light">
                            <IconSend />
                        </Button>
                        <Button color={"blue"} variant="light" >
                            <IconFileDescription />
                        </Button>
                        <Button color={"teal"} variant="light" >
                            <IconEdit />
                        </Button>
                        <Button color={"red"} variant="light" >
                            <IconTrash />
                        </Button>
                    </Flex>
                </Card.Section>
            </Flex>
        </Card>
    </>
    )
}
const DataMain = () => {

    return (
        <>
        <Flex direction={"column"} gap={"sm"}>
            <Title order={2}>
                Statistik Data
            </Title>
            <Flex wrap={"wrap"} gap="sm" mt="md">

                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />

            </Flex>
        </Flex>
        </>
    )
}

export default DataMain;