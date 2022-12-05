const getInputValues = require('./helper/get-input-values');

const sampleInput = await getInputValues('5-sample');
const input = await getInputValues('5');

function getInstruction(step) {

	// format:
	// "move 1 from 2 to 1"

	const [instruction, amount, , from, , to] = step.split(' ');

	return {
		instruction,
		amount: Number(amount),
		from: Number(from),
		to: Number(to)
	};

}

function getCratesInColumn(line) {
	const crates = [];

	const characters = line.split('');
	const length = characters.length;

	// get characters from this input: "[Z] [M] [P]"
	for (let index = 1; index < length; index += 4) {
		const character = characters[index];

		crates.push(character);
	}

	return crates;
}

function getColumns(lines) {
	const columns = [];

	lines.forEach((line, index) => {
		line.forEach((crate, index) => {
			if (!columns[index]) {
				columns[index] = [];
			}

			if (crate === ' ') {
				return;
			}
			columns[index].push(crate);
		})
	})

	return columns;
}

function normalizeInput(input) {
	const drawingLines = [];
	const steps = [];

	let isDrawingLines = true;
	input.forEach(line => {
		if (isDrawingLines) {
			if (line === '') {
				isDrawingLines = false;
				return;
			}

			drawingLines.push(line);
		} else {
			steps.push(line);
		}
	});

	const drawingLineColumns = drawingLines.map(line => getCratesInColumn(line));

	// remove last item from drawingLineColumns
	drawingLineColumns.pop();

	const columns = getColumns(drawingLineColumns);

	return {
		columns: columns,
		instructions: steps.map(getInstruction)
	};
}

function getLetterOfFirstCrateInColumns(columns) {
	return columns.map(column => column[0]).join('');
}

function getAnswerPartA(input) {
	const finalColumns = executeInstructions(input.instructions, input.columns);
	return getLetterOfFirstCrateInColumns(finalColumns);

}

function executeInstructions(instructions, columns, isOneByOne = true) {

	for (let index = 0; index < instructions.length; index++) {
		const instruction = instructions[index];

		const { amount, from, to } = instruction;

		// get the crates to move from the from column
		let cratesToMove = columns[from - 1].slice(0, amount);
		// remove crates from the from column
		columns[from - 1] = columns[from - 1].slice(amount);

		// reverse the crates if we are moving them one by one
		if (isOneByOne) {
			cratesToMove = cratesToMove.reverse();
		}

		// prepend cratesToMove to the target column
		columns[to - 1] = [...cratesToMove, ...columns[to - 1]];

	}

	return columns;
}


const normalizedInput = normalizeInput(input);
getAnswerPartA(normalizedInput); //? 


/* --------- Part B --------- */

function getAnswerPartB(input) {
	const finalColumns = executeInstructions(input.instructions, input.columns, false);
	return getLetterOfFirstCrateInColumns(finalColumns);
}

getAnswerPartB(normalizedInput); //? 


module.exports = {
	sampleInput,
	input,
	normalizeInput,
	getAnswerPartA,
	getInstruction,
	getCratesInColumn,
	getColumns,
	getAnswerPartB,
};