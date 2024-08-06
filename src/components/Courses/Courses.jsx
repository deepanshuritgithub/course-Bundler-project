import React , {useState, useEffect} from 'react'
import { Container, HStack, Heading, Input, Button, Text, Stack, VStack, Image  } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const CourseCard =({views, title , imageSrc , id , addToPlaylistHandler,creator , description , lectureCount, loading }) => {
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
              isLoading={loading}
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


function Courses() {
  const [keyword , setKeyword] = useState("");
  const [category , setCategory] = useState("");
  const dispatch = useDispatch();

  const addToPlaylistHandler = async(courseId) => {
    // console.log("Added to playlist", courseId);
    await dispatch(addToPlaylist(courseId))
    dispatch(loadUser());

  };

  const {loading , message, error, courses} = useSelector(state => state.course)

  const categories = [
    "Web development",
    "Artificial Intelligence", 
    "Data Structures & Algorithms", 
    "App Development",
    "Data Science", 
    "Game Development",
  ]


  useEffect(()=>{
    dispatch(getAllCourses(category, keyword))

    if(error) {
      toast.error(error);
      dispatch({type: "clearError"})
    }
    if(message) {
      toast.success(error);
      dispatch({type: "clearMessage"})
    }


  },[category, keyword, dispatch,error ])

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
              isLoading={loading}
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
              {/* <CourseCard 
                title={"Sample"}
                description={"Sample"}
                views={23}
                imageSrc={"https://cdn.pixabay.com/photo/2024/02/23/08/31/father-8591551_1280.png"}
                id={"sample"}
                creator={"Sample boy"}
                lectureCount = {2}
                addToPlaylistHandler={addToPlaylistHandler}
              /> */} 
              {/* esko cut krna hai  */}
        {/* so abhi to ye ek hai as it is hmne rakh diya thaa but jab hmare pass course ki puri array hogii saaare courses , tab hm uspe map kr dengee bhut easily  */}
            
                
                {
                    courses.length > 0? courses.map((item) => (
                      <CourseCard 
                      key={item._id} 
                      title={item.title} 
                      description={item.description}
                      views={item.views}
                      imageSrc={item.poster.url}
                      id={item._id}
                      creator={item.createdBy}
                      lectureCount = {item.numOfVideos}
                      addToPlaylistHandler={addToPlaylistHandler}
                      loading={loading}
                    /> 
                    )):(<Heading opacity={0.6} mt="4 " children="Courses Not Found" />) 
                }



        </Stack>  

  </Container>
  )
}

export default Courses