
import { useContext } from 'react';
import { Flex, Container, MenuItem, Box, Button, Center, Text} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/react-hooks";
import { gql } from 'graphql-tag';

function Navbar() {
    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/');
    }

    console.log(user);

    return (
        <Container minWidth="container.lg" borderBottom={"1px solid black"}>
            <Flex verticalAlign={"center"}>
                <Center flex="1">
                    <Box width="200px" p={8,2,0,2} color='black' fontSize={"20px"} >
                        <Link to="/">Coug Events</Link>
                    </Box>
                    <Box w='100%' p={8,2,0,2} color='black' fontSize={"18px"} >
                        <Link to="/createevent">Create Event</Link>
                    </Box>
                </Center>
                <Center float={"right"} flex="1" marginLeft={"auto"}>
                    <Box alignItems={"right"} top={"50%"} marginLeft={"auto"}>
                        { user ?
                            <>
                                <Link to="/">Hey {user.email}!</Link>
                                <Button onClick={onLogout} marginLeft={"10px"}>Logout</Button>
                            </>
                        :
                            <>
                                <Link to="/login" style={{"marginLeft": "10px"}}>Login</Link>
                                <Link to="/register" style={{"marginLeft": "10px"}}>Register</Link>
                            </>
                        }
                    </Box>
                </Center>
            </Flex>
        </Container>
    )
}

export default Navbar;