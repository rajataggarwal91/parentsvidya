var app = angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/feedback", {
        templateUrl : "feedback.html"
    })
    .when("/courses", {
        templateUrl : "courses.html"
    });
    
});
app.controller("myctrl",function($scope,$http){
    $scope.divSession=false;
    $scope.divVideo = true;
    $scope.selected = 1;
    $http.get("http://ergast.com/api/f1/2013/driverStandings.json").then(function(response){
        driverList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        $scope.driversList = driverList;
        $scope.getDetail(driverList[0].Driver.driverId);
        
    });
    $scope.getDetail =  function(id){
        $scope.selectedId = id;
        detailUrl = "http://ergast.com/api/f1/2013/drivers/"+ id +"/driverStandings.json"
        $http.get(detailUrl).then(function(response){
            detail = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            $scope.dob = detail.Driver.dateOfBirth;
            $scope.name = detail.Driver.givenName+" "+detail.Driver.familyName;
            $scope.nationality = detail.Driver.nationality;
            $scope.wins = detail.wins;
        });
    }
    $scope.orderBy = function(item){
        $scope.orderByItem = item;
        if($scope.reverse==false)
            $scope.reverse=true;
        else
            $scope.reverse=false;
    }
    $scope.showDiv = function(id){
        if(id==1){
            $scope.selected = 1;
            $scope.divVideo = true;
            $scope.divSession = false;
            $scope.divFeedback = false;
        }
         else if(id==2){
            $scope.selected = 2;
            $scope.divVideo = false;
            $scope.divSession = true;
            $scope.divFeedback = false; 
        }
        else if(id==3){
            $scope.selected = 3;
            $scope.divVideo = false;
            $scope.divSession = false;
            $scope.divFeedback = true; 
        }
    }
});
app.controller("feedbackCtrl",function($scope,$http){
    $scope.submitFeedback = function(){
    if(!$scope.session || !$scope.improve ||  !$scope.email)
        return;
        
    var session = $scope.session.trim();
    var improve = $scope.improve.trim();
    var email = $scope.email.trim();
    var keyS = 'entry_1684795539'
    var keyI = 'entry_2138827679'
    var keyE = 'entry_1123253958'
    
    $http({
        method: 'POST',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSezrE57QoknEiU16bH2IPujj8GTPAB3QDlnATuyxcHH5rt28w/formResponse?'+keyS+'='+session+'&'+keyI+'='+improve+'&'+keyE+'='+email,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
        function(res) {
            console.log('success')
        },
        function(err) {
            console.log('error...', err);
        }
    );
        $scope.response = "Thanks for sharing your feedback, we appreciate it." 
    }
});
app.controller("courseCtrl",function($scope,$http){
   var courses;
   $scope.selected=0;
   $http.get('data/courses.json').then(function(response) {
           courses = response.data.courses;
           $scope.courseList = courses;
           $scope.currentTopic = courses[0].topics;
           console.log(response.data.courses.length)
    });
    
    $scope.getTopics = function(id){
        $scope.selected = id;
        $scope.currentTopic = courses[id].topics;
    }
   
});