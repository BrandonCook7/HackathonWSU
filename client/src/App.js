import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import EventCard from './components/eventCard';
import ProfileCard from './components/profileCard';
import { Container, Button, MenuItem, VStack, StackDivider, Text, Box, Menu, MenuButton, MenuList, HStack, Flex, Center, Square } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container minWidth="container.lg">
        <Container minWidth="container.md" >
          <Box margin={4} textAlign={"center"}>
            <Text fontSize='3xl'>Find Events</Text>
            <Text fontSize='lg'>Find events with fellow Cougs! </Text>
            <HStack spacing='24px' margin={4}>
              <Box
                p={2}
                flex='1'
                borderRadius='md'
              >
              </Box>
              <Box
                p={2}
                flex='4'
                borderRadius='md'
                alignContent="left"
              >
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} placement='auto-start'>
                    Filter by...
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Basketball</MenuItem>
                  </MenuList>
                </Menu>
                {/*<Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} placement='auto-start'>
                    Sort by...
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Basketball</MenuItem>
                  </MenuList>
                </Menu>*/}
              </Box>
            </HStack>
          </Box>
        </Container>
        <Container minWidth="900px">
        <Flex alignContent={"center"}>
          <Box flex='1' align={"center"} position="static">
            <ProfileCard></ProfileCard>
          </Box>
          <Box flex='8' align={"center"}>
            <EventCard></EventCard>
            <EventCard></EventCard>
            <EventCard></EventCard>
            <EventCard></EventCard>
          </Box>
          <Box flex='1' align={"center"}>

          </Box>
        </Flex>
          {/*<HStack spacing='12px' margin={4} alignContent={"center"}>
              <Box
                flex='1'
                borderRadius='md'
                spacing={2}
              >
                <ProfileCard></ProfileCard>
              </Box>
              <Box
                flex='2'
                borderRadius='md'
                spacing={2}
              >
                <EventCard></EventCard>
                <EventCard></EventCard>
                
              </Box>
           </HStack>*/}
        </Container>
      </Container>
    </>
  );
}

export default App;
