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
} from "@chakra-ui/react";
import Link from "next/link"
import { ethers } from "ethers";
import { useState } from "react";
import heroImage from "../images/funds3.png"
// import Image from "next/image";

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

        <Link href="/about">
          <Text fontWeight={"bold"}>About Us</Text>
         </Link>

        </Box>
        <ConnectWallet />
      </Flex>

      {/* <Box>
        <Flex>
        <Image src={heroImage} width={"30px"}/>

        </Flex>
      </Box> */}


      <SimpleGrid
        columns={2}
        spacing={10}
        mt={"50px"}
        // backdropFilter="blur(10px)"
        // borderRadius="md"
        // boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        >

        <Box >
          <Card>
            <CardBody>
              <Heading mb={"20px"}> Buy a Coffee </Heading>
              <Flex direction={"row"}>
                <Text>Total Coffees:</Text>
                <Skeleton
                  isLoaded={!LoadingTotalCoffee}
                  width={"20px"}
                  ml={"5px"}
                >
                  {totalCoffees?.toString()}
                </Skeleton>
              </Flex>
              <Text fontSize={"2xl"} py={"10px"}>
                Name:
              </Text>
              <Input
                placeholder="John Doe"
                maxLength={16}
                value={name}
                onChange={handleNameChange}
              />
              <Text fontSize={"2xl"} mt={"10px"} py={"10px"}>
                Send Creator a Message:
              </Text>
              <Input
                placeholder="Hello"
                maxLength={80}
                value={message}
                onChange={handleMessageChange}
              />
              <Box mt={"20px"}>
                {address ? (
                  <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) => {
                      contract.call("buyCoffee", [message, name], {
                        value: ethers.utils.parseEther("0.01"),
                      });
                    }}
                    onSuccess={() => clearValues()}
                  >
                    {"Buy a Coffee 0.01ETH"}
                  </Web3Button>
                ) : (
                  <Text>"Please connect your Wallet"</Text>
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
