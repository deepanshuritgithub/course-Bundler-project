import React , {useState} from 'react'
import { Container, HStack, Heading, Input, Button, Text, Stack, VStack, Image  } from '@chakra-ui/react'
import { Link } from 'react-router-dom';


const CourseCard =({views, title , imageSrc , id , addToPlaylistHandler,creator , description , lectureCount }) => {
  return (
    <VStack className='course' alignItems={["center", "flex-start "]}>
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
      <Heading 
      textAlign={["center","left"]} 
      maxW="200px" 
      fontFamily={"sans-serif"} 
      noOfLines={3} //no of lines mtlb 3 se jyada line hogi to vha pe ... likha aa jayegaa 
      children={title} 
      size={"sm"} 
      />

      <Text children={description} noOfLines={3} />
      
      <HStack>
          <Text 
          children={"Creator"} 
          fontWeight={"bold"} 
          textTransform="uppercase"
          />
          <Text 
          children={creator} 
          fontFamily={"body"} 
          textTransform="uppercase"
          />
      </HStack>

      <Heading 
      textAlign={"center"} 
      size="xs" 
      children={`Lectures - ${lectureCount}`} 
      textTransform="uppercase"
      />
      
      <Heading 
      size="xs" 
      children={`Views - ${views}`} 
      textTransform="uppercase"
      />

      <Stack
      direction={["column", "row"]}
      alignItems={"center"} 
      >
          <Link to={`/course/${id}`}>
              <Button colorScheme={"yellow"}>Watch Now</Button>
          </Link>

              <Button 
              variant={"ghost"} 
              colorScheme={"yellow"}
              onClick={() => addToPlaylistHandler(id)} //yha pe id pass krne padegii, id es liya pass ki kyuki pta chla id nahi de to kisi or ke playlist mai jake aadd ho gyaa , so that we have to aware about that 
              >
                Add to Playlist
              </Button>
      </Stack>
    </VStack>
  )
}


function courses() {
  const [keyword , setKeyword] = useState("");
  const [category , setCategory] = useState("");

  const addToPlaylistHandler = () => {
    console.log("Added to playlist");

  };


  const categories = [
    "Web development","Artificial Intelligence", "Data Structures & Algorithms", "App Development","Data Science", "Game Development",
  ]

  return (
  <Container minH={"98.2vh"} maxW={"container.lg"} paddingY={"8"}   >
    
        <Heading children="All Courses" m={"8"}  />
      
        <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={"text"}
        focusBorderColor='yellow.500'
        // width={{base: "40%", sm: "90%"}}//doubt here 
        flexWrap={"wrap"}

        /> 


        <HStack 
        overflowX={"auto"} 
        paddingY="8" 
        flexWrap={"nowrap"}  
        width={{base: "%", sm: "100%"}}  
        marginBottom={"70px"}
        //to remove the scroll bar 
        css={{"&::-webkit-scrollbar" : {
          display: "none",
        }}}
        // css eski khud ki property hai eski help se hm kya kr sakte hai jo pseudo selector ya sudo element hai ya pseudo classes , vo bhi use kr sakte hai, on the spot yahi pe , kese likhenge & mtlb khud element yahi and simply
        >

          {
            categories.map((item, index) => (

              <Button
              key={index}
              onClick={() => setCategory(item)}
              minW={"60"}
              >
                <Text children={item} /> 

              </Button>

            ))
          }
        </HStack>



        {/* yha pe hmme cousrse dikhana hai saare  */}
        <Stack
        //stack mai directly hm direction de sakte hai 
        direction={["column", "row"]} //phone ho to col else row
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]} //flex start se mera mtlb hai phone mai , phone mai direction hogi column 
        alignItems={["center", "flex-start"]}
        >
              <CourseCard 
                title={"Sample"}
                description={"Sample"}
                views={23}
                imageSrc={"https://cdn.pixabay.com/photo/2024/02/23/08/31/father-8591551_1280.png"}
                id={"sample"}
                creator={"Sample boy"}
                lectureCount = {2}
                addToPlaylistHandler={addToPlaylistHandler}
              />
        {/* so abhi to ye ek hai as it is hmne rakh diya thaa but jab hmare pass course ki puri array hogii saaare courses , tab hm uspe map kr dengee bhut easily  */}

        </Stack>  

  </Container>
  )
}

export default courses