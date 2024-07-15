import React, { useState } from "react";
import { Container, Input, Button, Heading , VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    // es token k value ko hm access kr payengee with the help of params hook , whenever we want to access the value from the url we use params 
    const params = useParams();
    console.log(params.token);//vhi chiz console log krna hai , jo vha pe keyword diya hai routing time pe 


    // so hm token access kr paa rahe hai , ye access krke hm sidha backend mai jab bhi dispatch krenge token yha se bhj diya krengee 
  return (
    <Container py={"16"} h={"96vh"}>
      <form>
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

            <Button type="submit" w={"full"} colorScheme="yellow">
                Reset Password
            </Button>

        </VStack>
      </form>
    </Container>
  );
}

export default ResetPassword;
