module lilybook.data {
	'use strict';

	export interface ISheet {
		base: Parse.Object,
		id: string,
		firstPage: number,
		lastPage: number,
		pdfUrl?: string
	}
}