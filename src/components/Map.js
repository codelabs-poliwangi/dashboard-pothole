import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Select, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Atur ikon default jika ikon marker tidak muncul
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = () => {
  const [potholes, setPotholes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/dummy_data.json')
      .then(response => response.json())
      .then(data => setPotholes(data))
      .catch(error => setError(error.message));
  }, []);

  const filteredPotholes =
    filter === 'all' ? potholes : potholes.filter(p => p.category === filter);

  return (
    <Box height="80vh" width="100%" p={4} borderRadius="lg" boxShadow="lg" overflow="hidden">
      {error && <Text color="red.500">Error: {error}</Text>}
      <Select
        onChange={e => setFilter(e.target.value)}
        mb={4}
        placeholder="Pilih Kategori Kerusakan"
      >
        <option value="all">Semua Kategori Kerusakan</option>
        <option value="jalan amblas">Jalan Amblas</option>
        <option value="jalan retak">Jalan Retak</option>
        <option value="jalan miring">Jalan Miring</option>
        <option value="jalan lubang">Jalan Lubang</option>
      </Select>

      <Box flex="1" position="relative" height="100%">
        <MapContainer
          center={[-8.420508, 114.104987]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredPotholes.map(pothole => {
            const [lat, lng] = pothole.location.split(',').map(coord => parseFloat(coord.trim()));

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker key={pothole.id} position={[lat, lng]} icon={defaultIcon}>
                  <Popup>
                    Jenis Kerusakan: {pothole.damage_type}
                    <br />
                    Lokasi: {pothole.location}
                  </Popup>
                </Marker>
              );
            } else {
              console.error("Invalid coordinates for pothole:", pothole);
              return null;
            }
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapComponent;
