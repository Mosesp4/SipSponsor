import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Text,
  Flex,
  Center,
  SimpleGrid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

const about = () => {
  return (
    <Container>
       <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"20px"}
        height={"80px"}
      >
        <Box >
            
          <Flex justifyContent={"space-between"}>
          <Link href="/">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              SipSponsor
            </Text>
         </Link>
          </Flex>
        </Box>
        <ConnectWallet />
      </Flex>
      <Center>
        <Text fontWeight={"extrabold"} fontSize={"2xl"}>
          About Us
        </Text>
        </Center>
        <SimpleGrid mt={"50px"} width={"full"} color={"white"}>
          <Box>
            {/* <Card>
              <CardBody> */}
                <Text fontWeight={"normal"}>
                  Welcome to SipSponsor, your go-to destination for supporting
                  your favorite creators and projects through the power of web3
                  and cryptocurrency. We believe in the transformative potential
                  of blockchain technology and its ability to revolutionize the
                  way we engage with digital content creators. At Buy a Coffee,
                  our mission is to provide a seamless and secure platform that
                  enables creators to receive direct support from their
                  community of fans and supporters. We understand that creators
                  pour their heart and soul into their work, and we aim to
                  empower them by connecting them with their audience in a
                  meaningful way. Our platform leverages the benefits of web3
                  technologies, such as decentralized finance and smart
                  contracts, to facilitate transparent and efficient
                  transactions. Through the use of cryptocurrency, specifically
                  Ethereum and its ecosystem, we eliminate unnecessary
                  intermediaries and provide a direct channel for fans to
                  contribute to the success of their favorite creators. With Buy
                  a Coffee, you can show your appreciation for the incredible
                  content, art, music, writing, and more that creators produce.
                  Whether it&apos;s a single cup of coffee or ongoing support, every
                  contribution counts and helps fuel the passion and dedication
                  of creators around the world. Our Features: Seamless
                  Transactions: Our platform ensures smooth and secure
                  transactions between supporters and creators. With the power
                  of blockchain technology, you can contribute instantly and
                  directly to your favorite creators without the need for
                  intermediaries. Creator Showcase: Explore a diverse range of
                  creators and their projects on our platform. Discover new
                  talent, follow their journey, and support them on their
                  creative endeavors. Customized Support: Choose the level of
                  support that suits you best. From a one-time contribution to
                  recurring subscriptions, you have the flexibility to show your
                  support in a way that aligns with your preferences and budget.
                  Transparent and Fair: We prioritize transparency and fairness.
                  By leveraging blockchain technology, we provide transparent
                  records of transactions, ensuring that creators receive the
                  support they deserve. Community Engagement: Connect with a
                  vibrant community of supporters and like-minded individuals
                  who share a passion for empowering creators. Engage in
                  discussions, discover new projects, and join the conversation.
                  Join Us Today! Become part of the Buy a Coffee community and
                  make a difference in the lives of creators. Start supporting
                  your favorite artists, musicians, writers, and content
                  creators today. Together, we can reshape the way creators are
                  supported and bring their visions to life. Thank you for being
                  part of our journey. We look forward to empowering creators
                  and fostering a thriving community of support and
                  appreciation.
                </Text>
              {/* </CardBody>
            </Card> */}
          </Box>
        </SimpleGrid>
      {/* </Center> */}
    </Container>
  );
};

export default about;
