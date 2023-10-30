export class Utils {
	static formatArray(array: string[]) {
		if (!Array.isArray(array)) {
			return array;
		}

		if (array.length > 1) {
			return `${array.slice(0, -1).join(', ')} and ${array[array.length-1]}`;
		}

		return array[0];
	}
    
	static ellipseString(text: string, limit: number) {
		if (text.length < limit) return text;
		return `${text.slice(0, limit)}...`;
	}

	static getRandomNumber(max: number) {
		return Math.floor(Math.random() * max) + 1;
	}
}