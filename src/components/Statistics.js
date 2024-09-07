import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, useBreakpointValue } from '@chakra-ui/react';

const Statistics = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/dummy_data.json')
      .then(response => response.json())
      .then(data => {
        const counts = data.reduce((acc, curr) => {
          const category = curr.category;
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {});
        setCategoryCounts(counts);
      })
      .catch(error => console.error('Error fetching dummy data:', error))
      .finally(() => setLoading(false));
  }, []);

  // Responsiveness adjustments
  const boxPadding = useBreakpointValue({ base: 2, md: 4 });
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4} borderRadius="md" shadow="md">
      <Heading size={fontSize} mb={4}>Jumlah Kerusakan Berdasarkan Kategori</Heading>
      <List spacing={3}>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <ListItem key={category}>
            <Box
              p={boxPadding}
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="teal.100"
              w="full"
            >
              <Text fontWeight="bold" fontSize={fontSize}>{category}:</Text>
              <Text fontSize={fontSize}>{count} kejadian</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Statistics;
