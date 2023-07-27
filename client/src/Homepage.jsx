// HomePage.js
import { useState } from 'react';
import { Button, Box, Heading, Input, Flex, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PlayerDetailsPage from './PlayerDetailsPage';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/fetch-data?q=${encodeURIComponent(searchQuery)}`);
      console.log(response);
      setSearchResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Router>
      <Box bgGradient="linear(to-br, #666565, #212121)" height="100vh" textAlign="center" display="flex" justifyContent="center">
        <Flex direction="column" w="100%">
          <Flex textAlign="center" align="center" justify="center" width="75%" textColor="ball.white" py={2} my={4} mx="auto" borderRadius={24}>
            <Heading as="h1" fontSize={60} px={8} textDecoration="underline" bgGradient="linear(to-br, #e6791e, #d4d4d4)" bgClip="text">Ball IQ</Heading>
            <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
          </Flex>
          <Box>
            <Input borderWidth={0} textColor="#212121" borderRadius={[0, 0, 0, 0]} placeholder="Search Players" mx="auto" py={2} w="25%" bgColor="#d4d4d4" _placeholder={{ color:"#212121" }} value={searchQuery} onChange={handleInputChange} />

            {searchResults.length > 0 && (
              <Box bgColor="#d4d4d4" p={2} borderRadius={[0, 0, 0, 0]} w="25%" mx="auto">
                <VStack bgColor="#d4d4d4" align="stretch" spacing={2}>
                  {searchResults.map((item, index) => (
                    <Link key={index} to={`/players/${item.player_id}`}>
                      <Button bgColor="#e6791e" textColor="#212121" w="100%" borderWidth={0} borderRadius={5} _hover={{ bgColor: "#f58e38"}}>
                        {item.first_name} {item.last_name}
                      </Button>
                    </Link>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>
          <Button width="20%" mx="auto" my={2} bgColor="#e6791e" borderWidth="0" textColor="#212121" onClick={handleSearch} _hover={{ bgColor: "#f58e38" }}>
            Search
          </Button>
        </Flex>
      </Box>

      {/* Route for Player Details Page */}
      <Switch>
        <Route path="/players/:playerId" component={PlayerDetailsPage} />
      </Switch>
    </Router>
  );
};

export default HomePage;
