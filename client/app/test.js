function MyCtrl($scope) {
  $scope.foo = "me";
}


angular.module('test', []).directive('foobar', function factory() {

  return {
    link:function postLink($scope, iElement, iAttrs) {
      var el = iElement;

      $scope.mytext = "unknown";
      $scope.change = function () {
        if ($scope.mytext == "changed") {
          $scope.mytext = 'back';
          $('#foo1', el).slideDown();
        } else {
          $scope.mytext = 'changed';
          $('#foo1', el).slideUp();
        }
      }
      console.log(arguments);
    }
  };
});