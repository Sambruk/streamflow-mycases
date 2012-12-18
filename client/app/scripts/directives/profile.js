(function() {
  angular.module('sf.directives.profile', []).directive('profile', function factory() {
    var el;

    var startSpinner = function() {
      $scope.SpinnerDiv = "spinner";
      $('#postfeedback').show().text("Skickar");
      $('#profile-save-button, #profile-reset-button').attr("disabled", "disabled");
    };

    var stopSpinner = function() {

      $scope.SpinnerDiv = "hide";

      $('#postfeedback').show().text("");
      $('#profile-save-button, #profile-reset-button').removeAttr("disabled");

    };


    var controller = function ($scope) {
      console.log("CONTROLLER CALLED !");
      $scope.mytext = "unknown2";
      $scope.change = function () {
        $scope.mytext = ($scope.mytext == "changed") ? 'back2' : 'changed2';
        el.hide();
      }
    };

    var directiveDefinitionObject = {
      controller: controller,
      link:function postLink(scope, iElement, iAttrs) {
        el = iElement;
        console.log(arguments);
      }
    };
    return directiveDefinitionObject;
  });
})();
