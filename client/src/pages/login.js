import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Input, Button, Container, Stack, Alert, Text } from "@chakra-ui/react";

import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation login(
        $loginInput: LoginInput
    ) {
        loginUser(
            loginInput: $loginInput
        ){
            email
            username
            token
        }
    }
`

function Login(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);

    function loginUserCallback() {
        loginUser();
    }

    const {onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values }
    });

    return (
        <Container spacing={2} maxWidth="sm" shadow="md" padding={4}>
            <Text fontSize="2xl">Login</Text>
            <Text fontSize="md" marginBottom={"10px"}>Welcome to CougEvents, login below!</Text>
            <Stack spacing={2} paddingBottom={2}>
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
            </Stack>
            {errors.map(function(error){
                return (
                    <Alert status='error'>
                        {error.message}
                    </Alert>
                );
            })}
            <Button colorScheme='blue' onClick={onSubmit}>Login</Button>
        </Container>
    );
}

export default Login;

