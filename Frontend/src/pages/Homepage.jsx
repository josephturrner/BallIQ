import { useState } from 'react';
import { Button, Box, Heading, Input, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store the filtered results
  const [error, setError] = useState(null); // State to store any errors

  const handleSearch = async () => {
    try {
      // Make a GET request to the backend server with the search query as a query parameter
      const response = await axios.get(`http://localhost:8801/fetch-data?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.'); // Set the error state
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box bgGradient="linear(to-br, blackAlpha.800, blackAlpha.900)" height="100vh" textAlign="center" display="flex" justifyContent="center">
      <Flex direction="column" w="100%">
        <Flex textAlign="center" align="center" justify="center" width="75%" textColor="whiteAlpha.700" py={2} my={4} mx="auto" borderRadius={24}>
          <Heading as="h1" fontSize={60} px={8} textDecoration="underline">Ball-IQ</Heading>
          <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
        </Flex>
        <Input textColor="blackAlpha.800" placeholder="Search Players" mx="auto" my={8} py={2} w="25%" bgColor="whiteAlpha.700" borderColor="white" borderWidth={1} _hover={{ borderColor:"orange.500" }} _placeholder={{ color:"blackAlpha.800" }} value={searchQuery} onChange={handleInputChange} />
        <Button width="20%" mx="auto" bgColor="orange.600" borderWidth="0" textColor="gray.800" onClick={handleSearch}>
          Search
        </Button>
      </Flex>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {searchResults.map((item, index) => (
            <li key={index}>
              {item.field1} - {item.field2}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default HomePage;
