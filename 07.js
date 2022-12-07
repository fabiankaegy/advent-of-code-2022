const getInputValues = require('./helper/get-input-values');
const crypto = require('crypto');

const sampleInput = await getInputValues('7-sample');
const input = await getInputValues('7');

// cd means change directory
// - cd x moves in one level
// - cd .. moves out one level
// - cd / switches the current directory to the outermost directory, /

// ls means list
// - 123 abc means that the current directory contains a file named abc with size 123.
// - dir xyz means that the current directory contains a directory named xyz.

function generateFilesystemTreeFromOutput( outputLines ) {

	const tree = {
		id: 1,
		name: '/',
		children: [],
		parentId: null,
	};

	let currentDirectory = tree;

	// recursively find the parent directory given the id of the parent
	function findParentDirectory( currentDirectory, id ) {
		if (currentDirectory.id === id) {
			return currentDirectory;
		}

		if (! currentDirectory?.children?.length) {
			return null;
		}

		for (child of currentDirectory.children) {
			const parent = findParentDirectory(child, id);
			if (parent) {
				return parent;
			}
		}
	}
	
	function changeDirectory( to ) {
		switch (to) {
			case '/':
				currentDirectory = tree;
				break;
			case '..':
				currentDirectory = findParentDirectory(tree, currentDirectory.parentId);
				break;
			default:
				currentDirectory = currentDirectory.children.find(child => child.name === to);
		}
	}

	function executeCommand( name, argument = null ) {
		switch (name) {
			case 'cd':
				changeDirectory(argument);
				break;
			case 'ls':
				break;
			default:
				throw new Error(`Unknown command ${name}`);
		}
		
	}

	function addFile( name, size ) {
		currentDirectory.children.push({
			name,
			size: parseInt(size, 10),
		});
	}

	function addDirectory( name ) {
		currentDirectory.children.push({
			id: crypto.randomUUID(),
			name,
			children: [],
			parentId: currentDirectory.id,
		});
	}

	for (line of outputLines) {
		$isCommand = line.startsWith('$');
		if ($isCommand) {
			const [ _, commandName, argument ] = line.split(' ');
			executeCommand(commandName, argument);
			continue;
		}

		$isDirectory = line.startsWith('dir');
		if ($isDirectory) {
			const [ _, name ] = line.split(' ');
			addDirectory(name);
			continue;
		}

		const [size, name] = line.split(' ');
		addFile(name, size);
	}

	return tree;


}

function getAnswerPartA(input) {
	const fileTree = generateFilesystemTreeFromOutput(input); //?

	const directories = getFlatDirectories(fileTree); //?

	const sizes = directories.map(getSizeOfDirectory); //?

	const max = Math.max(...sizes); //?

	const sizesUnder100000 = sizes.filter(size => size < 100000); //?

	const sumOfSizesUnder100000 = sizesUnder100000.reduce((sum, size) => sum + size, 0); //?

	return sumOfSizesUnder100000;
}

const answerPartA = getAnswerPartA(input); //?

function getSizeOfDirectory( directory ) {
	let size = 0;
	for (child of directory.children) {
		if (child.size) {
			size += child.size;
		} else {
			size += getSizeOfDirectory(child);
		}
	}
	return size;
}

function getFlatDirectories( tree ) {
	let directories = [];
	for (child of tree.children) {
		if (child.size) {
			continue;
		}
		directories.push(child);
		directories = directories.concat(getFlatDirectories(child));
	}

	return directories;
}

function getAnswerPartB(input) {
	const fileTree = generateFilesystemTreeFromOutput(input); //?

	const directories = getFlatDirectories(fileTree); //?

	const sizes = directories.map(getSizeOfDirectory); //?

	const SIZE_REQUIRED = 30000000;
	const TOTAL_SIZE = 70000000;
	const OCUPIED_SIZE = getSizeOfDirectory(fileTree);
	const AVAILABLE_SPACE = TOTAL_SIZE - OCUPIED_SIZE;
	const THRESHOLD = SIZE_REQUIRED - AVAILABLE_SPACE;

	const sizesOverThreshold = sizes.filter(size => size > THRESHOLD); //?

	const min = Math.min(...sizesOverThreshold); //?

	return min;

}

const answerPartB = getAnswerPartB(input); //?

module.exports = {
	sampleInput,
	input,
	getAnswerPartA,
	getAnswerPartB,
};
