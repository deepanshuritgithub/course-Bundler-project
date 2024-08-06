import React,{useState} from 'react';
import { Container, FormLabel, Heading, VStack, Input, Box , Button} from '@chakra-ui/react';
import { Form, Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { login } from '../../redux/actions/user';


function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();//not reload page 
        dispatch(login(email, password));
    }


  return <Container h={"98vh"}> 
  {/* so kahi pe bhi overflow ku nahi ho rha hai , kyuki container khud ba khud adjust ho jata hai eske hissaab se  */}
    
            <VStack h={"full"} justifyContent="center" >

                <Heading children={"Welcome to CourseBundler"} width={"full"} m={"+55px"} />
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Box my={"4"} w={"full"} >
                            <FormLabel htmlFor='email' children="Email Address"/>
                            <Input 
                                required
                                id="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="abc@gmail.com"
                                type={"email"} 
                                focusBorderColor="yellow.500" 
                            />
                            
                        </Box>

                        <Box my={"4"} w={"full"}>
                            <FormLabel htmlFor='password' children="Password"/>

                            <Input 
                                required    
                                id="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                placeholder="Enter your password" 
                                type={"password"} 
                                focusBorderColor="yellow.500" 
                            />
                        </Box>

                        
                        <Box>
                            <Link to="/forgetpassword">
                                <Button fontSize={"sm"} variant={"link"}>
                                    Forget Password?
                                </Button>
                            </Link>
                        </Box>


                        <Button my={"4"} colorScheme={'yellow'} type='submit'>Login</Button>

                        <Box my={"4"}> 
                        New User? <Link to="/register">
                                <Button colorScheme='yellow' variant={"link"}>Sign Up </Button>
                                {" "}
                                here
                            </Link>
                        </Box>
                            
                    </Form> 
            </VStack>
        </Container> 
}

export default Login