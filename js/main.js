angular.module("ToDoListApp", [])

.factory('ListUtility', function($rootScope, ListData){
	return {
		addItem: addItem,
		clearAll: clearAll,
		searchItem: ''
	};

	function addItem(item) {
		item.completed = false;
		ListData.push(item);
	}

	function clearAll() {
		ListData = ListData.filter(function(x) {
			return !x.completed;
		});

		console.log(ListData);

		$rootScope.$broadcast("clear:all", {
			data: ListData
		});
	}

})

.factory ('ListData', function() {
	return [
		{
			item:"To-do list item #1",
			completed: false
		}, 
		{
			item:"To-do list item #2",
			completed: false
		}					
	];
})

.controller('listCtrl', function($rootScope, $scope, ListData, ListUtility) {
	$scope.items = ListData;

	$rootScope.$on("clear:all", function(e, args) {
		console.log(e, args);
		
		$scope.items = args.data;
	});

	$scope.clearAll = function() {
		ListUtility.clearAll();
	}
})

.controller('AddItemCtrl', function($scope, ListUtility) {
	$scope.newitem = {};

	$scope.saveItem = function() {

		ListUtility.addItem($scope.newitem);
		$scope.newitem={};
	}
})

.controller('searchItem', function($scope, ListUtility) {
	$scope.$watch('x', function(newVal, oldVal) {
		ListUtility.searchItem = newVal;
	})
})

.directive('toDoListArray', ['ListUtility', function(ListUtility) {
	var tpl = [
	"<div class='col-md-12 contactCard' ng-class='{complete: item.completed}' ng-repeat='item in dataset | filter:x.searchItem' ng-click='completeItem(item)'>",
		"<h4>{{item.item}}</h4>",
	"</div>"
	].join('');

	function controller($scope, ListUtility) {
		$scope.x = ListUtility;

		$scope.completeItem = function(item) {
			item.completed = !item.completed;
		};
	}

	return {
		restrict: 'E',
		template: tpl,
		scope: {
			dataset: '='
		},
		controller: controller,
		link: function(scope, element, attrs){
		 	// scope.removeItem = function(i) {
		 	// ListUtility.remove(i);
		 	// }
			
       	}
	}
}])

;