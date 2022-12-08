const getInputValues = require('./helper/get-input-values');

const sampleInput = await getInputValues('8-sample');
const input = await getInputValues('8');

function normalizeInput(input) {
	return input.map(line => line.split('').map(char => parseInt(char, 10)));
}

function getAllTreesInColumn( treeMap, columnIndex ) {
	const trees = [];

	treeMap.forEach((row) => {
		trees.push( row[columnIndex] );
	});

	return trees;
}

function getVisibleTrees( treeMap ) {
	const visibleTrees = [];

	treeMap.forEach((row, rowIndex) => {
		row.forEach((tree, treeIndex) => {
			
			const isEdgeTree = rowIndex === 0 || rowIndex === treeMap.length - 1 || treeIndex === 0 || treeIndex === row.length - 1;

			if ( isEdgeTree ) {
				visibleTrees.push( tree );
				return;
			}

			const treesInColumn = getAllTreesInColumn(treeMap, treeIndex);
			const treesAbove = treesInColumn.slice(0, rowIndex);
			const treesBelow = treesInColumn.slice(rowIndex + 1);

			const treesToTheLeft = row.slice(0, treeIndex);
			const treesToTheRight = row.slice(treeIndex + 1);

			const isTallerThanTreesAbove = treesAbove.every(t => t < tree);
			const isTallerThanTreesBelow = treesBelow.every(t => t < tree);
			const isTallerThanTreesToTheLeft = treesToTheLeft.every(t => t < tree);
			const isTallerThanTreesToTheRight = treesToTheRight.every(t => t < tree);

			if ( isTallerThanTreesAbove || isTallerThanTreesBelow || isTallerThanTreesToTheLeft || isTallerThanTreesToTheRight ) {
				visibleTrees.push( tree );
			}

		});
	} );

	return visibleTrees;
}

function getAnswerPartA(input) {
	return getVisibleTrees(input).length;
}

const normalizedInput = normalizeInput(sampleInput);
const answerPartA = getAnswerPartA(normalizedInput); //?

function getAnswerPartB(input) {
	
}

const answerPartB = getAnswerPartB(normalizedInput); //?

module.exports = {
	sampleInput,
	input,
	normalizeInput,
	getAnswerPartA,
	getAnswerPartB,
};