import { expect, test } from 'vitest';

import { sampleInput, getAnswerPartA, normalizeInput, isOneRangeContainedInOther, getAnswerPartB, isRangeOverlapping } from './04.js';

test('normalizeInput', () => {
	expect(normalizeInput([
		'15-28,15-28',
		'1-2,2-53'
	])).toEqual([
		[[15, 28], [15, 28]],
		[[1, 2], [2, 53]],
	]);
});

test('isOneRangeContainedInOther', () => {
	expect(isOneRangeContainedInOther([1, 2], [1, 2])).toBe(true);
	expect(isOneRangeContainedInOther([1, 2], [1, 3])).toBe(true);
	expect(isOneRangeContainedInOther([1, 9], [6, 7])).toBe(true);
	expect(isOneRangeContainedInOther([1, 999], [552, 643])).toBe(true);
	expect(isOneRangeContainedInOther([552, 643], [1, 999])).toBe(true);
	expect(isOneRangeContainedInOther([1, 2], [2, 3])).toBe(false);
	expect(isOneRangeContainedInOther([1, 2], [3, 4])).toBe(false);
	expect(isOneRangeContainedInOther([1, 2], [0, 1])).toBe(false);
	expect(isOneRangeContainedInOther([1, 2], [0, 0])).toBe(false);
});

test('getAnswerPartA', () => {
	const normalizedInput = normalizeInput(sampleInput);
	expect(getAnswerPartA(normalizedInput)).toBe(2);
} );

test('isRangeOverlapping', () => {
	expect(isRangeOverlapping([1, 2], [1, 2])).toBe(true);
	expect(isRangeOverlapping([1, 2], [1, 3])).toBe(true);
	expect(isRangeOverlapping([1, 9], [6, 7])).toBe(true);
	expect(isRangeOverlapping([1, 999], [552, 643])).toBe(true);
	expect(isRangeOverlapping([552, 643], [1, 999])).toBe(true);
	expect(isRangeOverlapping([1, 2], [2, 3])).toBe(true);
	expect(isRangeOverlapping([1, 2], [3, 4])).toBe(false);
	expect(isRangeOverlapping([1, 2], [0, 1])).toBe(true);
	expect(isRangeOverlapping([1, 2], [0, 0])).toBe(false);
});

test('getAnswerPartB', () => {
	const normalizedInput = normalizeInput(sampleInput);
	expect(getAnswerPartB(normalizedInput)).toBe(4);
});