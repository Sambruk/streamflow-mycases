// from https://groups.google.com/forum/?fromgroups=#!topic/angular/eUEVKUsif8U
function appWindow() {
  return document.getElementsByTagName('iframe')[0].contentWindow;
}
function appAngular() {
  return appWindow().angular;
}

function expectToBe(self,future,expected,timeoutOptionalArgument) {
  var timeout = timeoutOptionalArgument || 5000;
  expect(self.addFuture(future.name +' should be "'+expected+ '" with timeout '+timeout, function(done) {
    var startTime = new Date().getTime();

    var retryingDone = function(error,result){
      console.log(['Result:',error,result]);
      if (error) {
        done(error,"no result!")
      } else if (result==expected) {
        // here we need the original matcher
        done(null,result)
      } else if (new Date().getTime()<startTime+timeout){
        setTimeout(function (){
          future.behavior(retryingDone);
        },500);
      } else {
        done(error,result);
      }
    };

    future.behavior(retryingDone);

  })).toBe(expected);
}
