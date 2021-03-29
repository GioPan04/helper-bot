let startCharCode = () => {
    const res = 'a'.charCodeAt(0);
    startCharCode = () => res;
    return res;
}

let endCharCode = () => {
    const res = 'z'.charCodeAt(0);
    endCharCode = () => res;
    return res;
}

const findAndReplceList: FindReplace[] = [
    {find: 'á', replace: 'a'},
    {find: 'é', replace: 'e'},
    {find: 'í', replace: 'i'},
    {find: 'ó', replace: 'o'},
    {find: 'ú', replace: 'u'}
]; 

export function getBigChar(char: string) {
    char = char.substring(0, 1).toLocaleLowerCase();
    if(char.charCodeAt(0) < startCharCode() || char.charCodeAt(0) > endCharCode()) {
        return undefined;
    }
    return `:regional_indicator_${char}:`;
}

export default function getBigString(input: string) {
    let chars = input;
    
    findAndReplceList.forEach((fr) => chars = chars.replace(fr.find, fr.replace));
    
    let output = '';
    for (const char of chars) {
        if(char == ' ') {
            output += ' ';
        } else {
            const emoji = getBigChar(char);
            if(!emoji) {
                throw Error("Not allowed char in big text");
            }
            output += emoji;
        }
    }
    return output;
}

interface FindReplace {
    find: string;
    replace: string;
}