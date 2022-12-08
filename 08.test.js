import { expect, test } from 'vitest';
import { sampleInput, normalizeInput, getAnswerPartA, getAnswerPartB } from './08.js';

test("getAnswerPartA", () => {
	const normalizedInput = normalizeInput(sampleInput);
	expect(getAnswerPartA(normalizedInput)).toBe(21);
});

test("getAnswerPartB", () => {
	const normalizedInput = normalizeInput(sampleInput);
	expect(getAnswerPartB(normalizedInput)).toBe(8);
});