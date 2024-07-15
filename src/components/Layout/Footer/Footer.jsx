import React from "react";
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Divider,
    IconButton,
    Link as ChakraLink,
    useColorModeValue,
} from "@chakra-ui/react";

import { Link as RouterLink, NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaDiscord, FaDribbble } from "react-icons/fa";

export default function Footer() {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const headingColor = useColorModeValue("gray.900", "gray.200");
    const textColor = useColorModeValue("gray.500", "gray.400");
    const linkHoverColor = useColorModeValue("gray.700", "gray.300");
    const iconHoverColor = useColorModeValue("gray.900", "gray.200");

    return (
        <Box bg={bgColor} borderY="1px" borderColor={borderColor} p={4} py={6} width="100vw">
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb={6}>
                <ChakraLink as={RouterLink} to="/" display="flex" alignItems="center" mb={{ base: 6, md: 0 }}>
                
                    <img
                        src=""
                        alt="Logo"
                        height="64px"
                    />

                </ChakraLink>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
                    <Box>
                        <Heading as="h2" size="sm" mb={6} textTransform="uppercase" color={headingColor}>
                            Resources
                        </Heading>
                        <Flex direction="column" color={textColor} fontWeight="medium">
                            <ChakraLink
                                as={NavLink}
                                to="/"
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                                mb={4}
                            >
                                Home
                            </ChakraLink>
                            <ChakraLink
                                as={NavLink}
                                to="/about"
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                            >
                                About
                            </ChakraLink>
                        </Flex>
                    </Box>
                    <Box>
                        <Heading as="h2" size="sm" mb={6} textTransform="uppercase" color={headingColor}>
                            Follow us
                        </Heading>
                        <Flex direction="column" color={textColor} fontWeight="medium">
                            <ChakraLink
                                href="https://github.com/deepanshuritgithub"
                                isExternal
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                                mb={4}
                            >
                                Github
                            </ChakraLink>
                            <ChakraLink
                                as={RouterLink}
                                to="/"
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                            >
                                Discord
                            </ChakraLink>
                        </Flex>
                    </Box>
                    <Box>
                        <Heading as="h2" size="sm" mb={6} textTransform="uppercase" color={headingColor}>
                            Legal
                        </Heading>
                        <Flex direction="column" color={textColor} fontWeight="medium">
                            <ChakraLink
                                as={RouterLink}
                                to="#"
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                                mb={4}
                            >
                                Privacy Policy
                            </ChakraLink>
                            <ChakraLink
                                as={RouterLink}
                                to="#"
                                _hover={{ textDecoration: "underline", color: linkHoverColor }}
                            >
                                Terms &amp; Conditions
                            </ChakraLink>
                        </Flex>
                    </Box>
                </Grid>
            </Flex>
            <Divider borderColor={borderColor} mb={6} />
            <Flex direction={{ base: "column", sm: "row" }} align="center" justify="space-between">
                <Text color={textColor} fontSize="sm">
                    © 2023 Deepanshu Kukreja. All Rights Reserved.
                </Text>
                <Flex mt={{ base: 4, sm: 0 }} spacing={5}>
                    <IconButton
                        as={ChakraLink}
                        href="#"
                        aria-label="Facebook"
                        icon={<FaFacebook />}
                        variant="ghost"
                        color={textColor}
                        _hover={{ color: iconHoverColor }}
                    />
                    <IconButton
                        as={ChakraLink}
                        href="#"
                        aria-label="Twitter"
                        icon={<FaTwitter />}
                        variant="ghost"
                        color={textColor}
                        _hover={{ color: iconHoverColor }}
                    />
                    <IconButton
                        as={ChakraLink}
                        href="#"
                        aria-label="Github"
                        icon={<FaGithub />}
                        variant="ghost"
                        color={textColor}
                        _hover={{ color: iconHoverColor }}
                    />
                    <IconButton
                        as={ChakraLink}
                        href="#"
                        aria-label="Discord"
                        icon={<FaDiscord />}
                        variant="ghost"
                        color={textColor}
                        _hover={{ color: iconHoverColor }}
                    />
                    <IconButton
                        as={ChakraLink}
                        href="#"
                        aria-label="Dribbble"
                        icon={<FaDribbble />}
                        variant="ghost"
                        color={textColor}
                        _hover={{ color: iconHoverColor }}
                    />
                </Flex>
            </Flex>
        </Box>
    );
}




// import {Box, VStack , Stack, Heading, HStack} from '@chakra-ui/react';
//  import { TiSocialYoutubeCircular, TiSocialInstagramCircular } from 'react-icons/ti'
// import React from 'react'
// import { DiGithub } from 'react-icons/di'

// function Footer() {
//   return <Box padding={"4"} minH={"10vh"} bg={"blackAlpha.900"}>

//     <Stack direction={["column", "row"]}>

//         <VStack alignItems={["center", "flex-start"]} width="full">

//             <Heading children="All Rights Reserved" color={"white"} />
//             <Heading fontFamily={"body"} size={"sm"} children="@Deepanshu Kukreja" color={"yellow.400"} />

//         </VStack>


//         <HStack spacing={["2","10"]} justifyContent="center" color={"white"} fontSize={"50"}>
//             <a href="https://youtube.com/@deepanshukukreja381" target={'_blank'}>
//                 <TiSocialYoutubeCircular />
//             </a>
//             <a href="https://www.instagram.com/kukreja.deepanshu13" target={'_blank'}>
//                 <TiSocialInstagramCircular />
//             </a>
//             <a href="https://github.com/deepanshuritgithub" target={'_blank'}>
//                 <DiGithub />
//             </a>
//         </HStack>


//     </Stack>
// </Box>
// }

// export default Footer





