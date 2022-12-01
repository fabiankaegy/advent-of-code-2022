const getInputValues = require('./helper/get-input-values');

const input = await getInputValues( '1' );

const normalizedInput = input.map( ( value ) => value ? parseInt( value, 10 ) : '' );

const elf = [];
let elfIndex = 0;

// split the input into a new array of arrays
// one entry for each elf containing all their calories
normalizedInput.forEach( ( calories ) => {
	if ( elf[ elfIndex ] === undefined ) {
		elf[ elfIndex ] = [];
	}

	// create the next elf 
	if ( calories === '' ) {
		elfIndex++;
		return;
	}

	elf[ elfIndex ].push( calories );
} );

// calculate the total calories for each elf
const elfScores = elf.map( ( calories ) => {
	return calories.reduce( ( sum, calorieOfFood ) => {
		return sum + calorieOfFood;
	}, 0 );
} );

// get the highest score
const highestScore = Math.max( ...elfScores );


/* -------- Part B -------- */

// sort by highest score
const sortedElves = elfScores.sort( ( a, b ) => b - a );

// get three elf with the highest score
const firstThreeElves = sortedElves.slice( 0, 3 );

// sum the three elf with the highest score
const sumOfFirstThreeElves = firstThreeElves.reduce( ( acc, value ) => acc + value, 0 ); //?