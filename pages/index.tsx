import Head from "next/head";
import OrderString from "@/components/orderString";
import { Text, Container, Grid, GridItem, useColorMode } from "@chakra-ui/react";



export default function Home() {
  
  const { colorMode } = useColorMode()




  return (
    <>
      <Head>
        <title>Hiive Technical Interview</title>
        <meta name="description" content="Hiive Technical Interview" />
        <meta name="author" content="George Macrae" />
        <meta name="keywords" content="Hiive, Technical, Interview" />
        <meta name="date" content="2024-2-22" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main >
        <Container maxW="container.lg" py={5}> 
          <Grid templateColumns='repeat(12, 1fr)' pb={10}>
            <GridItem colSpan={{base:12, md:6}} display={'flex'} alignItems={'flex-end'} justifyContent={{base:'center', md:'flex-end'}}>
              <Text textAlign={{base:"center", md:'start'}} fontSize={{base:'1.5rem', md:'2rem'}}>Junior Engineer at Hiive Technical&nbsp;Interview</Text>
            </GridItem>
            <GridItem colSpan={{base:12, md:3}} display={'flex'} alignItems={'flex-end'} justifyContent={{base:'center', md:'flex-end'}}>
              <Text >George Macrae</Text>
            </GridItem>
            <GridItem colSpan={{base:12, md:3}} display={'flex'} alignItems={'flex-end'} justifyContent={{base:'center', md:'flex-end'}}>
              <Text >2024-2-22</Text>
            </GridItem >  
          </Grid>

          <OrderString />
            
        </Container>

      </main>
    </>
  );
}
