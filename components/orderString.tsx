import React, { useState, useCallback } from "react";
import styles from "@/styles/orderString.module.css";


export default function OrderString(){

    // states
    const [orderAlphabet, setOrderAlphabet ] = useState<string>("abcdefghijklmnopqrstuvwxyz");
    const [message, setMessage ] = useState<string>("");
    const [input, setInput ] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [useOrderAlphabet, setUseOrderAlphabet] = useState<boolean>(false);
    

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

    }, [input, orderAlphabet]);


    const handleOrderAlphabetChange = useCallback(( input: string) => {
        setOrderAlphabet(input.toLowerCase());
        checkOrderAlphabet();
    }, [orderAlphabet]);

    const checkOrderAlphabet = useCallback(() => {  
        console.log(input)
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
        <div>
            <div className={styles.solutionContainer}>
                <div style={{display:'block'}}>
                    <div className={styles.row}>
                        <div>
                            <label htmlFor="orderStringInput" style={{fontSize:'12px', paddingRight:'5px'}}><i>Input - for multiple strings seperate by coma </i></label>
                        </div>
                        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} id="orderStringInput" placeholder="Enter a string" />
                    </div>

                    <input id='useAlphabetSwitch' type="checkbox" checked={useOrderAlphabet} onChange={()=>setUseOrderAlphabet(!useOrderAlphabet)}/>
                    {
                        useOrderAlphabet &&
                        <div className={styles.row}>
                            <div>
                                <label htmlFor="orderAlphabetInput" style={{fontSize:'12px', paddingRight:'5px'}}><i>Order Alphabet</i></label>
                            </div>
                            <div>
                                <input type="text" value={orderAlphabet} onChange={(e)=>handleOrderAlphabetChange(e.target.value)} id="orderAlphabetInput" style={{marginRight:'5px'}} />
                        
                                <button onClick={() => {
                                    setOrderAlphabet('abcdefghijklmnopqrstuvwxyz');
                                    setMessage('');
                                }} style={{cursor:'pointer', marginRight:'5px'}}>reset</button>
                            </div>
                            {message?.length > 0 && <div style={{color:'red', fontSize:'12px'}}>{message}</div>}
                        </div>
                    }

                    <div className={styles.row}>
                        <button onClick={() => orderString('default')} style={{cursor:'pointer', marginRight:'5px'}}>Order</button>
                        <button onClick={() => orderString('case-sensitive')} style={{cursor:'pointer'}}>Order (case sensitive)</button>
                    </div>

                    <div style={{padding:'10px 0px'}}>
                        Output : {output}
                    </div>
                </div>
            </div>

            <div>
                <h5>Problem Description</h5>
                <p>
                    We need to alphabetically order a string. For example, given the input &ldquo;HiiveIsLive&ldquo;, the output &ldquo;eehiiiilsvv&ldquo; is produced.
                </p>
                <p>
                    We need to further extend the function to take a second input which is a custom alphabet. The input should be an ordered list of all 26 characters in any order. The function should use this alphabet for ordering the input string.
                </p>

                <h5>Solution Description</h5>
                <p>
                    The input box is for the string to be ordered. The first button orders the string in a case insensitive manner. The second button orders the string in a case sensitive manner.
                </p>
                <p>
                    The checkbox enables the second input for part 2. 
                </p>
                <p>
                    The second input is the custom alphabet. The second input is a string of 26 characters, each character is a letter of the alphabet. The second input is used to order the string.
                </p>
                <p>
                    Extras : Case sensitive ordering, and multiple words can be ordered at once (input the words seperated by coma).
                </p>
                <p>
                    <a href='https://github.com/egroeg92/alphabeticalHiive' target='_blank'>Source Code</a>
                </p>
            </div>

        </div>
    )
}