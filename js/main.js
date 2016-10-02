angular.module("ToDoListApp", [])

.factory('ListUtility', function(ListData){
	return {
		addItem: addItem,
		remove: remove,
		searchItem: ''
	};

	function addItem(item) {
		ListData.push(item);
	}

	function remove(i){
		ListData.splice(i,1);

	}

})

.factory ('ListData', function() {
	return [
		{
			item:"To-DO list item #1"
		}, 
		{
			item:"To do list"
		}					
	];
})

.controller('listCtrl', function($scope, ListData) {
	$scope.items = ListData;
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

.controller('removeItem', function($scope, ListUtility) {

	$scope.removeItem = function(i) {
		ListUtility.remove(i);
	}
})	

.directive('toDoListArray', ['ListUtility', function(ListUtility) {

	function controller($scope, ListUtility) {
		$scope.x = ListUtility;
	}

	return {
		restrict: 'E',
		template: "<div class='col-md-2 contactCard' ng-repeat='item in dataset | filter:x.searchItem' ng-click='removeItem($index)'><h4>{{item.item}}</h4></div>",
		scope: {
			dataset: '='
		},
		controller: controller,
		link: function(scope, element, attrs){
			scope.removeItem = function(i) {
			ListUtility.remove(i);
			}
      	}
		// templateUrl: 'list-item.html'
	}
}])

;