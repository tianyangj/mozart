module lilybook.component {

	class SelectComposerController {

		static $inject = [
			'$scope',
			'$location',
			'composerSvc'
		];

		constructor(
			private $scope,
			private $location,
			private composerSvc: lilybook.data.IComposerSvc
			) {
			this.$scope.$watch(() => {
				return this.composer;
			}, (newVal) => {
				if (newVal && newVal.id !== this.composerId) {
					this.composerId = newVal.id;
					this.$scope.$emit('selectComposerChanged', this.composerId);
				}
			});
			if (this.$location.search().composer) {
				this.loadData(this.$location.search().composer);
			}
		}

		onOpen() {
			if (!this.composerGroups) {
				return this.loadData();
			}
		}

		onChange() {
			this.$location.search('composer', this.composer.shortname);
		}

		loadData(querystring?) {
			return this.composerSvc.getComposers(0, 100).then((composers) => {
				var vm = {};
				'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => {
					vm[letter] = [];
				});
				composers.forEach((composer) => {
					vm[composer.shortname[0]].push(composer);
					if (querystring && composer.shortname === querystring) {
						this.composer = composer;
					}
				});
				Object.keys(vm).forEach((key) => {
					if (!vm[key].length) {
						delete vm[key];
					}
				});
				this.composerGroups = vm;
			});
		}

		composer;
		composerGroups;
		composerId;
	}

	function lbSelectComposerDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Composers</label>
        			<md-select
						ng-model="selectComposerCtrl.composer"
						ng-model-options="{trackBy: '$value.id'}"
						md-on-open="selectComposerCtrl.onOpen()"
						ng-change="selectComposerCtrl.onChange()">
						<md-option>All</md-option>
						<md-divider></md-divider>
						<md-optgroup label="{{letter}}" ng-repeat="(letter, composers) in selectComposerCtrl.composerGroups">
							<md-option ng-repeat="composer in composers" ng-value="{{composer}}">{{composer.fullname}}</md-option>
						 </md-optgroup>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectComposerController,
			controllerAs: 'selectComposerCtrl'
		};
	}

	module.directive('lbSelectComposer', lbSelectComposerDirective);
}