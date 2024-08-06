import { Container, Heading, VStack, Input, Button, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import React, { useEffect } from 'react';
import { changePassword } from "../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOff, IoEye } from "react-icons/io5";
import toast from "react-hot-toast";

function ChangePassword() {
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [oldPasswordTouched, setOldPasswordTouched] = React.useState(false);
    const [newPasswordTouched, setNewPasswordTouched] = React.useState(false);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
    };


    const {loading , message , error} = useSelector(state=> state.profile);
    useEffect(()=>{
        
        if(error){
            toast.error(error);
            dispatch({type: 'clearError'});
        }
        if(message){
            toast.success(message);
            dispatch({type: 'clearMessage'}); 
        }
        
    },[dispatch, error , message]);

    return (
        <Container py={"16"} minH={"95vh"}>
            <form onSubmit={submitHandler}>
                <Heading 
                    textTransform={"uppercase"}
                    children="Change Password"
                    my={"16"} 
                    textAlign={["center", "left"]}
                />

                <VStack spacing={"8"}>
                    <InputGroup>
                        <Input 
                            required
                            value={oldPassword} 
                            onChange={e => setOldPassword(e.target.value)} 
                            placeholder="Old Password"
                            type={showOldPassword ? "text" : "password"} 
                            focusBorderColor="yellow.500"
                            onFocus={() => setOldPasswordTouched(true)}
                            onBlur={() => oldPassword === "" && setOldPasswordTouched(false)}
                        />
                        {oldPasswordTouched && (
                            <InputRightElement width="4.5rem">
                                <IconButton
                                    aria-label={showOldPassword ? "Hide password" : "Show password"}
                                    icon={showOldPassword ? <IoEye /> : <IoEyeOff />}
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    variant="ghost"
                                    size="sm"
                                />
                            </InputRightElement>
                        )}
                    </InputGroup>
                    
                    <InputGroup>
                        <Input 
                            required
                            value={newPassword} 
                            onChange={e => setNewPassword(e.target.value)} 
                            placeholder="New Password"
                            type={showNewPassword ? "text" : "password"} 
                            focusBorderColor="yellow.500"
                            onFocus={() => setNewPasswordTouched(true)}
                            onBlur={() => newPassword === "" && setNewPasswordTouched(false)}
                        />
                        {newPasswordTouched && (
                            <InputRightElement width="4.5rem">
                                <IconButton
                                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                                    icon={showNewPassword ? <IoEye /> : <IoEyeOff />}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    variant="ghost"
                                    size="sm"
                                />
                            </InputRightElement>
                        )}
                    </InputGroup>

                    <Button
                        isLoading={loading}  //button pe dhyan se dekhoge to loading ho gya vha pe circle aa gyaa , and message bhi aa gya Incorrect Old password 
                        w={"full"}
                        colorScheme="yellow"
                        type="submit" 
                    >
                        Change
                    </Button>
                </VStack>
            </form>
        </Container>
    );
}

export default ChangePassword;




//to enable eye view button in an input form that's why we have to change 
// import {Container, Heading, VStack, Input, Button } from "@chakra-ui/react"
// import React from 'react'
// import { changePassword } from "../../redux/actions/profile";
// import { useDispatch } from "react-redux";
    
//     function ChangePassword() {

//         const [oldPassword, setOldPassword] = React.useState("")
//         const [newPassword, setNewPassword] = React.useState("")

//         const dispatch = useDispatch();

//     const submitHandler =(e) => {
//         e.preventDefualt();
//         dispatch(changePassword(oldPassword, newPassword));
//     }
        
//       return (
//         <Container
//         py={"16"}
//         minH={"90vh"}
//         >
//             <form onSubmit={submitHandler} >
//                 <Heading 
//                 textTransform={"uppercase"}
//                 children="Change Password"
//                 my={"16 "} 
//                 textAlign={["center","left"]}
//                 />

//                 <VStack spacing={"8"}>
//                     <Input 
//                         required
//                         value={oldPassword} 
//                         onChange={e => setOldPassword(e.target.value)} 
//                         placeholder="Old Password"
//                         type={"password"} 
//                         focusBorderColor="yellow.500" 
//                         />
                    

//                     <Input 
//                         required
//                         value={newPassword} 
//                         onChange={e => setNewPassword(e.target.value)} 
//                         placeholder="New Password"
//                         type={"password"} 
//                         focusBorderColor="yellow.500" 
//                         />

//                     <Button
//                     w={"full"}
//                     colorScheme="yellow"
//                     type="submit" 
//                     >
//                         Change

//                     </Button>

                        
//                 </VStack>

//             </form>

//         </Container>
//     )
//     }
    
//     export default ChangePassword





