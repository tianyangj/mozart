module lilybook.component {

	class TodoController {

		composition: data.IComposition;
		activity: data.IActivity;
		ready = false;

		static $inject = [
			'activitySvc',
			'userSvc'
		];

		constructor(
			private activitySvc: data.IActivitySvc,
			private userSvc: data.IUserSvc
		) {
			this.onInit();
		}

		onAdd() {
			this.activitySvc.create(
				data.ActivityType.Todo,
				this.userSvc.current(),
				this.composition,
				{ progress: 0 }
			).then((activity) => {
				this.activity = activity;
			})
		}

		onInit() {
			this.activitySvc.read(
				data.ActivityType.Todo,
				this.userSvc.current(),
				this.composition
			).then((activity) => {
				this.ready = true;
				this.activity = activity;
			})
		}
	}

	function lbTodoDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-button class="md-raised md-primary" ng-if="!todoCtrl.activity && todoCtrl.ready" ng-click="todoCtrl.onAdd()">Add TODO</md-button>
				<md-button class="md-raised md-default" ng-if="todoCtrl.activity" ui-sref="app.home">In Progress ({{todoCtrl.activity.meta.progress}}%)</md-button>
			`,
			scope: {
				composition: '='
			},
			controller: TodoController,
			controllerAs: 'todoCtrl',
			bindToController: true
		};
	}

	module.directive('lbTodo', lbTodoDirective);
}