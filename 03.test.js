import { expect, test } from 'vitest';
import { normalizeInput, isUppercase, getValueOfItem, getSharedItems, groupRucksacksInPairOfThree } from './03.js';

test('normalizeInput', () => {
	expect(normalizeInput([
		'12345678',
		'abcdefghij',
	])).toEqual([
		[['1', '2', '3', '4'], ['5', '6', '7', '8']],
		[['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'j']],
	]);
});

test('isUppercase', () => {
	expect(isUppercase('a')).toBe(false);
	expect(isUppercase('A')).toBe(true);
});

test('getValueOfItem', () => {
	expect(getValueOfItem('a')).toBe(1);
	expect(getValueOfItem('A')).toBe(27);
	expect(getValueOfItem('b')).toBe(2);
	expect(getValueOfItem('B')).toBe(28);
	expect(getValueOfItem('z')).toBe(26);
	expect(getValueOfItem('Z')).toBe(52);
});

test('getSharedItems', () => {
	expect(getSharedItems([['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'j']])).toEqual([]);
	expect(getSharedItems([['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'a']])).toEqual(['a']);
	expect(getSharedItems([['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'a', 'b']])).toEqual(['a', 'b']);
});

test('groupRucksacksInPairOfThree', () => {
	expect(groupRucksacksInPairOfThree([
		[],
		[],
		[],
		[],
		[],
		[],
	])).toEqual([
		[[], [], []],
		[[], [], []],
	]);
});