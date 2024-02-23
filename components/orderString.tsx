import React, { useState, useCallback } from "react";
import styles from "@/styles/orderString.module.css";
import { Card, CardBody, Box, Text, Grid, GridItem, Stack, StackDivider, Link, Input, Button, TagLabel, Checkbox } from "@chakra-ui/react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function OrderString(){

    // states
    const [orderAlphabet, setOrderAlphabet ] = useState<string>("abcdefghijklmnopqrstuvwxyz");
    const [message, setMessage ] = useState<string>("");
    const [input, setInput ] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [useOrderAlphabet, setUseOrderAlphabet] = useState<boolean>(false);
    

    const checkOrderAlphabet = useCallback(() => {  
        if(orderAlphabet.length !== 26){
            setMessage("Order Alphabet must have one of each letter of the alphabet.")
            setOutput('');
            return false;
        }else if(orderAlphabet.toLowerCase().split('').sort().join('') !== "abcdefghijklmnopqrstuvwxyz"){
            setMessage("Order Alphabet must have one of each letter of the alphabet.")
            setOutput('');
            return false;
        }
        setMessage('');

        return true;
    }, [orderAlphabet, input]);
    
    const handleOrderAlphabetChange = useCallback(( input: string) => {
        setOrderAlphabet(input.toLowerCase());
        checkOrderAlphabet();
    }, [checkOrderAlphabet, orderAlphabet]);




    // Convert String to lowercase,
    // split words into an array (by comma)
    // sort each word
    // join each word back together with a comma
    const orderStringDefault = useCallback(() => {
        const str = input.toLowerCase();
        const arr = str.split(",");
        let output = arr.map((string)=> string.split('').sort().join(''))
        setOutput(output.join(', '));
    }, [input]);


    // split words into an array (by comma)
    // sort each word in array :
    //// create a set of each - key is the index of the character, value is the character
    //// split word into character array
    //// put character array into set
    //// sort each word
    ////// if chars are same (case insensitive) then sort by case sensitive
    ////// if chars are different (case insensitive) then sort by case insensitive
    // note : uses set because all Caps are less than all lowercase - set solves ABCDEabce => AaBbCcDdEe 
    const orderStringDefaultCaseSensitive = useCallback(() => {
        const arr = input.split(",");
        const output = arr.map((string) => {
            const stringSet: {[key: number]: string} = {};
            const stringArray = string.split("");
            stringArray.forEach((char, index)=>{
                stringSet[index] = char;
            });

            const stringSetOrderedIndicies = Object.keys(stringSet).sort((a,b) => {
                if(stringSet[Number(a)].toLowerCase() == stringSet[Number(b)].toLowerCase()){
                    if(stringSet[Number(a)] < stringSet[Number(b)]) return -1;
                    if(stringSet[Number(a)] > stringSet[Number(b)]) return 1;
                    return 0;
                }

                if(stringSet[Number(a)].toLowerCase() < stringSet[Number(b)].toLowerCase()) return -1;
                if(stringSet[Number(a)].toLowerCase() > stringSet[Number(b)].toLowerCase()) return 1;
                return 0;
            });
            return stringSetOrderedIndicies.map((index)=>stringSet[Number(index)]).join('');
        })

        setOutput(output.join(', '));
    
    }, [input]);


    // Similar to above, but uses orderAlphabet to sort the characters (rather than the stringSet)
    // orderAlphabet only uses lowercase
    const orderStringDefaultUseAlphabet = useCallback((toLowerCase:boolean) => {  
        
        if(checkOrderAlphabet() == false) return;

        const arr = toLowerCase ? input.toLowerCase().split(",") : input.split(",");
        const output = arr.map((string)=>{
            const stringSet: {[key: number]: string} = {};
            const stringArray = string.split("");
            stringArray.forEach((char, index)=>{
                stringSet[index] = char;
            });

            let stringSetOrderedIndicies = Object.keys(stringSet).sort((a,b) => {
                if(orderAlphabet.toLowerCase().indexOf(stringSet[Number(a)].toLowerCase()) < orderAlphabet.toLowerCase().indexOf(stringSet[Number(b)].toLowerCase())) return -1;
                if(orderAlphabet.toLowerCase().indexOf(stringSet[Number(a)].toLowerCase()) > orderAlphabet.toLowerCase().indexOf(stringSet[Number(b)].toLowerCase())) return 1;
                return 0;
            });
            return stringSetOrderedIndicies.map((index)=>stringSet[Number(index)]).join('');
            
        });
        setOutput(output.join(', '));

    }, [input, orderAlphabet, checkOrderAlphabet]);

    
    // factory
    const orderString = useCallback((key: string) => {
        if(useOrderAlphabet){
            orderStringDefaultUseAlphabet(key === 'default');
        }else if(key === 'default'){
            orderStringDefault();
        }else if(key === 'case-sensitive'){
            orderStringDefaultCaseSensitive();
        }
    }, [useOrderAlphabet, orderAlphabet, input, orderStringDefaultUseAlphabet, orderStringDefault, orderStringDefaultCaseSensitive]);



    return(
        <Card><CardBody>
            <Stack divider = {<StackDivider/>} spacing={6}>
                <Box>
                    <Stack spacing={6} >
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Text fontSize={'xl'} fontWeight="bold">String ReOrderer</Text>
                        </Box>

                        {/* Text Input */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}} >
                                <Text fontSize='xs' sx={{ fontStyle:'italic', paddingRight:'5px'}}>Input - for multiple strings seperate by coma </Text>
                                <Input type="text" value={input} width='100%' onChange={(e)=>setInput(e.target.value)} id="orderStringInput" placeholder="Enter a string" />
                            </Box>
                        </Box>

                        {/* checkbox */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}} >
                                <Box display='flex'>
                                    <Checkbox id='useAlphabetSwitch' checked={useOrderAlphabet} onChange={()=>setUseOrderAlphabet(!useOrderAlphabet)} sx={{pr:2, cursor:'pointer'}}/>
                                    <Text fontSize='xs' fontStyle={'italic'}>Custom Order Alphabet (part2)</Text>
                                </Box>

                            </Box>
                        </Box>

                        {/* order alphabet input */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>

                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column', 
                                    opacity: useOrderAlphabet ? 1 : 0.4,
                                    pointerEvents: useOrderAlphabet ? 'all' : 'none'}} >

                                <Box>
                                    <Text fontSize='xs' fontStyle={'italic'}>Order Alphabet</Text>
                                </Box>
                            
                                <Box display={'flex'}>
                                    <Input type="text" width='min(100%, 300px)' value={orderAlphabet} onChange={(e)=>handleOrderAlphabetChange(e.target.value)} id="orderAlphabetInput"  />
                                    <Button onClick={() => {
                                        setOrderAlphabet('abcdefghijklmnopqrstuvwxyz');
                                        setMessage('');
                                    }} >
                                        <RestartAltIcon sx={{p:0 ,marginEnd:0, marginInlineEnd:0, display:'flex', justifyContent:'center'}}/>
                                    </Button>
                                </Box>
                                {message?.length > 0 && <Text sx={{color:'red',}}>{message}</Text>}
                            </Box>
                        </Box>

                        {/* submit buttons */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}}>
                                <Button onClick={() => orderString('default')} style={{marginRight:'5px'}}>Reorder</Button>
                                <Button onClick={() => orderString('case-sensitive')} >Reorder (case sensitive)</Button>
                            </Box>
                        </Box>

                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}}>
                                <Box as='span' >
                                    <Text as='span'>Output : </Text>
                                    <Text as='span' fontSize={'4xl'}>{output} </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                
                <Box display={'flex'} justifyContent={{base:'flex-start', md:'center'}}>
                    <Box>
                        <Text fontSize='lg' fontWeight={'semibold'}>Problem Description</Text>
                        <Text as ='p'>
                            We need to alphabetically order a string. For example, given the input &ldquo;HiiveIsLive&ldquo;, the output &ldquo;eehiiiilsvv&ldquo; is produced.
                        </Text>
                        <Text as ='p'>
                            We need to further extend the function to take a second input which is a custom alphabet. The input should be an ordered list of all 26 characters in any order. The function should use this alphabet for ordering the input string.
                        </Text>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={{base:'flex-start', md:'center'}}>
                    <Box>
                        <Text fontSize='lg' fontWeight={'semibold'}>Solution Description</Text>
                        <Text as ='p'>
                            The input box is for the string to be ordered. The first button orders the string in a case-insensitive manner. The second button orders the string in a case-sensitive manner.
                        </Text>
                        <Text as ='p'>
                            The checkbox enables the second input for part 2. 
                        </Text>
                        <Text as ='p'>
                            The second input is the custom alphabet. The second input is a string of 26 characters, each character is a letter of the alphabet. The second input is used to order the string.
                        </Text>
                        <Text as ='p'>
                            Extras : Case sensitive ordering, and multiple words can be ordered at once (input the words seperated by coma).
                        </Text>
                    </Box>
                </Box>
                <Box display='flex' justifyContent={'center'}>
                    <Link fontSize='sm' href='https://github.com/egroeg92/alphabeticalHiive' isExternal>Source Code</Link>
                </Box>
                </Stack>

            </CardBody>

        
        </Card>
    )
}