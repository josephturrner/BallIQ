import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlayerStats() {
  const { playerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStatsData, setPlayerStatsData] = useState([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/player-stats/${playerId}`);
        setPlayerStatsData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching player stats:', error);
        setError('Error fetching player stats. Please try again later.');
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box bg="#212121" px={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" overflow="auto" >
      <Flex direction="column" textAlign="center" align="center" justify="center" width="85%" textColor="#d4d4d4" mx="auto" borderRadius={24} >
        <Flex textAlign="center" align="center" justify="center" width="75%" textColor="ball.white" py={2} mt={4} mb={8} mx="auto" borderRadius={24}>
          <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">Ball IQ</Heading>
          <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
        </Flex>
        <Heading fontSize={24} textColor="#d4d4d4">
          {playerStatsData[0].Player}
        </Heading>
      </Flex>
      <Box overflowX="auto" mx="auto" width="100%">
        <Table textAlign="center" width="85%" mx="auto">
          <Thead>
            <Tr>
              <Th color="#e6791e" textAlign="center">Season</Th>
              <Th color="#e6791e" textAlign="center">PTS</Th>
              <Th color="#e6791e" textAlign="center">AST</Th>
              <Th color="#e6791e" textAlign="center">REB</Th>
              <Th color="#e6791e" textAlign="center">TOV</Th>
              <Th color="#e6791e" textAlign="center">FG%</Th>
              <Th color="#e6791e" textAlign="center">2P%</Th>
              <Th color="#e6791e" textAlign="center">3P%</Th>
              <Th color="#e6791e" textAlign="center">FT%</Th>
              <Th color="#e6791e" textAlign="center">eFG%</Th>
              <Th color="#e6791e" textAlign="center">Shooter Grade</Th>
            </Tr>
          </Thead>
          <Tbody bgColor="#d4d4d4">
            {playerStatsData[0].Seasons.map((season, index) => (
              <Tr key={index} borderWidth={0}>
                <Td textAlign="center">{season.Season}</Td>
                <Td textAlign="center">{season.PTS}</Td>
                <Td textAlign="center">{season.AST}</Td>
                <Td textAlign="center">{season.REB}</Td>
                <Td textAlign="center">{season.TOV}</Td>
                <Td textAlign="center">{season.FGPercentage}%</Td>
                <Td textAlign="center">{season.TwoPPercentage}%</Td>
                <Td textAlign="center">{season.ThreePPercentage}%</Td>
                <Td textAlign="center">{season.FTPercentage}%</Td>
                <Td textAlign="center">{season.eFGPercentage}%</Td>
                <Td textAlign="center">{season.ShooterGrade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default PlayerStats;
