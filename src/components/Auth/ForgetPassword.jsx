import React, { useState } from "react";
import { Container, Input, Button, Heading , VStack } from "@chakra-ui/react";

function ForgetPassword() {
    const [email, setEmail] = useState("");

  return (
    <Container py={"16"} h={"96vh"}>
      <form>
        <Heading
          children="Forget Password"
          my="16"
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
            <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type={"email"}
            focusBorderColor="yellow.500"
            />

            <Button type="submit" w={"full"} colorScheme="yellow">
                Send Reset Link
            </Button>

        </VStack>
      </form>
    </Container>
  );
}

export default ForgetPassword;
