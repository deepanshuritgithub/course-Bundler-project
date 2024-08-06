import React,{useState} from 'react'
import { Container, FormLabel, Heading, VStack, Input, Box , Button, Avatar } from '@chakra-ui/react'
import { Form , Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/user'


//ab esko hm kaii jagah use krne wala hai to mai esko alag se rkhunga or export bhi kr leta hu , es object ko , eske andar jitne bhi properties hai , or trike se bhi use kr le hm 
export const fileUploadcss ={
    cursor:"pointer",
    marginLeft: "-5%",
    width: "110%",
    border:"none",
    height: "100%", 
    color: "#ECC94B",
    // color: useColorModeValue("#ECC94B", "yellow"), // Light mode: #ECC94B, Dark mode: yellow
    backgroundColor: "white",   
} 


  const fileUploadStyle = {
    "&::file-selector-button" : fileUploadcss,
  }

function Register() {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [imagePrev , setImagePrev] = useState("");
  const [image , setImage] = useState("");

    const dispatch = useDispatch();

  const changeImageHandler = (e) =>{
    const file = e.target.files[0];  //so ek file lene ke liyee , vo bhi first file ,ek file hogi esme vaise bhii 
    //so ab reader bnayenge 
    const reader = new FileReader();

    reader.readAsDataURL(file);  //so data url krenge to data uri mil jayegi simply 
    reader.onloadend = () => {   //so ab krenge reader.onloadend jaise hi load ho jaye purii tab kya kro tab ek function 
      setImagePrev(reader.result);  //so image preview par set krna hai

      //so ye data uri ke file hogyi , jo ki hmme backend mai ne bhjni , hmme normally blob bhjna hai file ka as form , so ye to preview ke liye hogya kaam , so ab alag se ek or state bnayenge image wala , so jab form bnake bhjenge usme image bhjenge na ki image preview  backend pe
     //es upar wala mai hmmne file ka uri diya read krke 
        //or jo image hai niche wala usme hmne direct file hi de hai 
      setImage(file);  //so image state par set krna hai
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();
    // Here you can use the `image` state to handle the form submission
    // console.log({ name, email, password, image });

    const myForm = new FormData(); //object bnaya hmme or usme sab chiz dalke bhj diye hai

    // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values, which can include files.
    // It is useful for sending form data, including files, via HTTP requests.

    myForm.append("name", name); 
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);  //image ka variable bhj rha hai pr file ke naam se bhjna hai , because we are expecting a file in the multer ,that's why we have to give a same name here
    dispatch(register(myForm));
  };
  

  return <Container h={"98vh"}> 
  {/* so kahi pe bhi overflow ku nahi ho rha hai , kyuki container khud ba khud adjust ho jata hai eske hissaab se  */}
    
            <VStack h={"full"} justifyContent="center"  >

                <Heading children={"Registration"} width={"full"} m={"35px"} textAlign={"center"}
                textTransform={"uppercase"}
                />

                    <Form onSubmit={submitHandler} style={{width: '100%'}}>



                        <Box my={"4"} display={"flex"} justifyContent={"center"}>
                            <Avatar src={imagePrev} size={"2xl"} />
                        </Box>



                        <Box my={"4"} w={"full"}>
                            <FormLabel htmlFor='name' children="Name"/>
                            <Input 
                                required
                                id="name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="Enter your name"
                                type={"text"} 
                                focusBorderColor="yellow.500" 
                            />
                   
                        </Box>



                        <Box my={"4"} w={"full"}>
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



                        <Box my={"4"} w={"full"}>
                            <FormLabel htmlFor='chooseAvatar' children="ChooseAvatar"/>
                            <Input 
                                accept='image/*'
                                required    
                                id="chooseAvatar"
                                type={"file"} 
                                focusBorderColor="yellow.500" 
                                // file upload button changee way
                                //so yha pe likhne ki bjaye mai eska ek alag object bnaa lunga 
                                css={fileUploadStyle}

                                 //ab espe ek chiz or krte hai onChange dete hai espe kyuki file jab tak select nahi hoti na maja nai aata na 
                                onChange={changeImageHandler}
                            />
                        </Box>


                        <Button my={"4"} colorScheme={'yellow'} type='submit'>Sign Up</Button>

                        <Box my={"4"}> 
                        Already Signed Up?   <Link to="/login">
                                <Button colorScheme='yellow' variant={"link"}>Login </Button>
                                {" "}
                                here
                            </Link>
                        </Box>

                </Form>                 
            </VStack>
        </Container> 
}

export default Register