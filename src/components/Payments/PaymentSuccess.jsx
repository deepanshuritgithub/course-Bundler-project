import { Container, Heading, VStack, Box , Text, Button} from "@chakra-ui/react";
import React from "react";
import {RiCheckboxCircleFill} from 'react-icons/ri';
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <Container h={"90vh"} p={"16"}>
        <Heading my={"8"} textAlign={"center"}>
            You have Pro Pack
        </Heading>

        <VStack
            boxShadow={"lg"}
            pb={"16"}
            alignItems={"center"}
            borderRadius={"lg"}
        >

            <Box w={"full"} bgColor={"yellow.400"} p={"4"} css={{borderRadius: "8px 8px 0 0"}}>
                <Text color={"black"} >Payment Success</Text>
            </Box>
            
            <Box p={"4"}>
                <VStack textAlign={"center"} px={"8"} mt={"4"} spacing={"8"}>
                    <Text>
                        Congratulations you are a pro member. You have access to premium content.
                    </Text>
                    <Heading size={"4xl"}> 
                        <RiCheckboxCircleFill />
                    </Heading>
                </VStack>
            </Box>


            <Link to="/profile">
                <Button 
                variant={"ghost"}
                >
                    Go to Profile
                </Button>
            </Link>

            <Heading size={"xs"} >
                {/* so ye refernce number hogaa jo payment ke baad milega or ye backend se milegaa or ye  */}
                Reference : sdaadfjjfkldlla,
            </Heading>
        </VStack>
    </Container>
    );
}

export default PaymentSuccess;
