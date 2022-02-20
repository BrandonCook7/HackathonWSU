import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Input, Button, Container, Stack, Alert, Text } from "@chakra-ui/react";

import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
mutation Mutation($eventInput: EventInput) {
  addEvent(eventInput: $eventInput) {
    host {
      email
      reputation
    }
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
        loginUser();
    }

    const {onChange, onSubmit, values } = useForm(createEventCallback, {
        user_id: 'asdf',
        title: 'here is my life',
        description: 'what are those man what the fuck are those actually',
        tags: [],
        requirements: 50.0,
        location: '',
        start_time: '',
        slots: 10
    });
    
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { eventInput: values }
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
            <Button colorScheme='blue' onClick={onSubmit}>Create Post</Button>
        </Container>
    );
}

export default CreateEvent;
