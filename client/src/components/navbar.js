
import { useContext } from 'react';
import { Flex, Container, MenuItem, Box, Button } from '@chakra-ui/react';
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
        <Container minWidth="container.lg">
            <Box w='100%' p={8,2,0,2} color='black' fontSize={"20px"} borderBottom={"1px solid black"}>
                Coug Events
            </Box>
            <Box alignItems={"right"}>
                { user ?
                    <>
                        <Button style={{textDecoration: "none", color: "white"}} onClick={onLogout}>Logout</Button>
                    </>
                :
                    <>
                        <Link to="/login" style={{textDecoration: "none", color: "white", marginRight: "10px"}}>Login</Link>
                        <Link to="/register" style={{textDecoration: "none", color: "white"}}>Register</Link>
                    </>
                }
            </Box>
        </Container>
    )
}

export default Navbar;