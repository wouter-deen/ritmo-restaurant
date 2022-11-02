import React, {useState} from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Collapse,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import "@/lib/firebase"
import {useAuth} from "@/lib/auth";
import {useRouter} from "next/router";
import {FaLock, FaUser} from "react-icons/fa";
import {ArrowForwardIcon} from "@chakra-ui/icons";

export default function Login()  {
  const auth = useAuth();
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Er is een onbekende fout opgetreden.");
  const [openAlert, setOpenAlert] = useState(false);

  const toast = useToast();

  async function handleLogin(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    setLoading(true);

    await auth.signin(email, password)
      .then(() => {
        setLoading(false);
        toast({
          title: "Login successful.",
          description: `Welcome back, chef! Have a nice day.`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        router.push("/chef/dashboard")
      }).catch((error) => {
        setSubmitDisabled(true);
        setLoading(false);
        if(error.code === "auth/invalid-email") {
          setAlertMessage("The email adress is invalid.")
        }
        if(error.code === "auth/user-disabled") {
          setAlertMessage("This account has been (temporarily) disabled.")
        }
        if(error.code === "auth/user-not-found") {
          setAlertMessage("This account does not exist.")
        }
        if(error.code === "auth/wrong-password") {
          setAlertMessage("The password is incorrect.")
        }
        setOpenAlert(true);
      })
  }

  const handleFieldChange = () => {
    setOpenAlert(false);
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    if(password.length > 6 && email.includes("@") && email.includes(".nl")) {
      setSubmitDisabled(false);
    } else setSubmitDisabled(true);
  }

  return (
    <Box px={8} py={8} align="center">
      <Box maxW="md" align="left">
        <Heading fontFamily="Merriweather" fontWeight={900}>Log in</Heading>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.300">
                <FaUser color="gray.300"/>
              </InputLeftElement>
              <Input placeholder="chef@piccomelodioso.nl" id="loginEmail" onChange={() => handleFieldChange()}/>
            </InputGroup>
          </FormControl>

          <FormControl mt={4} mb={1}>
            <FormLabel>Wachtwoord</FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.300">
                <FaLock color="gray.300"/>
              </InputLeftElement>
              <Input type="password" placeholder="PurpleHamster3!" id="loginPassword" onChange={() => handleFieldChange()}/>
            </InputGroup>
          </FormControl>

          <Button isLoading={loading} colorScheme="blue" mt={4} type="submit" disabled={submitDisabled} float="right" rightIcon={<ArrowForwardIcon/>}>
            Log in
          </Button>
        </form>

        <Collapse in={openAlert} animateOpacity>
          <Alert status="error" borderRadius="6px" mb={4} ml={4} mr={4} w="calc(100% - 2em)">
            <AlertIcon />
            {alertMessage}
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setOpenAlert(false)}/>
          </Alert>
        </Collapse>
      </Box>
    </Box>
  )
}