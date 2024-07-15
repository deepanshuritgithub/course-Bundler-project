import { Avatar, Container, Heading, Stack ,VStack ,Text, Button, Box, HStack, Tab} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import introVideo from "../../assets/videos/video.mp4";
import {RiSecurePaymentFill} from "react-icons/ri";
import termsAndCondition from "../../assets/docs/termsAndCondition"

const Founder = () => (
  <Stack direction={["column", "row"]} spacing={["4", "16"]} p={"8"}>

    <VStack>
      <Avatar src="https://cdn.pixabay.com/photo/2024/04/19/04/39/kingfisher-8705377_1280.jpg" boxSize={["40", "48"]} />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>


    <VStack 
    justifyContent={"center"}
    alignItems={["center", "flex-start"]}   
    >
      <Heading 
      children='Deepanshu Kukreja' 
      size={["md", "xl"]} 
      /> 
      
      <Text
      textAlign={["center","left"] }
      children={`Hi, I am a full-stack developer.
      Our mission is to provide quality content at reasonable price.`}
      /> 
    </VStack>
  </Stack>
);

const VideoPlayer = () =>(
  <Box>
      <video
          autoPlay
          muted 
          loop
          controls
          src={introVideo}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          width={"100%"}
          >

      </video>  
  </Box>
)


const TandC =({termsAndCondition}) => (
  <Box>
      <Heading size={"md"} children="Terms & Conditions" textAlign={["center","left"]} my="4" />

      <Box h="sm" p="4" overflow={"scroll"}>

          <Text 
          fontFamily={"heading"}
          letterSpacing={"widest"} 
          textAlign={["center","left"]}
          >
            {termsAndCondition}
          </Text>

          <Heading my="4" size={"xs"} children="Refund Only applicable for cancellation within 7 days. " />
      </Box>
  </Box>
)


function About() {
  return (
    <Container
      maxW={'container.lg'} 
      padding={"16"} 
   
      boxShadow={"lg"}
    >

          <Heading children="About Us" textAlign={["center", "left"]} />

          <Founder />

          <Stack m={"8"} direction={["column", "row"]} alignItems={"center"}>
          {/* remember VStack mai hota hai alignItems by default center na ki stack mai  */}
                  <Text fontFamily={"cursive"} m="8" textAlign={["center","left"]}>
                      we are a video streaming platform with some premium courses available only for premium users.
                  </Text>
                  
                  <Link to="/subscribe">
                    <Button variant={"ghost"} colorScheme="yellow" >
                      Checkout Our Plan
                    </Button>
                  </Link>
              

          </Stack>

          <VideoPlayer />

          <TandC termsAndCondition = {termsAndCondition} />

          <HStack my="4" p={"4"} >
            <RiSecurePaymentFill /> 
            <Heading 
            size={"xs"}
            fontFamily= "sans-serif" 
            textTransform={"uppercase"} 
            children={"Payment is secured by Razorpay "} 
            />

          </HStack>

    </Container>
  );
}

export default About;














   {/* remember VStack mai hota hai alignItems by default center na ki stack mai  */}