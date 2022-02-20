import EventCard from '../components/eventCard';
import ProfileCard from '../components/profileCard';
import { Container, Button, MenuItem, VStack, StackDivider, Text, Box, Menu, MenuButton, MenuList, HStack, Flex, Center, Square, Avatar, Stack, Checkbox } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import Context from '@mui/base/TabsUnstyled/TabsContext';

const GET_EVENT = gql`
query Query($eventName: String) {
  findEventByName(eventName: $eventName) {
    name
    tags
    joined
    uuid
    host
    created
    slots
    description
    start
    requirements
    location
    eventHasHappened
  }
}
`

const GET_EVENT_USERS = gql`
    query GetEventUsers($eventName: String) {
        getEventUsers(event_name: $eventName) {
            email
            reputation
            username
            short_description
        }
    }
`

const JOIN_EVENT = gql`
mutation Mutation($eventJoin: EventJoin) {
  joinEvent(eventJoin: $eventJoin) {
    name
    joined
  }
}
`

function EventPage() {
    const [ event, setEvent] = useState({});
    const [ userList, setUserList] = useState([]);
    let { id } = useParams();
    const { user } = useContext(AuthContext);

    const { loading, error, data } = useQuery(GET_EVENT, {
        onCompleted(data) {
            console.log(data.getLatestEvents);
            setEvent(data.findEventByName);
        },
        variables: { eventName: id }
    });

    const { loading1, error1, dataa } = useQuery(GET_EVENT_USERS, {
        onCompleted(data) {
            setUserList(data.getEventUsers);
        },
        variables: { eventName: id }
    });

    const [joinEvent, { loading2 }] = useMutation(JOIN_EVENT, {
        update(proxy, { data }) {
            console.log(data);
            window.location.reload(false);
        },
        variables: { eventJoin: {
            "user_email": user.email,
            "event_name": id
        }}
    });
    console.log(user);
    return (
    <>
      <Container minWidth="container.lg">
        <Container minWidth="container.md" >
          <Box margin={4} textAlign={"center"}>
          </Box>
        </Container>
        <Container minWidth="900px" alignContent={"center"} alignItems={"center"}>
        <Center>
                { JSON.stringify(event) != "{}" ?
                    <>
                        <Box maxW='xl' minWidth="1000px" borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign={"left"} marginBottom={"10px"} boxShadow='md'>
        {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}
                        <Box p='6' paddingBottom="0">
                            <Box
                                fontWeight='semibold'
                                lineHeight='tight'
                                isTruncated
                            >
                                <Text fontSize={"2xl"}>{event.name}</Text>
                            </Box>
                            <Box
                                lineHeight='tight'
                            >
                                <Text fontSize={"xl"}>{event.description}</Text>
                            </Box>
                        </Box>
                        <Box p="6" >
                            <Text fontSize={"2xl"}>Particpants List</Text>
                            {JSON.stringify(userList) != "[]" ?
                                    <>
                                    {userList.map((object) => {
                                        return (<>
                                        <Avatar name={object.email} marginRight={"10px"}></Avatar>
                                        </>)
                                    })}
                                    </>
                                :
                                    <>
                                    </>
                                }
                            
                            <Text fontSize={"lg"}>{event.slots - event.joined.length} more slots</Text>
                            <Button colorScheme="blue" onClick={joinEvent}>Join Event!</Button>
                            {JSON.stringify(event) != "{}" && event.host == user.email ?
                                <>
                                <Text fontSize={"lg"} pt={6}>Hey host! Who showed up?</Text>
                                <Stack mt={1} spacing={1}>
                                    {JSON.stringify(userList) != "[]" ?
                                        <>
                                        {userList.map((object) => {
                                            return (<>
                                            <Checkbox>
                                                {object.email}
                                            </Checkbox>
                                            </>)
                                        })}
                                        </>
                                    :
                                        <>
                                        </>
                                    }
                                </Stack>
                                <Button colorScheme="blue" mt={1}>Submit Attendance</Button>
                                </>
                            :
                                <>
                                
                                </>
                            }
                            
                        </Box>

                        </Box>
                    </>
                :
                    <>

                    </>
                }
         </Center>
        </Container>
      </Container>
    </>
  );
}

export default EventPage;
