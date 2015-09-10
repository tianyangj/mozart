module lilybook.component {
	'use strict';

	class SelectComposerController {

		static $inject = [
			'$scope',
			'composerSvc'
		];

		constructor(
			private $scope,
			private composerSvc: lilybook.data.IComposerSvc
			) {
			this.$scope.$watch(() => {
				return this.composerId;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectComposerChanged', newVal);
				}
			});
		}

		loadComposers() {
			if (!this.composerGroups) {
				return this.composerSvc.getComposers(0, 100).then((composers) => {
					var vm = {};
					'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => {
						vm[letter] = [];
					});
					composers.forEach((composer) => {
						vm[composer.shortname[0]].push(composer);
					});
					Object.keys(vm).forEach((key) => {
						if (!vm[key].length) {
							delete vm[key];
						}
					});
					this.composerGroups = vm;
				});
			}
		}

		composerId;
		composerGroups;
	}

	function lbSelectComposerDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Composers</label>
        			<md-select ng-model="selectComposerCtrl.composerId" md-on-open="selectComposerCtrl.loadComposers()">
						<md-optgroup label="{{letter}}" ng-repeat="(letter, composers) in selectComposerCtrl.composerGroups">
							<md-option ng-repeat="composer in composers" value="{{composer.id}}">{{composer.fullname}}</md-option>
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