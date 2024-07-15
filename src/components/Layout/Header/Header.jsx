import React from "react";
import ColorModeSwitcher from "../../../ColorModeSwitcher.jsx"; //yha pe kya hai ki default export nahi hai es liye hmne esa kiya hai  esko bracket mai kiya hai , pr hm kr sakte hai kyuki hmme color mode swtcher ko y default export kraa rakha hota hai
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, VStack, useDisclosure , HStack } from "@chakra-ui/react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import {Link} from 'react-router-dom'


                //this is the by default properties , if someone will pass then ok otherwise it will take these value which is by-default
const LinkButton = ({url='/', title='Home', onClose}) =>(
    <Link onClick={onClose}  to={url} >  
    {/* onClick mai kya do on Close , ki click krte hi close ho jayee  */}
        <Button variant={'ghost'}>{title}</Button>
    </Link>
);


function Header() {

    const {isOpen , onOpen , onClose} = useDisclosure();
    const isAuthenticated = true;

    const user = {
        role: "admin",
    };


    const logoutHandler = () => {
        console.log("logout"); 
        onClose(); //log out hone ke baad onClose ko kr denge close 
    }

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={"yellow"}
        width="12"
        height={"12"}
        rounded={"full"}
        zIndex={'overlay'}
        position={"fixed"}
        top="6"
        left="6"
      >

          <RiMenu5Fill />

      </Button>

      <Drawer
      placement="left"
      isOpen={isOpen} 
      onClose={onClose}
      >
        <DrawerOverlay backdropFilter={"blur(3px)"} />
        <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>

            <DrawerBody>
                <VStack spacing={"4"} alignItems={"flex-start"}>
                    <LinkButton onClose={onClose} url="/" title="Home" />
                    <LinkButton onClose={onClose} url="/courses" title="Browse All Courses" />
                    <LinkButton onClose={onClose} url="/request" title="Request a Course" />
                    <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
                    <LinkButton onClose={onClose} url="/about" title="About " />

                    <HStack justifyContent={"space-evenly"} position={"absolute"} bottom={"2rem"} width="80%" >
                        {
                        /* so ab is Hstack mai 2 button hongee , vese to bhut sare btn honge , vese to abhi ke liye mai 2 hi maan rha hu ya abhi bana rha hai saare backend jab aayenge tab implement ka rkhengee  
                        */
                        }

                                {isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                
                                                <Link onClick={onClose} to="/profile">
                                                    <Button variant={"ghost"} colorScheme={"yellow"}>Profile</Button>
                                                </Link>

                                        {/*variant ghost se kya hota hai ki apka jo border hota hai side mai kisi bhi chiz ke gyab ho jata haii  
                                        */}
                                                <Button onClick={logoutHandler} variant={"ghost"}>
                                                    <RiLogoutBoxLine />    
                                                    Logout
                                                </Button>

                                            </HStack>

                                            { user && user.role === "admin"  && (
                                                <Link  onClick={onClose} to="/admin/dashboard">
                                                <Button colorScheme={"purple"} variant={'ghost'}>
                                                <RiDashboardFill style={{margin: '4px'}}/>
                                                Dashboard
                                                </Button>
                                            </Link>
                                            )}

                                        </VStack>

                                    </>
                                ) : (

                                    <>
                                
                                        <Link  onClick={onClose} to="/login">
                                                <Button colorScheme={"yellow"}>Login</Button>
                                        </Link>

                                        <p>OR</p>

                                        <Link  onClick={onClose} to="/register">
                                            <Button colorScheme={"yellow"}>Sign Up</Button>
                                        </Link>
                                    </>
                                )}

                    </HStack>
                </VStack>
            </DrawerBody>

        </DrawerContent>
        </Drawer>
    </>
  );
}

export default Header;

















// import React from 'react';
// import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
// import { Box, Flex, HStack, Image, Button, useColorModeValue, Link } from '@chakra-ui/react';

// export default function Header() {
//     return (
//         <Box
//             as="header"
//             boxShadow="sm"
//             position="sticky"
//             top={0}
//             zIndex={50}
//             bg={useColorModeValue('white', 'gray.800')}
//         >
//             <Flex
//                 as="nav"
//                 bg={useColorModeValue('white', 'gray.800')}
//                 px={{ base: 4, lg: 6 }}
//                 py={2.5}
//                 align="center"
//                 justify="space-between"
//                 maxW="screen-xl"
//                 mx="auto"
//             >
//                 {/* Logo Section */}
//                 <Link as={RouterLink} to="/" display="flex" alignItems="center">
//                     <Image
//                         src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
//                         mr={3}
//                         h={12}
//                         alt="Logo"
//                     />
//                 </Link>

//                 {/* NavLink Section */}
//                 <HStack
//                     spacing={8}
//                     display={{ base: 'none', lg: 'flex' }}
//                     alignItems="center"
//                 >
//                     {['Home', 'About', 'Contact', 'Github'].map((item) => (
//                         <Link
//                             as={RouterNavLink}
//                             to={`/${item.toLowerCase()}`}
//                             key={item}
//                             px={3}
//                             py={2}
//                             fontWeight="medium"
//                             color={useColorModeValue('gray.700', 'gray.200')}
//                             _hover={{ textDecoration: 'none', color: 'orange.700' }}
//                             _activeLink={{
//                                 color: 'orange.700',
//                                 borderBottom: '2px solid',
//                                 borderColor: 'orange.700',
//                             }}
//                         >
//                             {item}
//                         </Link>
//                     ))}
//                 </HStack>



                
//                 {/* Right Part */}
//                 <HStack spacing={2} display="flex" alignItems="center">
//                     <Button
//                         as={RouterLink}
//                         to="#"
//                         variant="ghost"
//                         color={useColorModeValue('gray.800', 'white')}
//                         _hover={{ bg: useColorModeValue('gray.50', 'gray.700'), color: 'orange.700' }}
//                     >
//                         Log in
//                     </Button>
//                     <Button
//                         as={RouterLink}
//                         to="#"
//                         variant="ghost"
//                         color={useColorModeValue('gray.800', 'white')}
//                         _hover={{ bg: useColorModeValue('gray.50', 'gray.700'), color: 'orange.700' }}
//                     >
//                         Sign in
//                     </Button>
//                     <Button
//                         as={RouterLink}
//                         to="#"
//                         colorScheme="orange"
//                         _hover={{ bg: 'orange.800' }}
//                     >
//                         Get started
//                     </Button>
//                 </HStack>

//             </Flex>
//         </Box>
//     );
// }

