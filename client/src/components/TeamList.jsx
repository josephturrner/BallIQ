// TeamList
import { useState, useEffect } from 'react';
import { Button, Heading, VStack, Grid, Center } from '@chakra-ui/react';
import axios from 'axios';

function TeamList() {
  const [teamsList, setTeamsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-teams`);
        console.log(response.data);
        setTeamsList(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        console.error('Error fetching teams:', error);
        setError('Error fetching teams. Please try again later.');
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (teamId) => {
    window.location.href = `/teams/${teamId}`;
  };

  return (
    <div>
      <Heading as="h1" fontSize={48} py={2} my={4} mx="auto" borderRadius={24} bgGradient="linear(to-br, #e6791e, #d4d4d4)" bgClip="text">TEAMS</Heading>
      <Center>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" maxH="40vh" gap={4} w="80%">
          {teamsList.map((team, index) => (
            <Button key={index} h="10vh" cursor="pointer" _hover={{ border: "1px solid #212121", cursor: "pointer", height: "15vh", width: "100%", borderRadius: "0% 15% 15% 0%" }} py={2} borderRadius={0} w="100%" bg="#d4d4d4" color="#212121" onClick={() => handleTeamClick(teamsList[index].team_id)}>{teamsList[index].team_name}</Button>
          ))}
        </Grid>
      </Center>
    </div>
  );
}

export default TeamList;