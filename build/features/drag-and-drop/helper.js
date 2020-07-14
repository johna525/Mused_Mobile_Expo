export function firstLetterUpper(word) {
    const arrayLetters = word.split('');
    const firstLetter = arrayLetters[0].toUpperCase();
    arrayLetters.splice(0, 1, firstLetter);
    return arrayLetters;
}
//# sourceMappingURL=helper.js.map