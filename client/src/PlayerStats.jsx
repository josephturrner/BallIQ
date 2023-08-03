import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, ButtonGroup, Center } from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PlayerStats() {
  const { playerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerStatsData, setPlayerStatsData] = useState({});
  const [selectedOption, setSelectedOption] = useState('Regular Season');
  const [loadingText, setLoadingText] = useState('Loading');

  const handleOptionChange = (season_mode) => {
    if (playerStatsData.playoffs) {
      setSelectedOption(season_mode);
    } else {
      setSelectedOption('Regular Season')
    }
  };
  
  // Get the data source based on the selected option

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/player-stats/${playerId}`);
        console.log(response.data)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        switch (prevText) {
          case 'Loading':
            return 'Loading.';
          case 'Loading.':
            return 'Loading..';
          case 'Loading..':
            return 'Loading...';
          default:
            return 'Loading';
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return ( 
      <Box bg="#212121" px={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" overflow="auto">
        <Flex direction="column" textAlign="center" align="center" justify="center" width="85%" textColor="#d4d4d4" mx="auto" borderRadius={24}>
          <Flex w="wrap-content" textAlign="center" align="center" justify="center" py={2} mt={4} mx="auto" borderRadius={24}>
            <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">Ball IQ</Heading>
            <img src="../../basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
          </Flex>
          <Center mt={12} h="100%">
            <Heading fontSize={40} bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">
              {loadingText}
            </Heading>
          </Center>
        </Flex>
      </Box>
    )
  }

  if (error) {
    return (
      <Box bg="#212121" px={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" overflow="auto">
        <Flex direction="column" textAlign="center" align="center" justify="center" width="85%" textColor="#d4d4d4" mx="auto" borderRadius={24}>
          <Link to="/" _hover={{ cursor: "pointer" }} w="wrap-content">
            <Flex w="wrap-content" textAlign="center" align="center" justify="center" py={2} mt={4} mx="auto" borderRadius={24}>
              <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">Ball IQ</Heading>
              <img src="../../basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
            </Flex>
          </Link>
          <Center mt={12} h="100%">
            <Heading fontSize={40} bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">
              Error! The API may not be up right now. Try refreshing the page or click the logo to go back to the homepage...
            </Heading>
          </Center>
        </Flex>
      </Box>
    );
  }

  const dataSource = selectedOption === 'Regular Season' ? playerStatsData.regular_season : playerStatsData.playoffs;

  return (
    <Box bg="#212121" px={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" overflow="auto">
      <Flex direction="column" textAlign="center" align="center" justify="center" width="85%" textColor="#d4d4d4" mx="auto" borderRadius={24}>
        <Link to="/" _hover={{ cursor: "pointer" }} w="wrap-content">
          <Flex w="wrap-content" textAlign="center" align="center" justify="center" py={2} mt={4} mx="auto" borderRadius={24}>
            <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">Ball IQ</Heading>
            <img src="../../basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
          </Flex>
        </Link>
        <Heading mt={4} mb={2} fontSize={32} textColor="#d4d4d4">
          {playerStatsData.full_name}
        </Heading>
      </Flex>
      <Box mt={2}>
        <ButtonGroup isAttached w="100%">
          <Button bg={selectedOption === "Regular Season" ? "#e6791e" : "#212121"} textColor={selectedOption === "Regular Season" ? "#212121" : "#e6791e"} _hover={selectedOption === "Regular Season" ? {bg:"#e6791e", cursor:"default"} : {bg:"#666565"}} onClick={() => handleOptionChange('Regular Season')} borderRadius={2}>
            Regular Season
          </Button>
          <Button bg={selectedOption === "Playoffs" ? "#e6791e" : "#212121"} textColor={selectedOption === "Playoffs" ? "#212121" : "#e6791e"} _hover={selectedOption === "Playoffs" ? {bg:"#e6791e", cursor:"default"} : {bg:"#666565"}} onClick={() => handleOptionChange('Playoffs')} borderRadius={2}>
            Playoffs
          </Button>
        </ButtonGroup>
      </Box>
      <Box overflowX="auto" mx="auto" width="90%" h="69vh">
        <Table textAlign="center" width="100%" mx="auto">
          <Thead>
            <Tr bg="#212121" position="sticky" top="0" zIndex="1">
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">Season</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">Age</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">Team</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">GP</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">GS</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">MIN</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">PTS</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FG%</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">3P%</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FT%</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">AST</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">TOV</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">OREB</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">DREB</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">REB</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">STL</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">BLK</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FGA</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FGM</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">3PA</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">3PM</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FTA</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">FTM</Th>
              <Th mx={1} px={1} borderColor="#666565" color="#e6791e" textAlign="center">Shooter Grade</Th>
            </Tr>
          </Thead>
          <Tbody bgColor="#d4d4d4" overflowY="scroll">
            {dataSource.seasons.map((season, index) => (
              <Tr key={index} borderWidth={0}>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.SEASON_ID}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.PLAYER_AGE}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.TEAM_ABBREVIATION}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.GP}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.GS}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.MIN}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.PTS}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{(season.FG_PCT*100).toFixed(2)}%</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{(season.FG3_PCT*100).toFixed(2)}%</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{(season.FT_PCT*100).toFixed(2)}%</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.AST}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.TOV}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.OREB}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.DREB}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.REB}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.STL}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.BLK}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FGA}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FGM}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FG3A}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FG3M}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FTA}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.FTM}</Td>
                <Td mx={1} px={1} borderColor="#666565" textAlign="center">{season.SHOOTER_GRADE}</Td>
              </Tr>
            ))}
            <Tr fontWeight="bold" position="sticky" bottom="0" zIndex="1" bg="#212121" color="#e6791e">
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.SEASON_ID}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.PLAYER_AGE}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.TEAM_ABBREVIATION}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.GP}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.GS}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.MIN}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.PTS}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{(dataSource.career.FG_PCT*100).toFixed(2)}%</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{(dataSource.career.FG3_PCT*100).toFixed(2)}%</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{(dataSource.career.FT_PCT*100).toFixed(2)}%</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.AST}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.TOV}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.OREB}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.DREB}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.REB}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.STL}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.BLK}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FGA}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FGM}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FG3A}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FG3M}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FTA}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.FTM}</Td>
              <Td mx={1} px={1} borderWidth={0} textAlign="center">{dataSource.career.SHOOTER_GRADE}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default PlayerStats;