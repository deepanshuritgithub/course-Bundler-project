import React, {useEffect, useState } from "react";
import { Container, Input, Button, Heading , VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/profile";
import toast from "react-hot-toast";

function ResetPassword() {
    const [password, setPassword] = useState("");


    // es token k value ko hm access kr payengee with the help of params hook , whenever we want to access the value from the url we use params 
    const params = useParams();
    console.log(params.token);//vhi chiz console log krna hai , jo vha pe keyword diya hai routing time pe 

    // so hm token access kr paa rahe hai , ye access krke hm sidha backend mai jab bhi dispatch krenge token yha se bhj diya krengee 
    const navigate = useNavigate();
    const {loading , message , error } = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const submitHandler= (e) => {
      e.preventDefault();
      dispatch(resetPassword(params.token, password));
    }

    useEffect(()=>{
      if(error){
          toast.error(error);
          dispatch({type: 'clearError'});
      }
      if(message){
          toast.success(message);
          dispatch({type: 'clearMessage'});
          navigate("/login"); 
      }
    
  },[dispatch, error , message]);

  return (
    <Container py={"16"} h={"96vh"}>
      <form onSubmit={submitHandler}>
          <Heading
            children="Reset Password"
            my="16"
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          />

          <VStack spacing={"8"}>
              <Input
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              type={"password"}
              focusBorderColor="yellow.500"
              />

          <Button 
          isLoading={loading} 
          type="submit" 
          w={"full"} 
          colorScheme="yellow"
          >
              Reset Password
          </Button>

          </VStack>
      </form>
    </Container>
  );
}

export default ResetPassword;
