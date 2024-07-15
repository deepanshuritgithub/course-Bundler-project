import React from 'react' ;
import { VStack, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';

function Sidebar() {

    const location = useLocation(); //ab es location ki help se mai access kr sakta hu kya location hai 

  return (
    <VStack 
        spacing={"8"}
        padding={"16"}
        boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"} 
    >

        <LinkButton 
        url={'dashboard'} 
        Icon={RiDashboardFill} 
        text="Dashboard" 
        active={location.pathname === "/admin/dashboard"}

        />
        <LinkButton
        url={'createcourse'}
        Icon={RiAddCircleFill} 
        text="Create Course" 
        active={location.pathname === "/admin/createcourse"}
        />
        <LinkButton 
        url={'courses'} 
        Icon={RiEyeFill} 
        text="Courses" 
        active={location.pathname === "/admin/courses"}
        />
        <LinkButton 
        url={'users'} 
        Icon={RiUser3Fill} 
        text="Users" 
        active={location.pathname === "/admin/users"}
        />
        
        {/* //obvious se baat hai abhi pages nahi bnaye hai es liye undefined aa jata hai es lia mai admin foleder mai pages na leta hu  */}
    </VStack>    
)
}

export default Sidebar 

//so yha mai check krunga location hmari sahi hai , agr location hai /dashboard to eska color badal dengee 

//functional component
function LinkButton({ url, Icon, text, active}) {   //yha pe ek chiz or bhjte hai pass krke active 
    return (
        <Link to ={`/admin/${url}`} >
            <Button fontSize={"larger"} variant={"ghost"} colorScheme={active? "purple": ''}>
                <Icon style={{margin: '4px'}} />
                {text}
            </Button>

        </Link>
    )
}