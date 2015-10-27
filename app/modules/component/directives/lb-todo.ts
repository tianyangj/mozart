namespace lilybook.component {

	class TodoController {

		composition: data.IComposition;
		todo: data.IActivity;
		user: data.IUser;
		ready = false;

		static $inject = [
			'activitySvc',
			'userSvc'
		];

		constructor(
			private activitySvc: data.IActivitySvc,
			private userSvc: data.IUserSvc
		) {
			this.user = userSvc.current();
			this.onInit();
		}

		onAdd() {
			if (this.user) {
				this.activitySvc.create(
					data.ActivityType.Todo,
					this.userSvc.current(),
					this.composition,
					{ progress: 0 }
				).then((activity) => {
					this.todo = activity;
				})
			}
		}

		onInit() {
			this.activitySvc.read(
				data.ActivityType.Todo,
				this.userSvc.current(),
				this.composition
			).then((activity) => {
				this.ready = true;
				this.todo = activity;
			})
		}
	}

	function lbTodoDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-button 
					class="md-raised md-primary" 
					ng-if="!todoCtrl.todo && todoCtrl.ready"
					ng-disabled="!todoCtrl.user"
					ng-click="todoCtrl.onAdd()">
					Add TODO
				</md-button>
				<md-button 
					class="md-raised md-default" 
					ng-if="todoCtrl.todo" 
					ui-sref="app.home">
					In Progress ({{todoCtrl.todo.meta.progress}}%)
				</md-button>
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