import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Input, Button, Container, Stack, Alert, Text } from "@chakra-ui/react";

import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const ADD_EVENT = gql`
mutation Mutation($eventInput: EventInput) {
  addEvent(eventInput: $eventInput) {
    uuid
    host
  }
}
`


/*
{
    "eventInput": {
      "user_id": null,
      "title": null,
      "description": null,
      "tags": [],
      "requirements": [],
      "location": null,
      "start_time": null,
      "slots": null
    }
  }
*/
function CreateEvent(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);

    function createEventCallback() {
        addEvent();
    }

    const {onChange, onSubmit, values } = useForm(createEventCallback, {
        user_id: context.user.email ? context.user.email : "",
        title: 'here is my life',
        description: 'what are those man what the fuck are those actually',
        tags: [],
        requirements: 50.0,
        location: '',
        start_time: '',
        slots: 10
    });
    

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ tags, setTags ] = useState("");
    const [ requirements, setRequirements ] = useState("");
    
    const [addEvent, { loading }] = useMutation(ADD_EVENT, {
        update(proxy, { data }) {
            console.log(data);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { eventInput: {
                "user_email": context.user ? context.user.email : "",
                "title": "Beech Day Here",
                "description": "sand",
                "tags": ["hiking"],
                "requirements": 5,
                "location": null,
                "start_time": null,
                "slots": 25
            }
        }
    });

    if (!context.user) {
        return ( 
            <Container spacing={2} maxWidth="lg" shadow="md" padding={4}>
                <Text fontSize="2xl">You must be logged in to create a post.</Text>
            </Container>
        )
    }

    return (
        <Container spacing={2} maxWidth="lg" shadow="md" padding={4}>
            <Text fontSize="2xl">Create Event</Text>
            <Text fontSize="md" marginBottom={"10px"}>Welcome to CougEvents, login below!</Text>
            <Stack spacing={2} paddingBottom={2}>
                <Text>Title</Text>
                <Input 
                    name="title"
                    onChange={onChange}
                />
                <Text>Description</Text>
                <Input 
                    name="description"
                    onChange={onChange}
                />
                <Text>Tags (Seperate tags by comma)</Text>
                <Input 
                    name="description"
                    onChange={onChange}
                />
                <Text>Slots (Enter a number)</Text>
                <Input 
                    name="slots"
                    onChange={onChange}
                />
                
            </Stack>
            {errors.map(function(error){
                return (
                    <Alert status='error'>
                        {error.message}
                    </Alert>
                );
            })}
            <Button colorScheme='blue' onClick={onSubmit}>Create Event</Button>
        </Container>
    );
}

export default CreateEvent;
