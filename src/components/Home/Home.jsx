  import React from 'react'
  import {
        Stack,
        VStack,
        Heading, 
        Button, 
        Text, 
        Image, 
        Box, 
        HStack

        } from '@chakra-ui/react'
  import "./home.css";
  import { Link } from 'react-router-dom';
  import vg from "../../../public/assets/images/bg.jpg";
  import { CgGoogle , CgYoutube } from "react-icons/cg"
  import { SiCoursera , SiUdemy } from "react-icons/si"
  import { DiAws } from "react-icons/di"
  import introVideo from "../../../public/assets/videos/video.mp4"


  function Home() {
    return <section className='Home' style={{ width: '100vw', maxWidth: '100%' }} >

    <div className="container">


                {/* //yha pe hm bhut sari properties de sakte hai default  */}
                {/* stack basically ye mann lo ki ye ek div hai jiski display ho rkhi hai flex  */}
          <Stack

          //ab eski direction hm set kr sakte hai ki row chahiye ya column , otherwise array mai pass krengee["col", "row"], eska mtlab hai phone hoga to col ho jayegii , otherwise row rahegii 
          direction={["column", "row"]}
          height="100%"
        
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={['16', '56']}
          //spacing ye jo property hai , mann lo eske beech mai, mai 2 div bnata hu , un dono ke beech mai kitna margin add krna hai 
          > 

          
              {/* vertical stack , eski by default direction col hai , col hi rahegi change nahi kr sakte  */}
          <VStack width={"full"} alignItems={['center', 'flex-end']} spacing="8">

            <Heading textAlign={["center","left"]} children ="LEARN FROM THE EXPERTS" size={"2xl"} />
            <Text textAlign={["center","left"]} fontSize={"xl"}
            fontFamily={"cursive"}
            children="Find Valuable Content At Reasonable Price" />
            <Link to="/courses">

                <Button size={"lg"} colorScheme='yellow'>
                  Explore Now
                </Button>

            </Link>
          </VStack>


              <Image
              className='vector-graphics'
              box-size={"md"}
              src={vg}
              border="0.3px"
              borderRadius="full" 
              objectFit="contain" 

              />
        
          </Stack>

    </div>



        <Box padding={"8"} bg="blackAlpha.800">

            <Heading
            textAlign={"center"}
            fontFamily="body"
            children="OUR BRANDS" 
            color={"yellow.400"} 
            />

            <HStack className='brands-banner' justifyContent={"space-evenly"} marginTop="4">
                <CgGoogle />
                <CgYoutube />
                <SiCoursera />
                <SiUdemy />
                <DiAws />
            </HStack>

        </Box>



        <div className="container2">

          <video
          // autoPlay
          controls
          src={introVideo}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          >

          </video>  

        </div>

    </section>
  }

  export default Home  