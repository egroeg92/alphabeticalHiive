import React, { useState, useCallback } from "react";
import { Card, CardBody, Box, Text, Stack, StackDivider, Tag, TagLabel, Input, Button, Switch, Tooltip } from "@chakra-ui/react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { TagCloseButton } from "@chakra-ui/react";
import NextLink from "next/link"

export default function OrderString(){

    // states
    const [orderAlphabet, setOrderAlphabet ] = useState<string>("abcdefghijklmnopqrstuvwxyz");
    const [message, setMessage ] = useState<string>("");
    const [input, setInput ] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [useOrderAlphabet, setUseOrderAlphabet] = useState<boolean>(false);
    const [useCaseSensitive, setUseCaseSensitive] = useState<boolean>(false);

    const checkOrderAlphabet = useCallback((input: string ) => {  

        if(input?.length !== 26){
            setMessage("Order Alphabet must have one of each letter of the alphabet.")
            setOutput('');
            return false;
        }else if(input?.toLowerCase().split('').sort().join('') !== "abcdefghijklmnopqrstuvwxyz"){
            setMessage("Order Alphabet must have one of each letter of the alphabet.")
            setOutput('');
            return false;
        }
        setMessage('');
        return true;
    }, []);
    
    const handleOrderAlphabetChange = useCallback(( input: string) => {
        setOrderAlphabet(input.toLowerCase());
        checkOrderAlphabet(input.toLowerCase());
    }, [checkOrderAlphabet]);


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
    const orderStringDefaultUseAlphabet = useCallback(() => {  
        
        if(checkOrderAlphabet(orderAlphabet) == false) return;

        const arr = !useCaseSensitive ? input.toLowerCase().split(",") : input.split(",");
        const output = arr.map((string)=>{
            const stringSet: {[key: number]: string} = {};
            const stringArray = string.split("");
            stringArray.forEach((char, index)=>{
                stringSet[index] = char;
            });

            let stringSetOrderedIndicies = Object.keys(stringSet).sort((a,b) => {
                if(orderAlphabet.indexOf(stringSet[Number(a)].toLowerCase()) == orderAlphabet.indexOf(stringSet[Number(b)].toLowerCase())){
                    if(stringSet[Number(a)] < stringSet[Number(b)]) return -1;
                    if(stringSet[Number(a)] > stringSet[Number(b)]) return 1;
                    return 0;
                }
                if(orderAlphabet.indexOf(stringSet[Number(a)].toLowerCase()) < orderAlphabet.indexOf(stringSet[Number(b)].toLowerCase())) return -1;
                if(orderAlphabet.indexOf(stringSet[Number(a)].toLowerCase()) > orderAlphabet.indexOf(stringSet[Number(b)].toLowerCase())) return 1;
                return 0;
            });
            return stringSetOrderedIndicies.map((index)=>stringSet[Number(index)]).join('');
            
        });
        setOutput(output.join(', '));
    }, [input, useCaseSensitive, orderAlphabet, checkOrderAlphabet]);

    const handleRemoveWord = useCallback((word: string) => {
        let index = 0;
        const newInput = input.split(',').filter((item, i)=>{
            if(item === word){
                index = i;
                return false;
            }else{
                return true;
            }
        }).join(',');

        const newOutput = output.split(',').filter((item, i)=>{
            if(i === index){
                return false;
            }else{
                return true;
            }
        }).join(',');


        setOutput(newOutput);
        setInput(newInput);
    }, [input, output]);

    const handleChangeInput = useCallback((input: string) => {
        setInput(input);
        if(output?.length > 0){
            setOutput('');
        }
    }, [output, input]);
    
    // factory
    const orderString = useCallback(() => {
        if(useOrderAlphabet){
            orderStringDefaultUseAlphabet();
        }else if(!useCaseSensitive){
            orderStringDefault();
        }else{
            orderStringDefaultCaseSensitive();
        }
    }, [useOrderAlphabet, useCaseSensitive, orderStringDefaultUseAlphabet, orderStringDefault, orderStringDefaultCaseSensitive]);



    return(
    <Card>
        <CardBody>
            <Stack divider = {<StackDivider/>} spacing={6}>
                <Box>
                    <Stack spacing={6} >
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Text fontSize={'xl'} fontWeight="bold">String ReOrderer</Text>
                        </Box>

                        {/* Text Input */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}} >
                                <Text fontSize='sm'>Input</Text>
                                <Text fontSize='xs' sx={{ fontStyle:'italic', paddingRight:'5px'}}>for multiple strings seperate by coma </Text>
                                <Text fontSize='xs' sx={{ fontStyle:'italic', paddingRight:'5px'}}>ex. hiive, monkey = ehiiv, ekmnoy</Text>
                                <Input type="text" value={input} width='100%' onChange={(e)=>handleChangeInput(e.target.value)} id="orderStringInput" placeholder="Enter a string" >
                                </Input>
                                <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', }}> 
                                {
                                    input?.length > 0 && input.split(',').map((word, index) => {
                                        return(
                                        <Tag
                                            key={index}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                            width='fit-content'
                                            m='4px 4px'
                                            >
                                            <TagLabel>{word}</TagLabel>
                                            <TagCloseButton onClick={()=>handleRemoveWord(word)}/>
                                        </Tag>)
                                    })
                                }
                                </Box>
                                        
                                
                            </Box>
                        </Box>

                        {/* checkbox */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}} >
                                <Box display='flex'>
                                    <Switch id='useAlphabetSwitch' checked={useOrderAlphabet} onChange={()=>setUseOrderAlphabet(!useOrderAlphabet)} sx={{pr:2, cursor:'pointer'}}/>
                                    <Text fontSize='xs' fontStyle={'italic'}>Custom Order Alphabet (part2)</Text>
                                </Box>
                            </Box>
                        </Box>

                        {/* order alphabet input */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>

                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column',  opacity: useOrderAlphabet ? 1 : 0.4, pointerEvents: useOrderAlphabet ? 'all' : 'none'}} >
                                <Box>
                                    <Text fontSize='xs' fontStyle={'italic'}>Custom Order Alphabet</Text>
                                </Box>
                            
                                <Box display={'flex'}>
                                    <Input type="text" width='min(100%, 300px)' value={orderAlphabet} onChange={(e)=>handleOrderAlphabetChange(e.target.value)} id="orderAlphabetInput"  />
                                    <Tooltip label="reset custom order alphabet to abcdefghijklmnopqrstuvwxyz" aria-label="Reset Alphabet">
                                        <Button onClick={() => {
                                            setOrderAlphabet('abcdefghijklmnopqrstuvwxyz');
                                            setOutput('');
                                            setMessage('');
                                        }} >
                                            <RestartAltIcon sx={{p:0 ,marginEnd:0, marginInlineEnd:0, display:'flex', justifyContent:'center'}}/>
                                        </Button>
                                    </Tooltip>
                                </Box>
                                {message?.length > 0 && <Text sx={{color:'red',}}>{message}</Text>}
                            </Box>
                        </Box>

                        {/* submit buttons */}
                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box sx={{display:'flex', width:'min(100%, 300px)', alignContent:'flex-start', flexDirection:'column'}}>
                                <Box sx={{display : 'flex'}}> 
                                    <Switch id='useAlphabetSwitch' checked={useCaseSensitive} onChange={()=>setUseCaseSensitive(!useCaseSensitive)} sx={{pr:2, cursor:'pointer'}}/>
                                    <Text fontSize='xs' fontStyle={'italic'}>Case Sensitive</Text>
                                </Box>
                                <Button onClick={() => orderString()} style={{marginRight:'5px'}}>Reorder</Button>
                            </Box>
                        </Box>

                        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                            <Box>
                                <Text fontSize='sm'>Output </Text>

                                <Box as='span' sx={{ 
                                    border: '1px solid', 
                                    padding: '2rem 3rem',
                                    borderRadius: '5px',
                                    display:'flex', 
                                    width:'fit-content', 
                                    maxWidth: '500px',
                                    minWidth:'300px',
                                    // alignContent:'flex-start', 
                                    }}>
                                        <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', width:'100%', }}> 
                                        {output?.length > 0 && 
                                            output.split(',').map((word, index) => {
                                                return(
                                                    <Tag key={index} width='fit-content' p={'1rem 1.5rem'} m={1}>
                                                        <TagLabel><Text as='span' fontSize={'2xl'}>{word}</Text></TagLabel>
                                                    </Tag>
                                                )
                                            })
                                        }
                                    </Box>

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
                            The input box is for the string to be ordered.
                        </Text>
                        <Text as ='p'>
                            The checkbox activates the <i>custom order alphabet</i>, and when reorder is pressed - it will now be reordered based on the input of the <i>custom order alphabet</i>. 
                        </Text>
                        <Text as ='p'>
                            Next is the second input, the <i>custom order alphabet</i>. The program requires the <i>custom order alphabet</i> to have exactly 1 of every character in the English alphabet.
                        </Text>
                        <Text as ='p'>
                            Extras : <b>Case sensitive ordering</b>: the output will consider case. <b>Multiple Input</b>: multiple strings can be processed at once (input the words seperated by comas).
                        </Text>
                    </Box>
                </Box>
                <Box display='flex' justifyContent={'center'}>
                    <NextLink href='https://github.com/egroeg92/alphabeticalHiive' target='_blank' passHref>
                        <Button variant='solid' colorScheme='teal'>
                            Source Code <ExternalLinkIcon mx={2}/>
                        </Button>
                    </NextLink>
                </Box>
            </Stack>
        </CardBody>

        
    </Card>
    )
}