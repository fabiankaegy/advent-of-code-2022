const getInputValues = require('./helper/get-input-values');

const sampleInput = await getInputValues('6-sample');
const input = await getInputValues('6');

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function getIndexOfFirstCharacterAfterXRandomOnes(input, numberOfRandomOnes) {
	const length = input.length;
	let index = 0;

	while (index < length) {
		
		// get 4 characters starting at index
		const characters = input.slice(index, index + numberOfRandomOnes);
		
		if (! hasDuplicates(characters)) {
			return index + numberOfRandomOnes;
		}
		index++;
	}

	return -1;
}

function getAnswerPartA(input) {
	return getIndexOfFirstCharacterAfterXRandomOnes(input, 4);
}

function getAnswerPartB(input) {
	return getIndexOfFirstCharacterAfterXRandomOnes(input, 14);
}

const answerPartA = getAnswerPartA(input[0]); //?
const answerPartB = getAnswerPartB(input[0]); //?

module.exports = {
	sampleInput,
	input,
	getAnswerPartA,
	getAnswerPartB,
	getIndexOfFirstCharacterAfterXRandomOnes,
};
