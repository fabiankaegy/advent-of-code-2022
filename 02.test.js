import { expect, test } from 'vitest';
import { 
	getScoreForShape,
	isFirstShapeWinning,
	playRockPaperScissors,
	decryptShapes,
	possibleMappings,
 } from './02.js';


test('getScoreForShape', () => {
	expect(getScoreForShape('A')).toBe(1);
	expect(getScoreForShape('B')).toBe(2);
	expect(getScoreForShape('C')).toBe(3);
});

test('isFirstShapeWinning', () => {
	expect(isFirstShapeWinning('A', 'C')).toBe(true);
	expect(isFirstShapeWinning('B', 'A')).toBe(true);
	expect(isFirstShapeWinning('C', 'B')).toBe(true);

	expect(isFirstShapeWinning('A', 'B')).toBe(false);
	expect(isFirstShapeWinning('B', 'C')).toBe(false);
	expect(isFirstShapeWinning('C', 'A')).toBe(false);

	expect(isFirstShapeWinning('A', 'A')).toBe(false);
	expect(isFirstShapeWinning('B', 'B')).toBe(false);
	expect(isFirstShapeWinning('C', 'C')).toBe(false);
});

test('playRockPaperScissors', () => {
	expect(playRockPaperScissors(['A', 'C'])).toEqual([7, 3]);
	expect(playRockPaperScissors(['B', 'A'])).toEqual([8, 1]);
	expect(playRockPaperScissors(['C', 'B'])).toEqual([9, 2]);

	expect(playRockPaperScissors(['A', 'B'])).toEqual([1, 8]);
	expect(playRockPaperScissors(['B', 'C'])).toEqual([2, 9]);
	expect(playRockPaperScissors(['C', 'A'])).toEqual([3, 7]);

	expect(playRockPaperScissors(['A', 'A'])).toEqual([4, 4]);
	expect(playRockPaperScissors(['B', 'B'])).toEqual([5, 5]);
	expect(playRockPaperScissors(['C', 'C'])).toEqual([6, 6]);
});

test('decryptShapes', () => {

	const mapping = {
		X: 'A',
		Y: 'B',
		Z: 'C',
	};

	expect(decryptShapes([
		['A', 'X'],
		['B', 'Y'],
		['C', 'Z'],
	], mapping)).toEqual([
		['A', 'A'],
		['B', 'B'],
		['C', 'C'],
	]);

});
