// src/components/Grafik.js

import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafik = () => {
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Jumlah Kerusakan Berdasarkan Kategori',
        data: Object.values(categoryCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: context => `${context.label}: ${context.raw} kejadian`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Grafik Kerusakan Berdasarkan Kategori</Heading>
      <Box width="100%" height="100%">
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default Grafik;
