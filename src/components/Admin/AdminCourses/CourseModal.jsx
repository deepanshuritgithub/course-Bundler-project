import {
    Modal,
    ModalBody,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Grid,
    Box,
    Heading,
    Stack,
    Button,
    Text,
    VStack,
    Input,
    ModalFooter
} from "@chakra-ui/react";

import React,{useState} from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadcss } from "../../Auth/Register";

function CourseModal({ isOpen, onClose, id, deleteButtonHandler ,courseTitle, lectures=[], addLectureHandler, loading }) {

    const [title, setTitle ] = useState("");
    const [description, setDescription ] = useState("");
    const [video, setVideo ] = useState("");
    const [videoPrev, setVideoPrev] = useState("");
    
    
    const changeVideoHandler = (e) =>{
        const file = e.target.files[0]; 
    
        const reader = new FileReader();
    
        reader.readAsDataURL(file); 
        reader.onloadend = () => {    
            setVideoPrev(reader.result);   //so yha pe setVideoPrev mai base 64 string 
            setVideo(file);             //yha pe normal blob file ka 
        }
        };

    const handleClose = () => {
        onClose();
        setTitle("");
        setDescription("");
        setVideoPrev("");
        setVideo(""); 
    }
        

    return (
    <Modal 
    isOpen={isOpen} 
    onClose={handleClose}  
    size={"full"}
    scrollBehavior="outside"
        //agr mai scroll behaviour eska inside krta hu to kya hoga ki vo header or footer ko same rkhegaa baaki ka content andar ka change hota rhegaa 

    >
        <ModalOverlay />

        <ModalContent>

        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalCloseButton />

        <ModalBody p={"16"}>


            <Grid templateColumns={["1fr", "3fr 1fr"]}>
                    <Box px={["0", "16"]}>
                                <Box my={"5"}>
                                    <Heading children={courseTitle} />
                                    <Heading children={`#${id}`} size="sm" opacity={0.4} />
                                </Box>

                                <Heading children={"Lectures"} size="lg" />


                                    {
                                        lectures.map((item, index) => (

                                            <VideoCard 
                                            key={index}
                                            title={item.title}
                                            description={item.description}
                                            num={index + 1} //num matlab index + 1, so jaise map krenge 0 index hmme 1 show krna hai , so jo bhi index hogi usme 1 plus krengee , so ye 1 st element hi hai es liye 1 likh rha hai , but actual mai index + 1 krengee ....
                                            lectureId={item._id}
                                            courseId={id}
                                            deleteButtonHandler={deleteButtonHandler}
                                            loading={loading}
                                            />
                                            
                                        )
                                    )
                                    }


                    </Box>

                    <Box>
                        <form onSubmit={e =>addLectureHandler(e, id, title, description, video )}>
                            <VStack spacing={"4"}>

                                <Heading children="Add Lectures" size={"md"} textTransform={"uppercase"} />
                                
                                <Input focusBorderColor="purple.300" placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                /> 

                                <Input focusBorderColor="purple.300" 
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                /> 

                                <Input
                                accept="video/*"
                                required
                                type={"file"}
                                focusBorderColor="purple.300"
                                css={{
                                "&::file-selector-button":{
                                    ...fileUploadcss,
                                    color:"purple",
                                }
                                }}
                                onChange={changeVideoHandler}
                                />

                                {
                                videoPrev && (
                                    <video 
                                    controlsList="nodownload"
                                    controls
                                    src={videoPrev}
                                    >
                                        
                                    </video>
                                )
                                }

                                <Button 
                                isLoading={loading}
                                w={"full"}
                                colorScheme={"purple"}
                                type="submit"
                                >
                                    Upload lectures 
                                </Button>       

                            </VStack>   

                        </form>

                    </Box>

            </Grid>

        </ModalBody>
        
        <ModalFooter>
            <Button isLoading={loading} onClick={handleClose}>Close</Button>
        </ModalFooter>

        </ModalContent>
    </Modal>
);
}

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading
}) {
    return (
    <Stack
        direction={["column", "row"]}
        my={"8"}
        borderRadius={"lg"}
        boxShadow={"0 0 10px rgba(107, 70 ,193, 0.5)"}
        justifyContent={["flex-start", "space-between"]}
        p={["4", "8"]}
        >
        <Box>
            <Heading size={"sm"} children={`#${num} ${title} `} />
            <Text children={description} />
        </Box>

        <Button
            isLoading={loading}
            color={"purple.600"}
            onClick={() => deleteButtonHandler(courseId, lectureId)}
        >
            <RiDeleteBin7Fill />
        </Button>
    </Stack>
    );
}
