const getInputValues = require('./helper/get-input-values');

const input = await getInputValues( '3' );

function normalizeInput( rucksackArray ) {
	return rucksackArray.map( rucksack => {
		const letters = rucksack.split( '' );
	
		// split letters in half in the middle of the array
		const half = Math.ceil( letters.length / 2 );
		const firstHalf = letters.slice( 0, half );
		const secondHalf = letters.slice( half );
	
		return [ firstHalf, secondHalf ];
	} );
}

function isUppercase( letter ) {
	return letter === letter.toUpperCase();
}

function getValueOfItem( letter ) {
	const numberOfLetter = letter.toLowerCase().charCodeAt( 0 ) - 96;

	if ( isUppercase( letter ) ) {
		return numberOfLetter + 26;
	}

	return numberOfLetter;
}

function getSharedItems( rucksack ) {
	const [ firstHalf, secondHalf ] = rucksack;
	const sharedItems = firstHalf.filter( item => secondHalf.includes( item ) );
	return sharedItems;
}

const normalizedInput = normalizeInput( input );

function getValueOfSharedItemInRucksack( rucksack ) {
	const sharedItems = getSharedItems( rucksack );
	const valueOfSharedItem = getValueOfItem( sharedItems[ 0 ] );
	return valueOfSharedItem;
}

const valueOfSharedItemsInRucksacks = normalizedInput.map( getValueOfSharedItemInRucksack );

const sumOfValuesOfSharedItems = valueOfSharedItemsInRucksacks.reduce( ( sum, value ) => sum + value, 0 ); //?


/* ------- Part B ------- */

function groupRucksacksInPairOfThree( rucksackArray ) {
	const groupedRucksacks = [];

	for ( let i = 0; i < rucksackArray.length; i += 3 ) {
		const firstRucksack = rucksackArray[ i ];
		const secondRucksack = rucksackArray[ i + 1 ];
		const thirdRucksack = rucksackArray[ i + 2 ];

		const groupedRucksack = [ firstRucksack, secondRucksack, thirdRucksack ];
		groupedRucksacks.push( groupedRucksack );
	}

	return groupedRucksacks;
}

function findSharedItemBetweenGroupedRucksacks( groupedRucksacks ) {
	const firstRucksack = groupedRucksacks[ 0 ].join(',');
	const secondRucksack = groupedRucksacks[ 1 ].join(',');
	const thirdRucksack = groupedRucksacks[ 2 ].join(',');

	// find the character that is shared between all three rucksacks
	const sharedItem = firstRucksack.split(',').find( item => {
		return secondRucksack.includes( item ) && thirdRucksack.includes( item );
	});

	return sharedItem;
	
}

const groupedRucksacks = groupRucksacksInPairOfThree( normalizedInput );
const groupSharedItems = groupedRucksacks.map( findSharedItemBetweenGroupedRucksacks );

const sumOfValuesOfSharedItemsInGroupedRucksacks = groupSharedItems.map( getValueOfItem ).reduce( ( sum, value ) => sum + value, 0 ); //?


module.exports = {
	normalizeInput,
	isUppercase,
	getValueOfItem,
	getSharedItems,
	groupRucksacksInPairOfThree,
};