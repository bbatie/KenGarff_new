angular.module('app.services', [])

.factory('hondas', [function($http,$rootScope){

    $http.get('https://api.edmunds.com/api/vehicle/v2/honda/accord?state=new&year=2017&view=basic&fmt=json&api_key=69warnfcn6wnhx2bb5fh4xn5')
      .then(function (response)
      {

        console.log(JSON.stringify(response.data[0].name)  +
         ' ' + JSON.stringify(response.data[0].years.styles[0].name) );


      }, function (error) {
        alert(error)
      /*  // $scope.error2 = JSON.stringify(error);
        var alertPopup = $ionicPopup.alert({
          title: 'ERROR!',
          template: "There was an error reading the barcode or with the VIN info decoding."
        });

        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      */});



}])


.service('techMessages', [function(){




}]);
