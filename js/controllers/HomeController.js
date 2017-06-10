app.controller('HomeController',[ '$scope','$http','$q','$timeout',function($scope,$http,$q,$timeout){
// Practicing Promises for better instruction
    var promises = [];
    function AsyncFunction(msec,text) {
        var defer = $q.defer();
        $timeout(function () {
           
            PrintWhenDone(text);
            $timeout(function () {

                defer.resolve();
            },100)
        },msec)

        return defer.promise
    }
    function PrintWhenDone(text) {
        var deferred = $q.defer();
        $timeout(function(){
            
            console.log(text);
            deferred.resolve();
        })
        return deferred.promise;
    }
    

    // Fourth to Return
    promises.push(AsyncFunction(3000, "First CallBack Done"));

    // Third to Return
    promises.push(AsyncFunction(2500, "Second CallBack Done"));

    // Second to Return
    promises.push(AsyncFunction(400, "Third Callback Done").then(function(){
        PrintWhenDone("Creating a new Promise after Third CallBack");
        promises.push(AsyncFunction(4000, "Call back created in Third Call Back Then Function").then(PrintWhenDone.bind(null, "is this confusing enough yet")));
    }));
    // Fifth to Return
    promises.push(AsyncFunction(10000, "Fourth Callback Done").then(PrintWhenDone.bind(null,"Fourth Call Back then Function")));

    // First to Return
    promises.push(AsyncFunction(100, "Fifth Callback Done"));

    // Last to Return
    promises.push(AsyncFunction(11000, "Sixth Callback Done"));



    // This is called CallBack Hell!
    $q.all(promises).then(function () {
        console.log("All Callbacks have finished");

        console.log("Now All Callbacks Sequentially")
        // First to Return
        promises.push(AsyncFunction(3000, "First CallBack Done"));
        $q.all(promises).then(function () {
            // Second to Return
            promises.push(AsyncFunction(2500, "Second CallBack Done"));
            $q.all(promises).then(function () {
                // Third to Return
                promises.push(AsyncFunction(400, "Third Callback Done").then(function () {
                    PrintWhenDone("Creating a new Promise after Third CallBack");
                    promises.push(AsyncFunction(4000, "Call back created in Third Call Back Then Function").then(PrintWhenDone.bind(null, "is this confusing enough yet")));
                }));
                $q.all(promises).then(function () {
                    // Fourth to Return
                    promises.push(AsyncFunction(10000, "Fourth Callback Done").then(PrintWhenDone.bind(null, "Fourth Call Back then Function")));
                    $q.all(promises).then(function () {
                        // Fifth to Return
                        promises.push(AsyncFunction(100, "Fifth Callback Done"));
                        $q.all(promises).then(function () {
                            // Sixth to Return
                            promises.push(AsyncFunction(11000, "Sixth Callback Done"));
                        })
                    })
                })
            })
        })
    })
   // A bit cleaner, not quite better
    //$q.all(promises).then(function(){
    //    AsyncFunction(30, "First CallBack Done").then(function(){
    //        AsyncFunction(25, "Second CallBack Done").then(function(){
    //            AsyncFunction(4, "Third Callback Done").then(function(){
    //                AsyncFunction(4, "Call back created in Third Call Back Then Function").then(function(){
    //                    PrintWhenDone("is this confusing enough yet").then(function(){
    //                        AsyncFunction(10,"Fourth Callback done").then(function(){
    //                            PrintWhenDone("Fourth Call Back then Function").then(function(){
    //                                AsyncFunction(10, "Fifth Callback Done").then(function(){
    //                                    AsyncFunction(11, "Sixth Callback Done").then(function(){
    //                                        PrintWhenDone("All Call Backs have finished");
    //                                    });
    //                                });
    //                            });
    //                        });
    //                    });
    //                });
    //            });
    //        });
    
    //    });
    //});

        // Cleaner Better Practice
    $q.all(promises).then(function () {
        console.log("Alternative and Cleaner Code Running");
        // First to Return
        AsyncFunction(3000, "First CallBack Done")
        .then(AsyncFunction.bind(null,2500, "Second CallBack Done"))
        .then(AsyncFunction.bind(null, 400, "Third Callback Done"))
        .then(AsyncFunction.bind(null, 4000, "Call back created in Third Call Back Then Function"))
        .then(PrintWhenDone.bind(null, "is this confusing enough yet"))
        .then(AsyncFunction.bind(null, 10000, "Fourth Callback Done"))
        .then(PrintWhenDone.bind(null, "Fourth Call Back then Function"))
        .then(AsyncFunction.bind(null, 100, "Fifth Callback Done"))
        .then(AsyncFunction.bind(null, 11000, "Sixth Callback Done"))
        .then(PrintWhenDone.bind(null, "All Call Backs have finished"))


    })
        
        
           
        

        
        
        
        
        

    



    // Now Handle All Sequentially


}]);
