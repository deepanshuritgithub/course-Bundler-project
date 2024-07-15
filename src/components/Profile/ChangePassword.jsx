import {Container, Heading, VStack, Input, Button } from "@chakra-ui/react"
import React from 'react'
    
    function ChangePassword() {

        const [oldPassword, setOldPassword] = React.useState("")
        const [newPassword, setNewPassword] = React.useState("")

        // ye abhi bnayenge achae se 
        // const submitHandler = (e) =>{
        //     e.preventDefault();
        //     console.log(e); 
        // }
        
      return (
        <Container
        py={"16"}
        minH={"90vh"}
        >
            <form  >
                <Heading 
                textTransform={"uppercase"}
                children="Change Password"
                my={"16 "} 
                textAlign={["center","left"]}
                />

                <VStack spacing={"8"}>
                    <Input 
                        required
                        value={oldPassword} 
                        onChange={e => setOldPassword(e.target.value)} 
                        placeholder="Old Password"
                        type={"password"} 
                        focusBorderColor="yellow.500" 
                        />
                    

                    <Input 
                        required
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        placeholder="New Password"
                        type={"password"} 
                        focusBorderColor="yellow.500" 
                        />

                    <Button
                    w={"full"}
                    colorScheme="yellow"
                    type="submit" 
                    >
                        Change

                    </Button>

                        
                </VStack>

            </form>

        </Container>
    )
    }
    
    export default ChangePassword