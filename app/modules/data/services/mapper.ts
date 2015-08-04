module lilybook.data {
	'use strict';

	export class MapperSvc {

		static composerMapper(composer: Parse.Object) {
			return <IComposer>{
				base: composer,
				id: composer.id,
				fullname: composer.get('fullName'),
				shortname: composer.get('shortName'),
				bio: composer.get('description'),
				vanity: composer.get('vanity'),
				image: composer.get('image') ? composer.get('image').url() : null
			};
		}

		static compositionMapper(composition: Parse.Object) {
			return <IComposition>{
				base: composition,
				id: composition.id,
				title: composition.get('title'),
				description: composition.get('description'),
				vanity: composition.get('vanity'),
				catalogue: composition.get('catalogue'),
				number: composition.get('number'),
				instrumentation: composition.get('instrumentation'),
				wikipedia: composition.get('wikipedia'),
				imslp: composition.get('imslp'),
				rcm: composition.get('rcm'),
				abrsm: composition.get('abrsm'),
				henle: composition.get('henle'),
				key: composition.get('key') && composition.get('key').get('name'),
				type: composition.get('type') && composition.get('type').get('name'),
				composer: composition.get('composer') ? MapperSvc.composerMapper(composition.get('composer')) : null
			};
		}

		static userMapper(user: Parse.User) {
			return <IUser>{
				base: user,
				id: user.id,
				email: user.get('email'),
				firstname: user.get('firstname'),
				lastname: user.get('lastname')
			};
		}

		static videoMapper(video: Parse.Object) {
			return <IVideo>{
				base: video,
				id: video.id,
				embed: video.get('embed'),
				source: video.get('source'),
				sourceId: video.get('sourceId'),
				title: video.get('title')
			};
		}

		static sheetMapper(sheet: Parse.Object) {
			return <ISheet>{
				base: sheet,
				id: sheet.id,
				firstPage: sheet.get('firstPage'),
				lastPage: sheet.get('lastPage'),
				pdfUrl: sheet.get('pdf') ? sheet.get('pdf').url() : null
			};
		}
	}
}