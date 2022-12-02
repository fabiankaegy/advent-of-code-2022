const getInputValues = require('./helper/get-input-values');

const input = await getInputValues( '2' );

const normalizedInput = input.map( value => value.split( ' ' ) );

function getScoreForShape( shape ) {

	// scores per shape:
	// - 1 for Rock
	// - 2 for Paper
	// - 3 for Scissors

	switch ( shape ) {
		case 'A':
			return 1;
		case 'B':
			return 2;
		case 'C':
			return 3;
	}
}

function isFirstShapeWinning( shapeA, shapeB ) {

	// rules:
	// - Rock (A) defeats Scissors (C),
	// - Scissors (C) defeats Paper (B),
	// - and Paper (B) defeats Rock (A).

	return shapeA === 'A' && shapeB === 'C' || shapeA === 'B' && shapeB === 'A' || shapeA === 'C' && shapeB === 'B';
}

function playRockPaperScissors( input ) {
	const [ player1, player2 ] = input;
	let [ scorePlayer1, scorePlayer2 ] = [0 ,0];

	// input mapping:
	// - A = Rock
	// - B = Paper
	// - C = Scissors

	// rules:
	// - Rock defeats Scissors,
	// - Scissors defeats Paper,
	// - and Paper defeats Rock.
	// - If both players choose the same shape, the round instead ends in a draw.

	// scores per round:
	// - 1 for Rock
	// - 2 for Paper
	// - 3 for Scissors
	// - 0 if you lost
	// - 3 if the round was a draw
	// - 6 if you won

	scorePlayer1 += getScoreForShape( player1 );
	scorePlayer2 += getScoreForShape( player2 );

	const isDraw = player1 === player2;
	const isPlayer1Winner = isFirstShapeWinning( player1, player2 );
	const isPlayer2Winner = isFirstShapeWinning( player2, player1 );

	if ( isDraw ) {
		scorePlayer1 += 3;
		scorePlayer2 += 3;
	}

	if ( isPlayer1Winner ) {
		scorePlayer1 += 6;
		scorePlayer2 += 0;
	}

	if ( isPlayer2Winner ) {
		scorePlayer1 += 0;
		scorePlayer2 += 6;
	}

	return [ scorePlayer1, scorePlayer2 ];
}

function decryptShapes( input, mapping ) {
	return input.map( ( [player1, player2] ) => {
		return [player1, mapping[player2]];
	})
}

const possibleMappings = [
	{ X: 'A', Y: 'B', Z: 'C' },
	{ X: 'A', Y: 'C', Z: 'B' },
	{ X: 'B', Y: 'A', Z: 'C' },
	{ X: 'B', Y: 'C', Z: 'A' },
	{ X: 'C', Y: 'A', Z: 'B' },
	{ X: 'C', Y: 'B', Z: 'A' },
];

const shapes = decryptShapes( normalizedInput, possibleMappings[0] );

const scores = shapes.map( playRockPaperScissors );

const [ _, scorePlayer2 ] = scores.reduce( ( [ accPlayer1, accPlayer2 ], [ scorePlayer1, scorePlayer2 ] ) => {
	return [ accPlayer1 + scorePlayer1, accPlayer2 + scorePlayer2 ];
}, [0, 0] );

const totalScore = scorePlayer2; //?

/* --------- Part B --------- */

module.exports = {
	getScoreForShape,
	isFirstShapeWinning,
	playRockPaperScissors,
	decryptShapes,
	possibleMappings,
};