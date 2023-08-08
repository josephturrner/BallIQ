// TeamList
import { useState, useEffect } from 'react';
import { Button, Box, Heading, Input, Flex, VStack, HStack } from '@chakra-ui/react';
import axios from 'axios';

function TeamList () {
  const [teamsList, setTeamsList] = useState([]);
  const setError = useState(null)[1];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-teams`);
        console.log(response.data)
        setTeamsList(response.data);
        setError(null);
      } catch (error) {
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
    <VStack top="0%" left="5%" w="20%" h="100%" spacing={2}>
        <Heading color="#d4d4d4">Teams</Heading>
        {teamsList.map((team, index) => (
            <Button h={8} py={2} borderRadius={0} w="100%" bg="#d4d4d4" color="#212121" onClick={() => handleTeamClick(teamsList[index].team_id)}>{teamsList[index].team_name}</Button>
        ))}
    </VStack>
  );
};

export default TeamList;
