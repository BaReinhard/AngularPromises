app.controller('HomeController',[ '$scope','$http','$q','$timeout',function($scope,$http,$q,$timeout){
// Practicing Promises
    var promises = [];
    function AsyncCallBack(msec,text) {
        var defer = $q.defer();
        $timeout(function () {
            defer.resolve();
            PrintWhenDone(text);
        },msec)

        return defer.promise
    }
    function PrintWhenDone(text) {
        console.log(text);
    }
    

    // Fourth to Return
    promises.push(AsyncCallBack(3000, "First CallBack Done"));

    // Third to Return
    promises.push(AsyncCallBack(2500, "Second CallBack Done"));

    // Second to Return
    promises.push(AsyncCallBack(400, "Third Callback Done").then(function(){
        PrintWhenDone("Creating a new Promise after Third CallBack");
        promises.push(AsyncCallBack(4000, "Call back created in Third Call Back Then Function").then(PrintWhenDone.bind(null, "is this confusing enough yet")));
    }));
    // Fifth to Return
    promises.push(AsyncCallBack(10000, "Fourth Callback Done").then(PrintWhenDone.bind(null,"Fourth Call Back then Function")));

    // First to Return
    promises.push(AsyncCallBack(100, "Fifth Callback Done"));

    // Last to Return
    promises.push(AsyncCallBack(11000, "Sixth Callback Done"));

    // When all Promises have resolved
    $q.all(promises).then(function () {
        console.log("All Callbacks have finished");
    })
}]);


