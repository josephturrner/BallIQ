// HomePage.js
import { useState } from 'react';
import { Button, Box, Heading, Input, Flex, VStack } from '@chakra-ui/react';
import axios from 'axios';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const setError = useState(null)[1];

  const handleSearch = async () => {
    try {
      if (searchQuery) {
        console.log(searchQuery)
        const response = await axios.get(`http://localhost:8081/search-players?q=${encodeURIComponent(searchQuery)}`);
        console.log(response);
        setSearchResults(response.data);
        setError(null);
      } else {
        setSearchResults(null);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  const handlePlayerClick = (playerId) => {
    window.location.href = `/players/${playerId}`;
  };

  return (
    <Box bg="#212121" height="100vh" textAlign="center" display="flex" justifyContent="center">
      <Flex direction="column" w="100%">
        <Flex textAlign="center" align="center" justify="center" width="75%" textColor="ball.white" py={2} my={4} mx="auto" borderRadius={24}>
          <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #666565)" bgClip="text">Ball IQ</Heading>
          <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
        </Flex>
        <Box>
          <Input borderWidth={0} textColor="#212121" borderRadius={[0, 0, 0, 0]} placeholder="Search Players" mx="auto" py={2} w={{lg:"30%", md:"40%", sm:"50%"}} bgColor="#d4d4d4" _placeholder={{ color:"#212121" }} _focus={{ boxShadow:"none" }} value={searchQuery} onChange={handleInputChange} />
          {searchQuery && searchResults && searchResults.length > 0 ? (
            <Box bg="#d4d4d4" pt={4} borderRadius={[0, 0, 0, 0]} w={{lg:"30%", md:"40%", sm:"50%"}} mx="auto" overflowY="scroll" maxHeight="60vh">
              <VStack bgColor="rgb(0, 0, 0, 0)" align="stretch" spacing={0} w="100%">
                {searchResults.map((item, index) => (
                  <Button w="100%" mx={0} my={0} key={index} onClick={() => handlePlayerClick(item.player_id)} bgColor="#d4d4d4" textColor="#212121" borderWidth={0} py={6} borderRadius={0} _hover={{ bgColor: "#a8a8a8"}} >
                    {item.team_abrev} - {item.full_name}: {item.pos[0]}, {item.height[0] + "'" + item.height[2] + (item.height[3] ? item.height[3] : "")}
                  </Button>
                ))}
              </VStack>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
