import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Input, Button, Container, Stack, Alert, Text } from "@chakra-ui/react";

import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
            id
        }
    }
`

function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback hit");
        registerUser();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: ''
    });

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    });
    
    return (
        <Container spacing={2} maxWidth="sm" shadow="md" padding={4}>
            <Text fontSize="2xl">Register</Text>
            <Text fontSize="md" marginBottom={"10px"}>This is the register page, register below to create an account!</Text>
            <Stack spacing={2} paddingBottom={2}>
                <Text >Username</Text>
                <Input
                    label="Username"
                    name="username"
                    onChange={onChange}
                />
                <Text>Email</Text>
                <Input
                    label="Email"
                    name="email"
                    onChange={onChange}
                />
                <Text>Password</Text>
                <Input
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
                {/*<Text>Confirm password</Text>
                <Input
                    label="Confirm password"
                    name="confirmPassword"
                    onChange={onChange}
                />*/}
            </Stack>
            {errors.map(function(error){
                return (
                    <Alert status="error">
                        {error.message}
                    </Alert>
                );
            })}
            <Button colorScheme='blue' onClick={onSubmit}>Register</Button>
        </Container>
    )
}

export default Register;