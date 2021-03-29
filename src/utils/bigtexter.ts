const aCharCode = 97;
const zCharCode = 122;

const zeroCharCode = 48;
const nineCharCode = 57;

const findAndReplceList: FindReplace[] = [
    {find: 'á', replace: 'a'},
    {find: 'é', replace: 'e'},
    {find: 'í', replace: 'i'},
    {find: 'ó', replace: 'o'},
    {find: 'ú', replace: 'u'},
];

const specialChars: FindReplace[] = [
    {find: '!', replace: ':exclamation:'},
    {find: '?', replace: ':question:'},
];

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export function getBigChar(char: string): string | undefined {
    char = char.substring(0, 1).toLocaleLowerCase();

    if(char.charCodeAt(0) >= zeroCharCode && char.charCodeAt(0) <= nineCharCode) {
        char = numbers[parseInt(char)];
        return `:${char}:`;
    }

    let index: number;
    if((index = specialChars.findIndex((fr) => fr.find === char)) != -1) {
        return specialChars[index].replace;
    }

    if(char.charCodeAt(0) < aCharCode || char.charCodeAt(0) > zCharCode) {
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
            output += '   ';
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