import { Container,VStack, Heading, Box ,FormLabel ,Input, Button, Textarea } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { courseRequest } from '../../redux/actions/other';
import toast from 'react-hot-toast';


function Request() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
    
  const dispatch = useDispatch();
  const submitHandler =(e) =>{
    e.preventDefault();
    dispatch(courseRequest(name, email, course))
  }

  
  const {error, message , loading} = useSelector(state => state.other)

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch({type:'clearError'}); //state mai se clear kr dega vo error ko if any error occurs 
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'});//state mai se clear kr dega vo message ko if any message occurs
    }
    
  }, [dispatch, error , message]);

  return (
    <Container h={"92vh"} py={"16"}>
        <VStack h="full" justifyContent={"center"} spacing={"16"}>
          <Heading children="Request New Course" />

          <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Box my={"4"} w={"full"} >
                            <FormLabel htmlFor='name' children="Name"/>
                            <Input 
                                required
                                id="name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="abc"
                                type={"text"} 
                                focusBorderColor="yellow.500" 
                            />
                
                        </Box>

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
                            <FormLabel htmlFor='course' children="course"/>

                            <Textarea 
                                required    
                                id="course" 
                                value={course} 
                                onChange={e => setCourse(e.target.value)} 
                                placeholder="Explain the course" 
                                focusBorderColor="yellow.500" 
                            />
                        </Box>


                        <Button isLoading={loading} my={"4"} colorScheme={'yellow'} type='submit'>Send Mail</Button>

                        
                        <Box my={"4"}> 
                        See available Courses! <Link to="/courses">
                                <Button colorScheme='yellow' variant={"link"}>Click</Button>
                                {" "}
                                here
                            </Link>
                        </Box>
                    </Form> 
        </VStack>
    </Container>
  )
}

export default Request