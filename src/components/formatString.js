export function formatString(input) {
    const words = input.split('-');
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const result = formattedWords.join(' ');
    return result;
}
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}