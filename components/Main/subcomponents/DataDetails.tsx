import {Group, Title, Flex, Avatar, Text, useMantineTheme} from "@mantine/core";
import { IconAbacus } from "@tabler/icons";

const DataCard = () => {
    const theme = useMantineTheme();

    return (
        <>
        <Group bg={`${theme.colorScheme == 'dark' ? "dark.5" : "rgba(248, 240, 252, 1)"}`} pr={"xs"} fw="bold">
            <Avatar color="grape" radius={"xs"}>
                <IconAbacus size={20} />
            </Avatar>
            <Flex gap="sm">
                <Text size={"sm"}>Total</Text>
                <Text size={"sm"}>
                    300
                </Text>
            </Flex>
        </Group>
        </>
    )
}
const DataDetail = () => {

    return (
        <>
        <Flex direction={"column"} gap={"sm"}>
            <Title order={2}>
                Statistik Data
            </Title>
            <Flex wrap={"wrap"} gap="xs">

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

export default DataDetail;