import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

// Data dummy untuk riwayat deteksi
const riwayatData = [
  { no: 1, tanggal: '2024-09-01', device: 'Samsung Galaxy S21', damage_type: 'Jalan Berlubang (42.0%)' },
  { no: 2, tanggal: '2024-09-02', device: 'iPhone 13', damage_type: 'Retakan (30.0%)' },
  { no: 3, tanggal: '2024-09-03', device: 'Xiaomi Mi 11', damage_type: 'Lubang Kecil (28.0%)' },
  { no: 4, tanggal: '2024-09-04', device: 'Google Pixel 6', damage_type: 'Jalan Berlubang (42.0%)' },
  { no: 5, tanggal: '2024-09-05', device: 'OnePlus 9', damage_type: 'Retakan (30.0%)' },
  // Tambahkan lebih banyak data dummy sesuai kebutuhan
];

const RiwayatDeteksi = () => {
  return (
    <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
      <Heading size="lg" mb={4}>Riwayat Proses Deteksi</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Tanggal</Th>
            <Th>Jenis Device</Th>
            <Th>Jenis Kerusakan</Th>
          </Tr>
        </Thead>
        <Tbody>
          {riwayatData.map((item) => (
            <Tr key={item.no}>
              <Td>{item.no}</Td>
              <Td>{item.tanggal}</Td>
              <Td>{item.device}</Td>
              <Td>{item.damage_type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RiwayatDeteksi;
