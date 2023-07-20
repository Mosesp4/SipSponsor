import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import {
  Container,
  Flex,
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Skeleton,
  Input,
  Stack,
  Center,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link"
import { ethers } from "ethers";
import { useState } from "react";
import  Hero from "../images/hero.png";
import Image from "next/image";


const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x6a2B98e59f49a60f21e4ed1F5F7577ccF73D32aC";

  const { contract } = useContract(contractAddress);

  const { data: totalCoffees, isLoading: LoadingTotalCoffee } = useContractRead(
    contract,
    "getTotalCoffee"
  );
  const { data: recentCoffee, isLoading: loadingRecentCoffee } =
    useContractRead(contract, "getAllCoffee");

  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const gradientColor = useColorModeValue('blue.400', 'blue.800');

  function clearValues() {
    setMessage("");
    setName("");
  }

  

  return (
    <Container maxW={"1200px"} w={"full"} >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"20px"}
        height={"80px"}
        
      >
        <Box >
          <Flex justifyContent={"space-between"}>
          <img src="/images/logo.png" width={"50px"} />
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              SipSponsor
            </Text>

            {/* <Text fontWeight={"normal"}>Buy Me a Coffee</Text> */}
          </Flex>
        </Box>
        <Box>

        {/* <Link href="/about">
          <Text fontWeight={"bold"}>About Us</Text>
         </Link> */}

        </Box>
        
        <ConnectWallet />
      </Flex>

      <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex="-1"
        bgGradient="linear(to right, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))"
      />
      <Box
        maxWidth="700px"
        textAlign="center"
        zIndex="1"
      >
        <Text fontSize="4xl" fontWeight="bold" mb={6} color="white">
          Make a Difference Today!
        </Text>
        <Text fontSize="xl" mb={8} color="white">
          Help us support the less privileged by sending them a coffee. 
          Your contribution can bring a smile to someone&apos;s face and brighten their day.
        </Text>
        <a href="#donate-section">
      <Button colorScheme="purple" size="lg">
        Donate Now
      </Button>
    </a>
      </Box>
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex="-2"
      >
        <img 
        src="/images/hero2.png" 
        alt="Background Image" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </Box>
    </Flex>

      <SimpleGrid
         columns={[1, 2]} // Adjust the number of columns based on the screen width
         spacing={10}
         mt={"50px"}
         backdropFilter="blur(10px)"
         borderRadius="md"
         boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        >

    <Box
      // bgGradient={`linear(to-r, ${gradientColor}, ${gradientColor})`}
      borderRadius="md"
      bgGradient="linear(to right, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))"
      p={6}
    >
      <Card id="donate-section">
        <CardBody>
          <Heading mb={4} mt={4} textColor="blue.600">
            Send coffee with SipSponsor
          </Heading>
          <Flex direction="row" alignItems="center">
            <Text>Total Coffees:</Text>
            <Skeleton isLoaded={!LoadingTotalCoffee} width={4} ml={1}>
              {totalCoffees?.toString()}
            </Skeleton>
          </Flex>
          <Text fontSize="2xl" py={4}>
            Name:
          </Text>
          <Input
            placeholder="John Doe"
            maxLength={16}
            value={name}
            onChange={handleNameChange}
          />
          <Text fontSize="2xl" mt={4} py={4}>
            Send Creator a Message:
          </Text>
          <Input
            placeholder="Hello"
            maxLength={80}
            value={message}
            onChange={handleMessageChange}
          />
          <Box mt={6}>
            {address ? (
              <Web3Button
                contractAddress={contractAddress}
                action={(contract) => {
                  contract.call('buyCoffee', [message, name], {
                    value: ethers.utils.parseEther('0.01'),
                  });
                }}
                onSuccess={clearValues}
              >
                Buy a Coffee 0.01ETH
              </Web3Button>
            ) : (
              <Text> &quot;Please connect your Wallet &quot;</Text>
            )}
          </Box>
        </CardBody>
      </Card>
    </Box>

        <Box>
          <Card maxH={"60hv"} overflow={"scroll"} >
            <CardBody>
              <Text fontWeight={"bold"}>Recent Messages:</Text>
              {!loadingRecentCoffee ? (
                <Box>
                  {recentCoffee && recentCoffee.map((coffee:any, index:number) => {
                    return (
                      <Card key={index} my={"10px"}>
                      <CardBody>
                      <Text fontSize={"2xl"}>{coffee[1]}</Text>
                      <Text>From: {coffee[2]}</Text>
                      </CardBody>
                      </Card>
                    )
                  }).reverse()}
                </Box>
              ) : (
                <Stack>
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                  <Skeleton height={"100px"} />
                </Stack>
              )}
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
