import {
    Container,
    Heading,
    VStack,
    Box,
    Text,
    Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { server } from "../../redux/store";
import { buySubscription } from "../../redux/actions/user";
import toast from "react-hot-toast"
import logo from "../../../public/assets/images/logo.png"

function Subscribe({user}) {

    const dispatch = useDispatch();
    const [key, setKey] = useState("");

    const {loading , error , subscriptionId} = useSelector(state => state.subscription); //ye sab store mai se aata hai
    const { error:courseError } = useSelector(state => state.course)

    const subscribeHandler =async()=>{
        //e.prevent Default krne ki koi jrurat nahi hai kyuki koi form nahi hai yhaa 
        const {data:{ key }} = await axios.get(`${server}/razorpaykey`);//so espe krenge get Request or hmme mil jayegi api key , so esme authenicated wagera kuch nahi diya hai to simple credentials wagera kuch nahi es liye simple request 

        setKey(key);//so agr upar desturucture kr rha ho to direct key pass kr doo 
        dispatch(buySubscription())
    } 

    
    
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type: 'clearError'})
        }
        if(courseError){
            toast.error(courseError);
            dispatch({type: 'clearError'})
        }


        if(subscriptionId && key){

            const openPopUp = ()  =>{
            
                const options ={
                    key, 
                    name:"Course Bundler",
                    description:"Get access to all premium content",
                    image:logo,
                    subscription_id : subscriptionId,
                    callback_url :`${server}/paymentverification`,
                    prefill :{ 
                        name: user.name,
                        email: user.email,
                        contact: ""
                    },
                    notes: {
                        address:"Deepanshu kukreja courses at youtube"
                    },
                    theme:{
                        color: "#FFC800"
                    }
                }

                const razor = new window.Razorpay(options) //abhi hmmne dekha kyu aara hai Razor pay kyuki hm scripts add kr chuka hai 
                razor.open()
            }
            openPopUp();
        }
    },[dispatch , error , user.name , user.email, key , subscriptionId, courseError])

    return (
    <Container h={"96vh"} padding={"16"}>
        <Heading children="Welcome" my={"8"} textAlign={"center"} />

        <VStack
            boxShadow={"lg"}
            alignItems="stretch"
            borderRadius={"lg"}
            spacing="0"
        >
            <Box
            bgColor={"yellow.400"}
            p={"4"}
            css={{ borderRadius: "8px 8px 0 0" }}
            >
            {/*  top-left top-right bottom-right bottom-left  */}
            <Text color={"black "} children={`Pro Pack -  ₹299.00`} />
            </Box>

            <Box p={"4"}>
            <VStack textAlign={"center"} px={"8"} mt={"4"} spacing="8">
                <Text

                children={`Join Pro Pack and Get Access to all content.`}
                />
                <Heading size="md" children="₹299 Only" />
            </VStack>

            <Button isLoading={loading} onClick={subscribeHandler} my={"8"} w={"full"} colorScheme={"yellow"}>
                {" "}
                Buy Now{" "}
            </Button>
            </Box>

            <Box
            bg={"blackAlpha.600"}
            p={"4"}
            css={{ borderRadius: " 0 0 8px 8px "}}
            >
            <Heading
                color={"white"}
                textTransform={"uppercase"}
                size="sm"
                children="100% refund at cancellation"
            />
            <Text
                fontSize={"xs"}
                color={"white"}
                children={"*Terms & Conditions Apply "}
            />
            </Box>
        </VStack>
    </Container>
    );
}

export default Subscribe;
