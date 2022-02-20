import { Box, Image, Badge, Avatar, HStack,VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Circle } from "material-icons";
import 'material-icons/iconfont/material-icons.css';

function ProfileCard() {
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
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' as='button' textAlign={"left"} boxShadow='md'>
        {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}
        <Box p='6'>
            <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' size={"lg"}/>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
              Cooper Lappenbusch
          </Box>
  
          <Box>
            <Box as='span' color='gray.600' fontSize='sm'>
                Junior @ WSU
            </Box>
          </Box>


          <Box>
              <strong>Events Attended: 12</strong>
          </Box>

          <Box marginBottom={"8px"}>
            <strong>Reputation: 1,231</strong>
          </Box>

          <Box marginBottom={"3px"}>
            Friends Online
          </Box>

            

            <VStack alignContent={"left"} alignItems={"left"}>
                <Box alignContent={"left"}>
                    <Avatar name='Kola Tioluwani' src='https://bit.ly/dan-abramov' size={"sm"}/>
                    <Box as='span' color='black' fontSize='sm' ml={1}>
                        Eric Simpson
                    </Box>
                </Box>
                <Box alignContent={"left"}>
                    <Avatar name='Kola Tioluwani' src='https://bit.ly/kent-c-dodds' size={"sm"}/>
                    <Box as='span' color='black' fontSize='sm' ml={1}>
                        Brandon Cock
                    </Box>
                </Box>
                <Box alignContent={"left"}>
                    <Avatar name='Kola Tioluwani' src='https://bit.ly/ryan-florence' size={"sm"}/>
                    <Box as='span' color='black' fontSize='sm' ml={1}>
                        Mike Hawk
                    </Box>
                </Box>
            </VStack>
          
          
        </Box>
      </Box>
    )
}

export default ProfileCard;
