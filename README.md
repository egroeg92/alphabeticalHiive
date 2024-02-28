# Hiive - technical interview
Solution is in components/orderString.tsx

# install

Node.js version >= v18.17.0 is required

npm install

npm run dev

open up localhost:3000 in browser

enter inputs into prompt and hit 'reorder'
hit switch to extend the function to use the custom alphabet

# URL
https://alphabetical-hiive.vercel.app/

# description



Problem Description
    
We need to alphabetically order a string. For example, given the input "HiiveIsLive", the output "eehiiiilsvv" is produced.
  
We need to further extend the function to take a second input which is a custom alphabet. The input should be an ordered list of all 26 characters in any order. The function should use this alphabet for ordering the input string.
    

Solution Description
    
The input box is for the string to be ordered.
    
The switch activates the <i>custom order alphabet</i>, and when reorder is pressed - it will now be reordered based on the input of the <i>custom order alphabet</i>. 
    
Next is the second input, the <i>custom order alphabet</i>. The program requires the <i>custom order alphabet</i> to have exactly 1 of every character in the English alphabet.
    
Extras : <b>Case sensitive ordering</b>: the output will consider case. <b>Multiple Input</b>: multiple strings can be processed at once (input the words separated by commas).
    
