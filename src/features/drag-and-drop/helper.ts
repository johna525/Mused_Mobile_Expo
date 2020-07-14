export function firstLetterUpper(word: string) {
    const arrayLetters: string[] = word.split('')
    const firstLetter: string = arrayLetters[0].toUpperCase();
    arrayLetters.splice(0, 1, firstLetter);
    return arrayLetters;
}