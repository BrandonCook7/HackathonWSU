import { Flex, Container, MenuItem, Box } from '@chakra-ui/react';


function Navbar() {
    return (
        <Container minWidth="container.lg">
            <Box w='100%' p={8,2,0,2} color='black' fontSize={"20px"} borderBottom={"1px solid black"}>
                Coug Events
            </Box>
        </Container>
    )
}

export default Navbar;