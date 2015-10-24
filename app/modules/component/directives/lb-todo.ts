module lilybook.component {

	class TodoController {

		static $inject = [
			'$scope',
			'$rootScope',
			'$state',
			'activitySvc'
		];

		constructor(
			private $scope,
			private $rootScope,
			private $state,
			private activitySvc: data.IActivitySvc
		) {
			this.onInit();
		}

		onClick() {
			console.log('clicked...', this.$scope.composition);
			this.activitySvc.create(
				data.ActivityType.Todo,
				this.$rootScope.user,
				this.$scope.composition,
				{ blah: 1 }
			).then((argume) => {
				console.log(argume);
			})
		}

		goHome() {
			this.$state.go('app.home');
		}

		onInit() {
			this.activitySvc.read(
				data.ActivityType.Todo,
				this.$rootScope.user,
				this.$scope.composition
			).then((activity) => {
				this.$scope.inTodo = !!activity;
				console.log(this.$scope.inTodo)
				console.log(this)
			})
		}
	}

	function lbTodoDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-button class="md-raised md-primary" ng-if="!todoCtrl.inTodo" ng-click="todoCtrl.onClick()">Add TODO</md-button>
				<md-button class="md-raised md-default" ng-if="todoCtrl.inTodo" ng-click="todoCtrl.goHome()">In TODO</md-button>
			`,
			scope: {
				composition: '='
			},
			controller: TodoController,
			controllerAs: 'todoCtrl'
		};
	}

	module.directive('lbTodo', lbTodoDirective);
}