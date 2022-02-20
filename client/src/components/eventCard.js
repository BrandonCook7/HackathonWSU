import { Box, Image, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Circle } from "material-icons";
import 'material-icons/iconfont/material-icons.css';

function EventCard() {
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
  
    return (
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' as='button' textAlign={"left"} marginBottom={"10px"} boxShadow='md'>
        {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}
        <Box p='6'>
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
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
              Basketball at the UREC 5v5
          </Box>
  
          <Box>
            <Box as='span' color='gray.600' fontSize='sm'>
                Pullman WA
            </Box>
          </Box>
          <Box>
            This is the description of the post, this is the description. This is the description of the post, this is the description. This is the description of the post, this is the description.
            
          </Box>
  
          <Box display='flex' mt='1' alignItems='center'>
            {Array(10)
              .fill('')
              .map((_, i) => (
                <span class="material-icons" style={{fontSize: "10px", color: property.rating > i ? "green" : "grey" }}>circle</span>
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              3 slots remaining
            </Box>
          </Box>
        </Box>
      </Box>
    )
}

export default EventCard;
