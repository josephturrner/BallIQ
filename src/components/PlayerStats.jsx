import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, ChakraProvider } from '@chakra-ui/react';

function PlayerStats({data}) {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="lg" p={8} mb={4} textAlign="center">
          {data[0].Player} Statistics
        </Heading>
        <Table textAlign="center" variant="simple">
          <Thead>
            <Tr>
              <Th>Season</Th>
              <Th>PTS</Th>
              <Th>AST</Th>
              <Th>REB</Th>
              <Th>TOV</Th>
              <Th>FG%</Th>
              <Th>2P%</Th>
              <Th>3P%</Th>
              <Th>FT%</Th>
              <Th>eFG%</Th>
              <Th>Shooter Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.Season}</Td>
                <Td>{item.PTS}</Td>
                <Td>{item.AST}</Td>
                <Td>{item.REB}</Td>
                <Td>{item.TOV}</Td>
                <Td>{item.FGPercentage}%</Td>
                <Td>{item.TwoPPercentage}%</Td>
                <Td>{item.ThreePPercentage}%</Td>
                <Td>{item.FTPercentage}%</Td>
                <Td>{item.eFGPercentage}%</Td>
                <Td>{item.ShooterGrade}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default PlayerStats;