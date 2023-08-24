// HomePage.js
import { useState, useEffect } from 'react';
import { Button, Box, Heading, Input, Flex, VStack } from '@chakra-ui/react';
import axios from 'axios';
import teamColors from './teamColors.json'
import './App.css'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const setError = useState(null)[1];

  useEffect(() => {
    let timeoutId;

    const handleSearch = async () => {
      try {
        if (searchQuery) {
          console.log(searchQuery);
          const response = await axios.get(`http://localhost:8081/search-players?q=${encodeURIComponent(searchQuery)}`);
          console.log(response);
          setSearchResults(response.data);
          setError(null);
        } else {
          setSearchResults([]);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    // Use a debounce timer with a minimum delay of 1 second
    const debounceSearch = () => {
      clearTimeout(timeoutId);
      // If the user types within 1 second of the last request, wait 1 second, otherwise, send immediately
      timeoutId = setTimeout(handleSearch, 500);
    };

    // Call debounceSearch when searchQuery changes
    debounceSearch();

    return () => {
      // Cleanup: clear the timeout when the component unmounts or when searchQuery changes
      clearTimeout(timeoutId);
    };
  }, [searchQuery, setError]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePlayerClick = (playerId) => {
    window.location.href = `/players/${playerId}`;
  };

  return (
    <Box bg="#212121" minH="100vh" textAlign="center" display="flex" justifyContent="center">
      <Box display="inline" w="100%" textAlign="center">
        <Flex direction="column" w="100%">
          <Flex textAlign="center" align="center" justify="center" width="75%" textColor="ball.white" py={2} my={4} mx="auto" borderRadius={24}>
            <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #d4d4d4)" bgClip="text">BALL IQ</Heading>
            <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
          </Flex>
          <Box>
            <Input borderWidth={0} textColor="#212121" borderRadius={[0, 0, 0, 0]} placeholder="Search Players" mx="auto" py={2} w="40%" bgColor="#d4d4d4" _placeholder={{ color:"#212121" }} _focus={{ boxShadow:"none" }} value={searchQuery} onChange={handleInputChange} />
            {searchQuery && searchResults && searchResults.length > 0 ? (
              <div className="search-input">
                <VStack bgColor="#d4d4d4" spacing={1} w="100%">
                  {searchResults.map((item, index) => (
                    <Button className="player-result" h="fit-content" textAlign="center" mx={0} my={0} key={index} onClick={() => handlePlayerClick(item.player_id)} bgColor={teamColors[item.abrev][0]} textColor={teamColors[item.abrev][1]} _hover={{bgColor: teamColors[item.abrev][0], textColor: teamColors[item.abrev][1]}} borderWidth={0} py={4} borderRadius={0}>
                      <img className="result-headshot" src={`data:image/png;base64,${item.headshot}`} alt=""/>{item.abrev} - {item.full_name} {item.pos[0]}, {item.height[0] + "'" + item.height[2] + (item.height[3] ? item.height[3] : "")}
                    </Button>
                  ))}
                </VStack>
              </div>
            ) : null}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePage;