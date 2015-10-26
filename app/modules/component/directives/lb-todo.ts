module lilybook.component {

	class TodoController {

		composition: data.IComposition;
		todoState = 'Unknown';

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
				{ blah: 1 }
			).then((argume) => {
				console.log(argume);
			})
		}

		onInit() {
			this.activitySvc.read(
				data.ActivityType.Todo,
				this.userSvc.current(),
				this.composition
			).then((activity) => {
				this.todoState = activity ? 'In' : 'Out';
			})
		}
	}

	function lbTodoDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-button class="md-raised md-primary" ng-if="todoCtrl.todoState === 'Out'" ng-click="todoCtrl.onAdd()">Add TODO</md-button>
				<md-button class="md-raised md-default" ng-if="todoCtrl.todoState === 'In'" ui-sref="app.home">In TODO</md-button>
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