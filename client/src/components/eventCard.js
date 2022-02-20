import { Box, Image, Badge, Text} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Circle } from "material-icons";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import 'material-icons/iconfont/material-icons.css';


function EventCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const property = {
      imageUrl: 'https://bit.ly/2Z4KKcF',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern home in city center in the heart of historic Los Angeles',
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4,
    }

    const event = props.event;
    
    /*
    event:
        created: "1645320269815"
        description: null
        joined: [{…}]
        name: "I have fallen and Can't get up"
        requirements: []
        slots: null
        start: null
        tags: []
    */
    
    return (
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' as='button' onClick={onOpen} textAlign={"left"} marginBottom={"10px"} boxShadow='md'>
        {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}
        <Box p='6'>
            <Box
                fontWeight='semibold'
                lineHeight='tight'
                isTruncated
            >
                <Text fontSize={"2xl"}>{event.name}</Text>
            </Box>

          <Box display='flex' alignItems='baseline'>
            {/*<Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>*/}
            <Badge borderRadius='full' px='2' colorScheme='orange'>
              Basketball
            </Badge>
            {/*<Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>*/}
          </Box>

          {/*<Box>
            <Box as='span' color='gray.600' fontSize='sm'>
                UREC            
            </Box>
          </Box>*/}
            <Box>
                {event.description}            
            </Box>
  
          <Box display='flex' mt='1' alignItems='center'>
            {Array(10)
              .fill('')
              .map((_, i) => (
                <span class="material-icons" style={{fontSize: "16px", color: property.rating > i ? "green" : "grey" }}>circle</span>
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              3 slots remaining
            </Box>
          </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{event.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {event.description}
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
      </Box>
    )
}

export default EventCard;
