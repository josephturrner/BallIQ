import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, ChakraProvider } from '@chakra-ui/react';

function PlayerStats({ data }) {
  return (
    <ChakraProvider>
      <Box px={8} height="100vh" display="flex" flexDirection="column" justifyContent="top" alignItems="center" backgroundColor="gray.900" color="white" boxShadow="md">
        <Heading as="h1" size="xl" p={8} mb={4} textAlign="center" color="orange.500">
          {data[0].Player} Statistics
        </Heading>
        <Table textAlign="center" variant="striped" colorScheme="gray" size="sm" borderRadius="md">
          <Thead>
            <Tr>
              <Th color="orange.500" textAlign="center">Season</Th>
              <Th color="orange.500" textAlign="center">PTS</Th>
              <Th color="orange.500" textAlign="center">AST</Th>
              <Th color="orange.500" textAlign="center">REB</Th>
              <Th color="orange.500" textAlign="center">TOV</Th>
              <Th color="orange.500" textAlign="center">FG%</Th>
              <Th color="orange.500" textAlign="center">2P%</Th>
              <Th color="orange.500" textAlign="center">3P%</Th>
              <Th color="orange.500" textAlign="center">FT%</Th>
              <Th color="orange.500" textAlign="center">eFG%</Th>
              <Th color="orange.500" textAlign="center">Shooter Grade</Th>
            </Tr>
          </Thead>
          <Tbody backgroundColor="orange.500">
            {data.map((item, index) => (
              <Tr key={index} borderWidth={0} backgroundColor="orange.500">
                <Td backgroundColor="orange.500" color="gray.900" textAlign="center">{item.Season}</Td>
                <Td color="gray.900" textAlign="center">{item.PTS}</Td>
                <Td color="gray.900" textAlign="center">{item.AST}</Td>
                <Td color="gray.900" textAlign="center">{item.REB}</Td>
                <Td color="gray.900" textAlign="center">{item.TOV}</Td>
                <Td color="gray.900" textAlign="center">{item.FGPercentage}%</Td>
                <Td color="gray.900" textAlign="center">{item.TwoPPercentage}%</Td>
                <Td color="gray.900" textAlign="center">{item.ThreePPercentage}%</Td>
                <Td color="gray.900" textAlign="center">{item.FTPercentage}%</Td>
                <Td color="gray.900" textAlign="center">{item.eFGPercentage}%</Td>
                <Td color="gray.900" textAlign="center">{item.ShooterGrade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default PlayerStats;