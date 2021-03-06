namespace lilybook.data {

	export class MapperSvc {

		static composerMapper(composer: Parse.Object): IComposer {
			return {
				base: composer,
				id: composer.id,
				fullname: composer.get('fullName'),
				shortname: composer.get('shortName'),
				bio: composer.get('description'),
				vanity: composer.get('vanity'),
				image: composer.get('image') ? composer.get('image').url() : null
			};
		}

		static compositionMapper(composition: Parse.Object): IComposition {
			return {
				base: composition,
				id: composition.id,
				title: composition.get('title'),
				description: composition.get('description'),
				vanity: composition.get('vanity'),
				catalogue: composition.get('catalogue'),
				number: composition.get('number'),
				wikipedia: composition.get('wikipedia'),
				imslp: composition.get('imslp'),
				rcm: composition.get('rcm') ? MapperSvc.rcmMapper(composition.get('rcm')) : null,
				video: composition.get('video'),
				key: composition.get('key') && composition.get('key').get('name'),
				type: composition.get('type') && composition.get('type').get('name'),
				composer: composition.get('composer') ? MapperSvc.composerMapper(composition.get('composer')) : null,
				order: composition.get('order')
			};
		}

		static userMapper(user: Parse.User): IUser {
			return user ? {
				base: user,
				id: user.id,
				email: user.get('email'),
				firstname: user.get('firstname'),
				lastname: user.get('lastname')
			} : null;
		}

		static videoMapper(video: Parse.Object): IVideo {
			return {
				base: video,
				id: video.id,
				embed: video.get('embed'),
				source: video.get('source'),
				sourceId: video.get('sourceId'),
				title: video.get('title')
			};
		}

		static sheetMapper(sheet: Parse.Object): ISheet {
			return {
				base: sheet,
				id: sheet.id,
				firstPage: sheet.get('firstPage'),
				lastPage: sheet.get('lastPage'),
				pdfUrl: sheet.get('pdf') ? sheet.get('pdf').url() : null
			};
		}

		static rcmMapper(rcm: Parse.Object): IDifficulty {
			return {
				base: rcm,
				id: rcm.id,
				name: rcm.get('name'),
				value: rcm.get('value'),
				certificate: rcm.get('certificate')
			};
		}

		static activityMapper(activity: any): IActivity {
			return activity ? {
				base: activity,
				id: activity.id,
				type: activity.get('type'),
				fromUser: activity.get('fromUser'),
				composition: activity.get('composition'),
				createdAt: activity.createdAt,
				updatedAt: activity.updatedAt,
				meta: activity.get('meta')
			} : null;
		}
	}
}