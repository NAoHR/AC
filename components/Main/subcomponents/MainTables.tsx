import {Flex, Avatar, Text, useMantineTheme, Table, Modal} from "@mantine/core";
import {IconInfoSquare, IconTrash, IconPencil, IconSend } from "@tabler/icons";
import { useState } from "react";
import { ReactNode } from "react";

interface LogKontakInteface {
    tanggal: Date,

}

interface DataInteface {
    nama: String,
    telepon: String,
    alamat: String,
    bulan: String,
    logKontak: LogKontakInteface[]
}

const dummy: DataInteface[] = [
    {
        "nama": "Najmi",
        "telepon": "123456789",
        "alamat": "aokwowakwaok",
        "bulan": "agustus",
        "logKontak": []
    },
    {
        "nama": "Najmi",
        "telepon": "01234",
        "alamat": "gue kangen ligar",
        "bulan": "agustus",
        "logKontak": []
    },
    {
        "nama": "Najmi",
        "telepon": "123456789",
        "alamat": "qewqew",
        "bulan": "agustus",
        "logKontak": []
    },
]

const TableHeads = (
    <tr>
      <th>Nama Pelanggan</th>
      <th>Nomor Telepon</th>
      <th>Alamat Rumah</th>
      <th>Order Bulan</th>
      <th>Histori Panggilan</th>
      <th>Info</th>
      <th>Edit</th>
      <th>Hapus</th>
      <th>Pesan</th>
    </tr>
)

interface TablePropsInterface {
    children?: ReactNode,
    data: DataInteface[]
}
const RowsMapper = (props: TablePropsInterface) => {
    const {data} = props;
    const [opened, setOpened] = useState(false);

    return (
        <>
        {
            data.map((element,i ) => {
                return (
                    <tr key={i}>
                        <td>{element.nama}</td>
                        <td>{element.telepon}</td>
                        <td>
                            <Text lineClamp={2}>
                            {element.alamat.length > 74 ? element.alamat.slice(0, 80)+"..." : element.alamat}
                            </Text>
                        </td>
                        <td>{element.bulan}</td>
                        <td>{element.logKontak.length}</td>
                        <td>
                            <Flex justify={"center"}>
                                <Modal
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    title={element.telepon}
                                >
                                    <Text>
                                        {element.alamat}
                                    </Text>
                                </Modal>
                                <Avatar variant="filled" color={"blue"} radius="sm" onClick={() => setOpened(true)}>
                                    <IconInfoSquare />
                                </Avatar>
                            </Flex>
                        </td>
                        <td>
                            <Flex justify={"center"}>
                                <Avatar variant="filled" color={"green"} radius="sm">
                                    <IconPencil />
                                </Avatar>
                            </Flex>
                        </td>
                        <td>
                            <Flex justify={"center"}>
                                <Avatar variant="filled" color={"red"} radius="sm">
                                    <IconTrash />
                                </Avatar>
                            </Flex>
                        </td>
                        <td>
                            <Flex justify={"center"}>
                                <Avatar variant="filled" color={"blue"} radius="sm">
                                    <IconSend />
                                </Avatar>
                            </Flex>
                        </td>
                    </tr>
                )
            })
        }
        </>
    )
}
export default function MainTables(){
    const theme = useMantineTheme();

    return (
        <>
        <Table striped highlightOnHover verticalSpacing={"sm"} fontSize={"md"} withBorder withColumnBorders w={"100%"}>
            <thead style={{background: theme.colorScheme == "dark" ?  theme.colors.violet[9] : theme.colors.violet[1]}}>{TableHeads}</thead>
            <tbody>
                <RowsMapper data={dummy} />
            </tbody>
        </Table>
        </>
    )
}