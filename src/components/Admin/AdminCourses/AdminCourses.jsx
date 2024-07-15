import React from "react";
import { Grid, Box, TableContainer,Table, TableCaption, Heading, Thead , Tr, Th,Td, Tbody, HStack,Button , Image, useDisclosure} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModal from "./CourseModal";

function AdminCourses() {


  const courses =[
    //1st user , which index is 0 and the item 1 
    {
    _id:"acasgvfsgssaqaaejiji",
    poster:{
      url:"https://cdn.pixabay.com/photo/2024/02/23/08/31/father-8591551_1280.png",
    },
    title:"React Course",
    category:"web-development",
    createdBy:"Deepanshu Kukreja",
    subscription:{
      status: "active",
    },
    views: 123,
    numOfVideos:12,
  },

]



const {isOpen, onOpen , onClose} = useDisclosure();

const courseDetailsHandler = (userId) =>{
  console.log(userId);
  onOpen();
}

const deleteButtonHandler = (userId) =>{
  console.log(userId);
}


const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
}


const addLectureHandler = (e, courseId , title, description, video) =>{
    e.preventDefault();
}

  return (
    <Grid
      css={{
        //jo bhi mai cursor dunga basically vo otherwise default
        cursor: `url(${cursor}), default`, //ye krne se kya hoga ki pure grid ka ek new cusror hogaa
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >

          <Box
            p={["0", "8"]}
            overflowX={"auto"}
          >
                <Heading
                  textTransform={"uppercase"}
                  children="All Users"
                  my={"16"}
                  textAlign={["center", "left"]}
                />


                <TableContainer
                w={['100vw','full']}
                
                >

                    <Table
                    variant={"simple"}
                    size={"lg"}
                    > 
                        <TableCaption>All available courses in the database </TableCaption>


                        {/* Thead is just a tag , it is just only define as a header, footer , or we can say as a semantics tags  */}
                        <Thead> 
                            <Tr >
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>           
                                <Th>Subscription</Th>
                                <Th isNumeric>Views</Th> 
                                <Th isNumeric>Lectures</Th> 
                                <Th isNumeric>Action</Th> 
                                {/* // esme hm denge isNumeric ye ab isko ese treat krega jaise esme number ho , number jab hota hai kya hota hai table mai , excel mai kya hota hai vo unka text channel right ho jata hai automatically , unka text channel right ho jata hai automatically  */}

                            </Tr>
                        </Thead>


                        <Tbody>
                          {/* //es tbody mai user jitne bhi honge unpe map krengee, obvious se baat hai abhi to nahi hai user temporary bannyenege user   */}

                      {/* <Row /> */}
                        {
                        courses.map((item) => (
                          <Row 
                          courseDetailsHandler={courseDetailsHandler}
                          deleteButtonHandler={deleteButtonHandler}
                          key={item._id} item={item} />
                        ))
                        }

                        </Tbody>

                

                    </Table>

                </TableContainer>

                <CourseModal isOpen={isOpen}
                onClose={onClose} 
                id={"mkeeijdowldowkaowo"}
                courseTitle="React Course"
                deleteButtonHandler={deleteLectureButtonHandler} 
                addLectureHandler={addLectureHandler} 
                
                />

          </Box>

      <Sidebar />
    </Grid>
  );
}



function Row({item, courseDetailsHandler, deleteButtonHandler}) {  //ye yha pe destucture ho ke araa hai , jhaa pe bhi use kra hoaga es component ko vha pe as a prope pass ho rha hai 
  return (
    <Tr>
          <Td>#{item._id}</Td>
          <Td>
              <Image src={item.poster.url} />

          </Td>
          <Td>{item.title}</Td>
          <Td textTransform={"uppercase"}>{item.category}</Td>
          <Td>{item.createdBy}</Td>
          <Td isNumeric>{item.views}</Td>


          <Td isNumeric>{item.numOfVideos}</Td> 
          {/* yha pe lecture mai numOfVideos, backend mai bnayenge numOfVideos jisme ki pta lagega ki kitni videos hai  */}
          <Td>
            {item.subscription.status === 'active'? "Active" : "Not Active"}
          </Td>

         
          

          <Td isNumeric>
                <HStack justifyContent={'flex-end'}>

                    <Button 
                    variant={'outline'} 
                    onClick={() => courseDetailsHandler(item._id)}
                    color={"purple.500"}
              
                    >
                        View Lectures
                    </Button>


                          {/* //delete btn  */}
                    <Button 
                    onClick={() => deleteButtonHandler(item._id)}
                    color={"purple.600"}
                    >
                      <RiDeleteBin7Fill />
                    </Button>

                </HStack>

          </Td>
      
    </Tr>
  )
}

export default AdminCourses