import React from "react";
import { Outlet } from 'react-router-dom' 
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Box } from '@chakra-ui/react';
import { useSelector } from "react-redux";

function Layout(){
    const {isAuthenticated , user} = useSelector(state => state.user)

    return (
        <Box  display="flex" flexDirection="column" minHeight="100vh" width="100vw">
            <Header isAuthenticated={isAuthenticated} user={user} />
                <Box as="main" mt="4" width="100%">
                    <Outlet />
                </Box>
            <Footer />
        </Box>
    )
}
export default Layout;

