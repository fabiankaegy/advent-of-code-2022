const getInputValues = require('./helper/get-input-values');

const sampleInput = await getInputValues( '4-sample' );
const input = await getInputValues( '4' );

/**
 * 
 * @param {array} input array of lines as strings
 */
function normalizeInput( input ) {
	return input.map( line => {
		const [ firstRange, secondRange ] = line.split( ',' );
		
		const [ firstRangeMin, firstRangeMax ] = firstRange.split( '-' ).map(Number);
		const [ secondRangeMin, secondRangeMax ] = secondRange.split( '-' ).map(Number);

		return [
			[ firstRangeMin, firstRangeMax ],
			[ secondRangeMin, secondRangeMax ]
		];
	} );
}

function isOneRangeContainedInOther(rangeA, rangeB) {
	const [ rangeAMin, rangeAMax ] = rangeA;
	const [ rangeBMin, rangeBMax ] = rangeB;

	if ( rangeAMin >= rangeBMin && rangeAMax <= rangeBMax ) {
		return true;
	}

	if ( rangeBMin >= rangeAMin && rangeBMax <= rangeAMax ) {
		return true;
	}

	return false;
}

function getAnswerPartA( input ) {

	const numberOfRedundantRanges = input.reduce( ( sum, range ) => {
		const [ firstRange, secondRange ] = range;

		if ( isOneRangeContainedInOther( firstRange, secondRange ) ) {
			return sum + 1;
		}

		return sum;
	}, 0 );

	return numberOfRedundantRanges;
}

const normalizedInput = normalizeInput( input );
const answerPartA = getAnswerPartA( normalizedInput ); //?


/* -------- Part B -------- */

function isRangeOverlapping(rangeA, rangeB) {
	const [ rangeAMin, rangeAMax ] = rangeA;
	const [ rangeBMin, rangeBMax ] = rangeB;

	if ( rangeAMin <= rangeBMax && rangeAMax >= rangeBMin ) {
		return true;
	}

	return false;
}

function getAnswerPartB( input ) {
	const numberOfOverlappingRanges = input.reduce( ( sum, range ) => {
		const [ firstRange, secondRange ] = range;

		if ( isRangeOverlapping( firstRange, secondRange ) ) {
			return sum + 1;
		}

		return sum;
	}, 0 );

	return numberOfOverlappingRanges;
}

const answerPartB = getAnswerPartB( normalizedInput ); //?

module.exports = {
	sampleInput,
	input,
	getAnswerPartA,
	normalizeInput,
	isOneRangeContainedInOther,
	getAnswerPartB,
	isRangeOverlapping,
};