import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';

function PlayerStats({ data }) {
  return (
    <Box px={8} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" bgGradient="linear(to-br, blackAlpha.800, blackAlpha.900)" boxShadow="md" overflow="auto" >
      <Flex textAlign="center" align="center" justify="center" width="85%" textColor="whiteAlpha.700" py={2} my={4} mx="auto" borderRadius={24} >
        <Heading as="h1" fontSize={48} px={8} textDecoration="underline">
          {data[0].Player} Statistics
        </Heading>
        <img src="./basketball-2.webp" alt="Ball-IQ Logo" width={64} height={64} />
      </Flex>
      <Box overflowX="auto" mx="auto" width="100%">
        <Table textAlign="center" width="85%" mx="auto">
          <Thead>
            <Tr>
              <Th color="orange.600" textAlign="center">Season</Th>
              <Th color="orange.600" textAlign="center">PTS</Th>
              <Th color="orange.600" textAlign="center">AST</Th>
              <Th color="orange.600" textAlign="center">REB</Th>
              <Th color="orange.600" textAlign="center">TOV</Th>
              <Th color="orange.600" textAlign="center">FG%</Th>
              <Th color="orange.600" textAlign="center">2P%</Th>
              <Th color="orange.600" textAlign="center">3P%</Th>
              <Th color="orange.600" textAlign="center">FT%</Th>
              <Th color="orange.600" textAlign="center">eFG%</Th>
              <Th color="orange.600" textAlign="center">Shooter Grade</Th>
            </Tr>
          </Thead>
          <Tbody bgColor="whiteAlpha.700">
            {data[0].Seasons.map((season, index) => (
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
