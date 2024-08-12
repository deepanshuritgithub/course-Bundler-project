import { Grid, Box, Text, Heading, Stack, HStack, Progress } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from "../../../../public/assets/images/cursor.png";
import Sidebar from '../Sidebar';
import { RiArrowUpLine } from "react-icons/ri";
import { RiArrowDownLine } from "react-icons/ri";
import { LineChart } from './Chart';
import { DoughnutChart } from './Chart';
import {useDispatch, useSelector} from "react-redux";
import toast from 'react-hot-toast';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from "../../Layout/Loader/Loader"

//functional component
const Databox = ({title, qty, qtyPercentage , profit}) => (
    
    <Box
    w={["full", "20%"]}
    boxShadow={"-2px 0 10px rgba(107,70, 193,0.5)"} 
    p="8"
    borderRadius={"lg"}
    >
        
        <Text children={title} />


        <HStack spacing={"6"}>

                <Text 
                fontSize={"2xl"} 
                fontWeight={"bold"}
                children={qty} 
                />


                <HStack>
                    <Text children={`${qtyPercentage}%`} />
                    {/* //profit = true,  mtlb profit hai , profit hoga tabhi aage badhengee vrna aagr nahi badengee , so kya kro agr profit hai to kya kro ki grren color ka upwards side arrow dikhaoo  otherwise ulta dikhaoo vo bhi red mai , if profit = false  */}
                    { profit? <RiArrowUpLine color="green" />  : ( <RiArrowDownLine color="red" /> ) }


                </HStack>

        </HStack>


        <Text opacity={0.6} children={"Since Last Month"} />


    </Box>
)


//progress Bar 

const ProgressBar = ({title , value, profit}) => (

    <Box py="4" px={["0","20"]}>

        <Heading size="sm" children={title} mb="2" />

        <HStack w={"full"} alignItems={"center"} >   

            {/* <Text children= "0%" /> */}
            <Text children={profit? "0%" : `-${value}%` } />

            <Progress w={"full"} value={profit? value : 0} colorScheme='purple' />
            <Text children={`${ value > 100? (value) : (100)}%`}  />

        </HStack>

    </Box>
)

function Dashboard() {
    const { loading,error, message,
stats,
viewsCount,
subscriptionPercentage,
subscriptionCount,
usersCount,
usersPercentage,
viewsPercentage,
subscriptionProfit,
viewsProfit,
usersProfit
     } = useSelector(state => state.admin); 

    const dispatch = useDispatch()
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({type:'clearError'}); //state mai se clear kr dega vo error ko if any error occurs 
          }
          if(message){
            toast.success(message);
            dispatch({type:'clearMessage'});//state mai se clear kr dega vo message ko if any message occurs
          }
          dispatch(getDashboardStats())
    },[dispatch, error, message])

    return (
        <Grid 
        css={{
                //jo bhi mai cursor dunga basically vo otherwise default
            cursor: `url(${cursor}), default`, //ye krne se kya hoga ki pure grid ka ek new cusror hogaa 
        }}

        minH={"100vh"}  
        templateColumns={["1fr","5fr 1fr"]}
        >

            {
                loading || !stats ? (<Loader color='purple.500'/>) : (
                    <Box boxSizing='border-box' py={"16"} px={["4","0"]} >
                {/* //this box will contain 5fr column size  */}

            <Text 
            textAlign={"center"}
            opacity={0.5}
            children={`Last change was on ${String(new Date(stats[11].createdAt)).split("G")[0]}`}
            />

            <Heading 
            children="Dashboard" 
            ml={["0","16"]}
            mb={"16"}
            textAlign={["center","left"]}
            />


            {/* boxes which is in between the Container top 3 boxes  */}
            <Stack
            direction={["column", "row"]}
            minH="24"
            justifyContent={"space-evenly"}    
            > 
            
                    <Databox
                    title="Views"
                    qty={viewsCount}
                    qtyPercentage={viewsPercentage}
                    profit={viewsProfit}
                    />
                    
                    <Databox
                    title="Users"
                    qty={usersCount}
                    qtyPercentage={usersPercentage}
                    profit={usersProfit}
                    /> 

                    <Databox
                    title="Subscription"
                    qty={subscriptionCount}
                    qtyPercentage={subscriptionPercentage}
                    profit={subscriptionProfit}
                    /> 


            </Stack>




            <Box
            margin={["0","16"]}
            borderRadius="lg"
            p={["0","16"]}
            mt={["4","16"]}
            boxShadow={"-2px 0 10px rgba(107,70, 193,0.5)"} 
            >
                
                <Heading 
                textAlign={["center","left"]}
                size="md"
                children="Views Graph"
                pt={["8", "0"]} 
                ml={["0","16"]}
                />

                {/* Line graph here -> new file create */}
                <LineChart views={stats.map(item => (item.views))} />

            </Box>


                <Grid templateColumns={["1fr", "2fr 1fr"]} >

                    
                        <Box p="4" ml={"2"}  
                        //we have to remove this 
                        // boxShadow={"-2px 0 10px rgba(107,70, 193,0.5)"}
                        >

                            
                            <Heading 
                            textAlign={["center","left"]} 
                            size="md"
                            children="Progress Bar"
                            my={"8"}
                            ml={["0","16"]}
                            />

                            {/* Progress Bar upar design krenge as a component */}
                            <Box>

                                <ProgressBar profit={viewsProfit} title="Views" value={viewsPercentage} />
                                <ProgressBar profit={usersProfit} title="Users" value={usersPercentage} />
                                <ProgressBar profit={subscriptionProfit} title="Subscription" value={subscriptionPercentage} />
                            
                            </Box>

                        </Box>



                        <Box p={["0","16"]} boxSizing='border-box' py={"4"}>
                            
                            <Heading textAlign={"center"} size={"md"} mb={"4"} children="Users" />
                            {/* AB YHA PE doughnut graph aayega jinhone subscribe kiya hua hai or jinhone subscribe nahi kiya hua hai  */}

                            {/* <Doughnut Graph */}
                            <DoughnutChart users={[subscriptionCount, usersCount-subscriptionCount]} /> 
                            {/* usersCount-subscriptionCount , ye krne se obviously not subscribed pta chal jayegaa  */}


                        </Box>

                </Grid>

        </Box>

                )
            }

                <Sidebar />
        
        </Grid>
)
}

export default Dashboard