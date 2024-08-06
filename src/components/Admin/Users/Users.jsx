import React from "react";
import { Grid, Box, TableContainer,Table, TableCaption, Heading, Thead , Tr, Th,Td, Tbody, HStack,Button } from "@chakra-ui/react";
import cursor from "../../../../public/assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";

function Users() {

  const users = [
    //1st user , which index is 0 and the item 1 
    {
    _id:"acasgvfsgssaqaaejiji",
    name:"Deepanshu Kukreja",
    email:"kukrejagolu8@gmail.com",
    role:"admin",
    subscription:{
      status: "active",
    },
  },

]

const updateHandler = (userId) =>{
  console.log(userId);
}

const deleteButtonHandler = (userId) =>{
  console.log(userId);
}

  return (
    <Grid
      css={{
        //jo bhi mai cursor dunga basically vo otherwise default
        cursor: `url(${cursor}), default`, //ye krne se kya hoga ki pure grid ka ek new cusror hogaa
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >

          <Box
            p={["0", "16"]}
            overflowX={"auto"}
          >
                <Heading
                  textTransform={"uppercase"}
                  children="All Users"
                  my={"16"}
                  textAlign={["center", "left"]}
                />


                <TableContainer
                w={['100vw','full']}
                
                >

                    <Table
                    variant={"simple"}
                    size={"lg"}
                    > 
                        <TableCaption>All available users in the database </TableCaption>


                        {/* Thead is just a tag , it is just only define as a header, footer , or we can say as a semantics tags  */}
                        <Thead> 
                            <Tr >
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>           
                                <Th>Subscription</Th>
                                <Th isNumeric>Action</Th> 
                                {/* // esme hm denge isNumeric ye ab isko ese treat krega jaise esme number ho , number jab hota hai kya hota hai table mai , excel mai kya hota hai vo unka text channel right ho jata hai automatically , unka text channel right ho jata hai automatically  */}

                            </Tr>
                        </Thead>


                        <Tbody>
                          {/* //es tbody mai user jitne bhi honge unpe map krengee, obvious se baat hai abhi to nahi hai user temporary bannyenege user   */}

                      {/* <Row /> */}
                        {
                        users.map((item) => (
                          <Row 
                          updateHandler={updateHandler}
                          deleteButtonHandler={deleteButtonHandler}
                          key={item._id} item={item} />
                        ))
                        }

                        </Tbody>

                

                    </Table>

                </TableContainer>

          </Box>

      <Sidebar />
    </Grid>
  );
}

export default Users;


function Row({item, updateHandler, deleteButtonHandler}) {  //ye yha pe destucture ho ke araa hai , jhaa pe bhi use kra hoaga es component ko vha pe as a prope pass ho rha hai 
  return (
    <Tr>
          <Td>#{item._id}</Td>
          <Td>{item.name}</Td>
          <Td>{item.email}</Td>
          <Td>{item.role}</Td>

          <Td>
            {item.subscription.status === 'active'? "Active" : "Not Active"}
          </Td>
          
          <Td isNumeric>

                <HStack justifyContent={'flex-end'}>

                    <Button 
                    variant={'outline'} 
                    onClick={() => updateHandler(item._id)}
                    color={"purple.500"}>
                      Change Role
                    </Button>


                          {/* //delete btn  */}
                    <Button 
                    onClick={() => deleteButtonHandler(item._id)}
                    color={"purple.600"}
                    >
                      <RiDeleteBin7Fill />
                    </Button>

                </HStack>

          </Td>
      
    </Tr>
  )
}