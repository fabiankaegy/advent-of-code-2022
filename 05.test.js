import { expect, test } from 'vitest';
import { sampleInput, getAnswerPartA, normalizeInput, getInstruction, getCratesInColumn, getColumns, getAnswerPartB } from './05.js';

test("getAnswerPartA", () => {
  const normalizedInput = normalizeInput(sampleInput);
  expect(getAnswerPartA(normalizedInput)).toBe('CMZ');
});

test("getInstruction", () => {
	expect(getInstruction('move 1 from 2 to 1')).toEqual({
		instruction: 'move',
		amount: 1,
		from: 2,
		to: 1
	});
});

test("getCratesInColumn", () => {
	expect(getCratesInColumn('[Z] [M] [P]')).toEqual(['Z', 'M', 'P']);
	expect(getCratesInColumn('[Z] [M] [P] [C]')).toEqual(['Z', 'M', 'P', 'C']);
	expect(getCratesInColumn('[Z] [M] [P] [C] [X]')).toEqual(['Z', 'M', 'P', 'C', 'X']);
	expect(getCratesInColumn('    [M] [P] [C]     [Y]')).toEqual([' ', 'M', 'P', 'C', ' ', 'Y']);
});

test("getColumns", () => {
	expect(getColumns([['Z', 'M', ' '], ['C', 'X', 'P']])).toEqual([
		['Z', 'C'],
		['M', 'X'],
		['P']
	]);
} );

test("getAnswerPartB", () => {
	const normalizedInput = normalizeInput(sampleInput);
	expect(getAnswerPartB(normalizedInput)).toBe('MCD');
});