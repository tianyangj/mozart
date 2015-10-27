namespace lilybook.component {

	class LikeController {

		composition: data.IComposition;
		like: data.IActivity;
		user: data.IUser;
		total = 0;
		tooltip = 'Login to Like';
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

		onLike() {
			if (this.user) {
				if (this.like) {
					this.activitySvc.delete(
						data.ActivityType.Like,
						this.user,
						this.composition
					).then(() => {
						this.like = null;
						this.tooltip = 'I like this';
						this.total--;
					});
				} else {
					this.activitySvc.create(
						data.ActivityType.Like,
						this.user,
						this.composition
					).then((like) => {
						this.like = like;
						this.tooltip = 'Unlike';
						this.total++;
					});
				}
			}
		}

		onInit() {
			this.$q.all([
				this.activitySvc.read(
					data.ActivityType.Like,
					this.userSvc.current(),
					this.composition
				),
				this.activitySvc.count(
					data.ActivityType.Like,
					this.composition
				)
			]).then((results) => {
				this.ready = true;
				this.like = <data.IActivity>results[0];
				this.total = <number>results[1];
				if (this.user) {
					this.tooltip = this.like ? 'Unlike' : 'I like this';
				}
			});
		}
	}

	function lbLikeDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-button
					aria-label="Like"
					class="md-icon-button"
					ng-class="{'md-accent':likeCtrl.like}"
					ng-if="likeCtrl.ready"
					ng-click="likeCtrl.onLike()"
					style="width:auto;padding-left:6px;">
					<md-tooltip md-delay="0">{{likeCtrl.tooltip}}</md-tooltip>
					<md-icon md-svg-src="assets/svg/ic_thumb_up.svg"></md-icon>
					<span>{{likeCtrl.total}}</span>
				</md-button>
			`,
			scope: {
				composition: '='
			},
			controller: LikeController,
			controllerAs: 'likeCtrl',
			bindToController: true
		};
	}

	module.directive('lbLike', lbLikeDirective);
}