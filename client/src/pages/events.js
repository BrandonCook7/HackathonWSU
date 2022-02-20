import EventCard from '../components/eventCard';
import ProfileCard from '../components/profileCard';
import { Container, Button, MenuItem, VStack, StackDivider, Text, Box, Menu, MenuButton, MenuList, HStack, Flex, Center, Square } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery } from '@apollo/react-hooks';
import { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";

import gql from 'graphql-tag';

const GET_LATEST_EVENTS = gql`
query Query($limit: Int) {
  getLatestEvents(limit: $limit) {
    name
    description
    requirements
    created
    start
    slots

    tags {
      category
    }
    
    joined {
      email
      username
    }
  }
}
`

function Events() {
    const [ latestEvents, setLatestEvents] = useState([]);
    const { user } = useContext(AuthContext);

    const { loading, error, data } = useQuery(GET_LATEST_EVENTS, {
        onCompleted(data) {
            console.log(data.getLatestEvents);
            setLatestEvents(data.getLatestEvents);
        },
        variables: { limit: null }
    });

    console.log(latestEvents);
    console.log(data);
    return (
    <>
      <Container minWidth="container.lg">
        <Container minWidth="container.md" >
          <Box margin={4} textAlign={"center"}>
            <Text fontSize='3xl'>Find Events</Text>
            <Text fontSize='lg'>Find events with fellow Cougs! </Text>
          </Box>
        </Container>
        <Container minWidth="900px">
        <Flex alignContent={"center"}>
          <Box flex='1' align={"center"} position="static">
            { user ?
             <ProfileCard></ProfileCard>
             :
             <>
             </>
            }
          </Box>
          <Box flex='8' align={"center"}>
              { latestEvents.length > 0 ? 
                latestEvents.map( item => {
                    return (
                        <>
                        <EventCard event={item}></EventCard>
                        </>
                    )
                })
            :
                <>
                    <p>No data</p>
                </>
            }
          </Box>
          <Box flex='1' align={"center"}>

          </Box>
        </Flex>
        </Container>
      </Container>
    </>
  );
}

export default Events;
