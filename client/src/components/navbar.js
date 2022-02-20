
import { useContext } from 'react';
import { Flex, Container, MenuItem, Box, Button, Center } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


function Navbar() {
    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <Container minWidth="container.lg" borderBottom={"1px solid black"}>
            <Flex verticalAlign={"center"}>
                <Center flex="1">
                    <Box w='100%' p={8,2,0,2} color='black' fontSize={"20px"} >
                        Coug Events
                    </Box>
                </Center>
                <Center float={"right"} flex="1" marginLeft={"auto"}>
                    <Box alignItems={"right"} top={"50%"}>
                        { user ?
                            <>
                                <Button onClick={onLogout}>Logout</Button>
                            </>
                        :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        }
                    </Box>
                </Center>
            </Flex>
        </Container>
    )
}

export default Navbar;