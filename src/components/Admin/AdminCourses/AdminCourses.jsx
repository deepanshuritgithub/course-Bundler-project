import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Heading,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  HStack,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import cursor from "../../../../public/assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModal from "./CourseModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, getCourseLectures } from "../../../redux/actions/course";
import { addLecture, deleteCourse , deleteLecture } from "../../../redux/actions/admin";
import toast from "react-hot-toast";

function AdminCourses() {

  const[courseId, setCourseId] = useState(""); 
  const[courseTitle, setCourseTitle] = useState(""); 

  //   const courses = [

  //     //1st user , which index is 0 and the item 1
  //     {
  //     _id:"acasgvfsgssaqaaejiji",
  //     poster:{
  //       url:"https://cdn.pixabay.com/photo/2024/02/23/08/31/father-8591551_1280.png",
  //     },
  //     title:"React Course",
  //     category:"web-development",
  //     createdBy:"Deepanshu Kukreja",
  //     subscription:{
  //       status: "active",
  //     },
  //     views: 123,
  //     numOfVideos:12,
  //   },

  // ]

  const dispatch = useDispatch();
  const { courses, lectures} = useSelector((state) => state.course);
  const { loading ,error , message} = useSelector((state) => state.admin);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch({type:'clearError'}); //state mai se clear kr dega vo error ko if any error occurs 
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'});//state mai se clear kr dega vo message ko if any message occurs
    }
    
    dispatch(getAllCourses());  // Fetch courses when the component mounts
    
  }, [dispatch, error , message]);

  
                        //ye bs naam hai es se kuch fraq nahi padegaa m but sake to make it more readable 
  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId))  
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  

  const deleteButtonHandler = (courseId) => {
    console.log("Deleting course with ID:", courseId);
    dispatch(deleteCourse(courseId));
  };
  
  
  const deleteLectureButtonHandler = async(courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  
  const addLectureHandler = async(e, courseId, title, description, video) => {
    e.preventDefault();

    const myForm = new FormData(); //object bnaya hmme or usme sab chiz dalke bhj diye hai

    // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values, which can include files.
    // It is useful for sending form data, including files, via HTTP requests.

    myForm.append("title", title); 
    myForm.append("description", description);
    myForm.append("file", video);  //image ka variable bhj rha hai pr file ke naam se bhjna hai , because we are expecting a file in the multer ,that's why we have to give a same name here
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };


  return (
    <Grid
      css={{
        //jo bhi mai cursor dunga basically vo otherwise default
        cursor: `url(${cursor}), default`, //ye krne se kya hoga ki pure grid ka ek new cusror hogaa
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box p={["0", "8"]} overflowX={"auto"}>
        <Heading
          textTransform={"uppercase"}
          children="All Users"
          my={"16"}
          textAlign={["center", "left"]}
        />

        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All available courses in the database </TableCaption>

            {/* Thead is just a tag , it is just only define as a header, footer , or we can say as a semantics tags  */}
            <Thead>
              <Tr>
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
              {courses.length === 0 ? (
                <Tr>
                  <Td colSpan={9}>
                    <p>No courses available.</p>
                  </Td>
                </Tr>
              ) : (
                courses.map((item) => (
                  <Row
                    loading={loading}
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                  />
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle} 
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
}

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  //ye yha pe destucture ho ke araa hai , jhaa pe bhi use kra hoaga es component ko vha pe as a prope pass ho rha hai
  if (!item) return null; // Handle cases where item might be undefined
  return (
    <Tr>
      {/* //handle line wise , otherwise you will get an error  */}
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster?.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      {/* yha pe lecture mai numOfVideos, backend mai bnayenge numOfVideos jisme ki pta lagega ki kitni videos hai  */}
      <Td>{item.subscription?.status === "active"? "Active" : "Not Active"}</Td>
      <Td isNumeric>{item.views}</Td> 
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            isLoading={loading}
            variant={"outline"}
            onClick={() => courseDetailsHandler(item._id, item.title)}
            color={"purple.500"}
          >
            View Lectures
          </Button>
          
          <Button
          isLoading={loading}
          onClick={() => {
            console.log("Delete button clicked for course ID:", item._id);
            deleteButtonHandler(item._id);
          }}
          color={"purple.600"}
        >
          <RiDeleteBin7Fill />
        </Button>

        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
