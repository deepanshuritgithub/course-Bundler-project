import { Avatar, Button, Container, Heading, HStack, Stack, VStack, Text, Input, Image,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay,useDisclosure ,ModalFooter, ModalHeader } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadcss } from '../Auth/Register'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';


function Profile({ user }) {

    // const user = {
    //     name: "Deepanshu Kukreja",
    //     email: "Kukrejagolu8@gmail.com",
    //     createdAt: String(new Date().toISOString()),
    //     role:'user',
    //     subscription: {
    //         status: "active",
    //     },
    //     //user ke andar playlist hone wali hai backed se hmme milegaa , hmme man liya array hai, array of objects jisme ki hogaa course , or id likhi hogi kuch , course ki, or hogaa ek poster jisme poster ka url hogaa 
    //     playlist: [
    //         //bas ek hi hai item playlist ke array mai
    //         {
    //             course: "sadasd", //course ki id or poster ka url 
    //             poster: "https://cdn.pixabay.com/photo/2024/02/23/08/31/father-8591551_1280.png"
    //         }
    //     ]
    // };



    const removeFromPlaylistHandler = async(id) => {
        // console.log(id);
        await dispatch(removeFromPlaylist(id));
        dispatch(loadUser());
    }

    const dispatch = useDispatch();
    const {loading, message, error} = useSelector(state=> state.profile);
    const {loading:subscriptionLoading, message:subscriptionMessage, error:subscriptionError} = useSelector(state=> state.subscription);

    useEffect(()=>{
        
        if(error){
            toast.error(error);
            dispatch({type: 'clearError'});
        }
        if(message){
            toast.success(message);
            dispatch({type: 'clearMessage'}); 
        }
        if(subscriptionError){
            toast.error(subscriptionError);
            dispatch({type: 'clearError'});
        }
        if(subscriptionMessage){
            toast.success(subscriptionMessage);
            dispatch({type: 'clearMessage'}); 
            dispatch(loadUser()); 
        }
        
    },[dispatch, error , message , subscriptionError, subscriptionMessage]);


  const changeImageSubmitHandler = async(e, image) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("file", image); 

    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
}


    const {isOpen, onClose, onOpen} = useDisclosure();

    const cancelSubscriptionHandler = () => {
        dispatch(cancelSubscription())
    }


  return (
    <Container minH={"98vh"} maxW="container.lg" py={"8"} >
        <Heading children="Profile" m={"8"} textTransform={"uppercase"} />

        <Stack
            justifyContent={"flex-start"} 
            direction={["column", "row"]}
            alignItems={"center"}
            spacing={["8", "16"]}
            padding={"8"} 
        >
            
            <VStack>

                <Avatar boxSize={"48"}  src={user.avatar.url} />
                
                <Button
                onClick={onOpen} 
                colorScheme='yellow'
                variant={"ghost"}
                >Change Photo</Button>
            </VStack>

            <VStack 
            spacing={"4"}
            alignItems={["center","flex-start"]}
            >
                
                    <HStack>
                        <Text children="Name" fontWeight={"bold"} />
                        <Text children={user.name} />
                    </HStack>

                    <HStack>
                        <Text children="Email" fontWeight={"bold"} />
                        <Text children={user.email} />
                    </HStack>

                    <HStack>
                        <Text children="CreatedAt" fontWeight={"bold"} />
                        <Text children={user.createdAt.split("T")[0]} />
                    </HStack>
                    

                {/* /so false hai to dikhega hi nahi kuch to mai esko normal user bna deta hu admin se  */}
                {
                    user.role !== "admin" && (

                        <HStack>

                            <Text children="Subscription" fontWeight={"bold"} />

                            {user.subscription && 
                                user.subscription.status === "active" ? ( //so now it is undefined so it will not shown

                                    <Button
                                        isLoading={subscriptionLoading}
                                        onClick={cancelSubscriptionHandler} 
                                        color={"yellow.500"}
                                        variant={"unstyled"}
                                        
                                    >
                                        Cancel Subscription
                                    </Button>

                                ) : ( 
                                    <Link to="/subscribe">
                                        <Button
                                        colorScheme='yellow'>
                                            Subscribe
                                        </Button>
                                    </Link>

                                )
                            }
                            </HStack>
                    )
                }



                    <Stack
                        direction={["column", "row"]}
                        alignItems={"center"}
                    >    
                    
                        <Link to="/updateprofile">
                            <Button>
                                Update Profile
                            </Button>
                        </Link>

                        <Link to="/changepassword">
                            <Button>
                                Change Password
                            </Button>
                        </Link>
                        
                    </Stack>

            </VStack>
        </Stack>

        
        <Heading children="Playlist" size={"md"} my={"8"} /> 
                {/* //remember jo courses add to playlist hai vo yha dikhenge hamare  */}

            
        {
            user.playlist.length > 0 && (
                <Stack
                    direction={["column", "row"]}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                    p={"4"}
                >

                    {
                        user.playlist.map((item)  =>(
                            <VStack
                            w={"48"}
                            m={"2"}
                            key={item.course} //course mai id hone wali jo ki unique hogii hmeshaa 
                            >
                                <Image
                                boxSize="full"
                                objectFit ="contain"
                                src={item.poster}
                                />

                                <HStack>

                                    <Link to={"/course/${item.course}"}>
                                        <Button
                                        variant={"ghost"}
                                        colorScheme="yellow"
                                        >
                                            Watch Now
                                        </Button>
                                    </Link>

                                    <Button 
                                            //hm direct nahi likhenge removeFromPlaylistHandler kyuki hmme id pass krne hai eske andar vo to tabhi possile hai jab hm kya kre jab hmm uss callback bna de , kyuki onClick ko kya chahiye ek function chiyee , or ye kya kr rha hai removeFromPlaylistHandler ye return de rha hai  , pr ab ese likhne se kya hua ki ye return function de rha hai callback ko , or onClick ko to chiye kya function chiye , vo usse mil gya hai  
                                    isLoading={loading}
                                    onClick={() => removeFromPlaylistHandler(item.course)}
                                    >
                                        <RiDeleteBin7Fill />
                                    </Button>

                                </HStack>
                            </VStack>
                        ))
                    }

                </Stack>
            )
        }


                <ChangePhotoBox 
                changeImageSubmitHandler={changeImageSubmitHandler}
                isOpen={isOpen}
                onClose={onClose}
                loading={loading}
                />

    </Container>
)
}

export default Profile


//functional component bna rha hu , kyuki functional compnent mai niche declare kr do , or upar define kr do chalta haii , koi issue nahi hai , pr mai new file bna ke import krungaa



function ChangePhotoBox({isOpen , onClose , changeImageSubmitHandler, loading}) {

    const [imagePrev , setImagePrev] = useState("");
    const [image , setImage] = useState("");
    
  const changeImage = (e) =>{
    const file = e.target.files[0];  //so ek file lene ke liyee , vo bhi first file ,ek file hogi esme vaise bhii 
    //so ab reader bnayenge 
    const reader = new FileReader();

    reader.readAsDataURL(file);  //so data url krenge to data uri mil jayegi simply 
    reader.onloadend = (e) => {   //so ab krenge reader.onloadend jaise hi load ho jaye purii tab kya kro tab ek function 
      setImagePrev(reader.result);  //so image preview par set krna hai

      //so ye data uri ke file hogyi , jo ki hmme backend mai ne bhjni , hmme normally blob bhjna hai file ka as form , so ye to preview ke liye hogya kaam , so ab alag se ek or state bnayenge image wala , so jab form bnake bhjenge usme image bhjenge na ki image preview  backend pe
     //es upar wala mai hmmne file ka uri diya read krke 
        //or jo image hai niche wala usme hmne direct file hi de hai 
      setImage(file);  //so image state par set krna hai
    }
  }

  const closeHandler = () =>{
    onClose();
    setImagePrev("");
    setImage("");
}


  return (
    <Modal isOpen={isOpen} onClose={closeHandler} >  
                            {/* //so jab user modal ke bhar click kre tab bhi band ho jana chiyee or uski jo state hai or jo image upload ki hui hai delete ho jaye khud ba khud   */}


        <ModalOverlay backdropFilter={"blur(10px)"} />     

            <ModalHeader>Change Photo </ModalHeader>
            <ModalContent>
                <ModalCloseButton />    
                
                <ModalBody>     
                
                
                            <Container >            

                                <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
                                    <VStack spacing={"8"}>
                                        {
                                            imagePrev &&  <Avatar src={imagePrev} boxSize={"48"} />
                                        }
                                        
                                        <Input
                                        type={"file"} 
                                        css={{"&::file-selector-button":fileUploadcss}} 
                                        onChange={changeImage}
                                        />

                                            <Button
                                                isLoading={loading}
                                                w={"full"}
                                                colorScheme={'yellow'}
                                                type='submit'
                                            >
                                                Change
                                            </Button>


                                    </VStack>
                                </form>

                            </Container>


                </ModalBody>


                    <ModalFooter>
                        <Button 
                        mr={"3"}
                        onClick={closeHandler}
        
                        >
                            Cancel
                        </Button>
                    </ModalFooter>


            </ModalContent>
    </Modal>
)
}
