namespace lilybook.component {

	class SliderDifficultyController {

		composition: data.IComposition;
		mine: data.IActivity;
		all: data.IActivity[];
		user: data.IUser;
		ready = false;

		static $inject = [
			'$q',
			'activitySvc',
			'userSvc'
		];

		constructor(
			private $q: ng.IQService,
			private activitySvc: data.IActivitySvc,
			private userSvc: data.IUserSvc
		) {
			this.user = userSvc.current();
			this.onInit();
		}

		onChange() {
			if (this.user) {
				this.activitySvc.update(
					data.ActivityType.Difficulty,
					this.user,
					this.composition,
					{ difficulty: this.mine.meta.difficulty }
				).then((difficulty) => {
					this.mine = difficulty;
				});
			}
		}

		onInit() {
			this.$q.all([
				this.activitySvc.read(
					data.ActivityType.Difficulty,
					this.user,
					this.composition
				),
				this.activitySvc.list(
					data.ActivityType.Difficulty,
					this.composition
				)
			]).then((results) => {
				this.ready = true;
				this.mine = <data.IActivity>results[0];
				this.all = <data.IActivity[]>results[1];
			})
		}
	}

	function lbSliderDifficultyDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<div class="md-padding">
					<h4>On a scale of 1 to 10 (1 being easiest and 10 being hardest), how hard do you think this composition is?</h4>
					<div layout="row" layout-align="center center">
						<md-slider flex
							class="md-default"
							md-discrete
							ng-model="vm.mine.meta.difficulty"
							ng-change="vm.onChange()"
							ng-disabled="!vm.user"
							step="1"
							min="1"
							max="10"
							aria-label="Difficulty Slider">
						</md-slider>
						<span class="md-padding" ng-if="vm.mine.updatedAt">(rated on {{vm.mine.updatedAt | date}})</span>
					</div>
				</div>
			`,
			scope: {
				composition: '='
			},
			controller: SliderDifficultyController,
			controllerAs: 'vm',
			bindToController: true
		};
	}

	module.directive('lbSliderDifficulty', lbSliderDifficultyDirective);
}