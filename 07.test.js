import { expect, test } from 'vitest';
import { sampleInput, getAnswerPartA, getAnswerPartB } from './07.js';

test("getAnswerPartA", () => {
	expect(getAnswerPartA(sampleInput)).toBe(95437);
});

test("getAnswerPartB", () => {
	expect(getAnswerPartB(sampleInput)).toBe(24933642);
});