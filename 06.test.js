import { expect, test } from 'vitest';
import { sampleInput, getAnswerPartA, getAnswerPartB } from './06.js';

test("getAnswerPartA", () => {
	expect(getAnswerPartA(sampleInput[0])).toBe(7);
	expect(getAnswerPartA(sampleInput[1])).toBe(5);
	expect(getAnswerPartA(sampleInput[2])).toBe(6);
	expect(getAnswerPartA(sampleInput[3])).toBe(10);
	expect(getAnswerPartA(sampleInput[4])).toBe(11);
});

test("getAnswerPartB", () => {
	expect(getAnswerPartB(sampleInput[0])).toBe(19);
	expect(getAnswerPartB(sampleInput[1])).toBe(23);
	expect(getAnswerPartB(sampleInput[2])).toBe(23);
	expect(getAnswerPartB(sampleInput[3])).toBe(29);
	expect(getAnswerPartB(sampleInput[4])).toBe(26);
});