
function formatDollar(num) {
  var p = num.toFixed(2).split(".");
  return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
      return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

angular.module('app.controllers', [])


  .controller('scannerCtrl', ['$scope', '$stateParams', '$cordovaBarcodeScanner', '$http', '$ionicPopup', '$rootScope', '$cordovaGoogleAnalytics',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $cordovaBarcodeScanner, $http, $ionicPopup, $rootScope, $cordovaGoogleAnalytics) {

      // $cordovaGoogleAnalytics.trackView('Scanner Page');
      $scope.checkActive = function () {
        $http.get('http://cincyplanet.com/kengarff/mycheck.js')
          .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.staffList = response.data;
            if ($scope.staffList[0].status != 'true') {
              //     alert('Account not active! Please close app,');

              var alertPopup = $ionicPopup.alert({
                title: 'Account Not Active',
                template: 'Account is not active, please exit the app.'
              });

              alertPopup.then(function (res) {
                $scope.checkActive(); // callback success
              });

              /* alert('Account is not active, please exit the app.', 'Account Not Active', 'OK')
               .then(function() {

               });*/
            }
            //alert($scope.staffList[0].name)
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error " + JSON.stringify(response))
          });
      };
      $scope.checkActive();


      $scope.vinScan = function () {

        $http.get('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1FDXE45S53HC05364?format=json')
          .then(function (response) {

            //alert(JSON.stringify(response.data,null,' '))
            $rootScope.vinDecode.type = response.data.Results[12].Value;
            $rootScope.vinDecode.make = response.data.Results[5].Value;
            $rootScope.vinDecode.model = response.data.Results[7].Value;
            $rootScope.vinDecode.trim = response.data.Results[11].Value;
            $rootScope.vinDecode.year = response.data.Results[8].Value;
            alert(JSON.stringify($rootScope.vinDecode, null, ' '))


          }, function (error) {
            alert(error);
          });


      }


    }])

  .controller('oTDCtrl', ['$scope', '$stateParams', '$cordovaGoogleAnalytics', '$ionicModal', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $cordovaGoogleAnalytics, $ionicModal, $rootScope) {

      //OTD Code
      //$cordovaGoogleAnalytics.trackView('OTD Opened');
      // Form data for the login modal
      $rootScope.loginData = {};
      $rootScope.myStockNum = {};

      $rootScope.mainTitle = "Pricing";



      //Todo Lease Modal

      $rootScope.leaseInfo = {
        msrp: 26885,
        sellPrice: 23995,
        moneyFactor: 0.000720,
        residual: 0.56,
        downPayment: 0,
        tradeIn: 0,
        payOff: 0,
        endBuyout: 0,
        leasePayment: 0,
        myFinance: 0,
        netCap: 0,
        paymentNum: 36,
        depValue: 0,
        salesTax: 0,
        taxRate: 0.073,
        docFee: 299,
        acqFee: 595,
        grossCap: 0,
        adjustedCap: 0,
        upfrontFees: 551.75,
        backEnd:0,
        rentCharge: 0,
        totalBase: 0,
        monthlyTax: 0,
        monthlyBase: 0,
        templeasePayment: 0,
        capCostReduction: 0,
        tradeValue: 0
      };

      $rootScope.leaseCounter = 0;

      $rootScope.calcLease = function () {

        //reset Lease counter
        $rootScope.leaseCounter = 0;

        //clear backend to recalculate
        $rootScope.leaseInfo.backEnd = 0;
        $rootScope.leaseInfo.rentCharge = 0;
        $rootScope.leaseInfo.upfrontFees = 551.75;

        if($rootScope.leaseInfo.downPayment > 0){

          var myTempCost = $rootScope.leaseInfo.downPayment * $rootScope.leaseInfo.taxRate;
          myTempCost = (myTempCost + 551.75);
          $rootScope.leaseInfo.capCostReduction = $rootScope.leaseInfo.downPayment - myTempCost;
          $rootScope.leaseInfo.capCostReduction = $rootScope.leaseInfo.capCostReduction - $rootScope.leaseInfo.templeasePayment;
          $rootScope.leaseInfo.upfrontFees = 0;
        }else{
          $rootScope.leaseInfo.capCostReduction = 0;
        }

        //Trade Value, can be negative number
        $rootScope.leaseInfo.tradeValue = (parseFloat($rootScope.leaseInfo.payOff) - parseFloat($rootScope.leaseInfo.tradeIn));


        //Get residual
        $rootScope.leaseInfo.endBuyout = ($rootScope.leaseInfo.msrp * $rootScope.leaseInfo.residual).toFixed(2);

        //Get Backend
        if ($rootScope.checkboxModel.value1 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.extWarrany)
        }
        if ($rootScope.checkboxModel.value2 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.vechileMaint)
        }
        if ($rootScope.checkboxModel.value3 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.permaPlate)
        }
        if ($rootScope.checkboxModel.value4 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.titanium)
        }
        if ($rootScope.checkboxModel.value5 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.clearShield)
        }
        if ($rootScope.checkboxModel.value6 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.gapProtect)
        }
        if ($rootScope.checkboxModel.value7 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.tinting)
        }
        if($rootScope.checkboxModel.value8 == 1)
        {  $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.accessories)
        }



        $rootScope.leaseInfo.grossCap = parseFloat($rootScope.leaseInfo.sellPrice+$rootScope.leaseInfo.upfrontFees) + $rootScope.leaseInfo.backEnd + 10 + 595;

        $rootScope.leaseInfo.adjustedCap = ($rootScope.leaseInfo.grossCap - parseInt($rootScope.leaseInfo.capCostReduction)) + $rootScope.leaseInfo.tradeValue;


        $rootScope.leaseInfo.rentCharge = parseFloat(parseFloat($rootScope.leaseInfo.adjustedCap) + parseFloat($rootScope.leaseInfo.endBuyout)) * $rootScope.leaseInfo.moneyFactor;

        $rootScope.leaseInfo.rentCharge = ($rootScope.leaseInfo.rentCharge*36);

        $rootScope.leaseInfo.depValue = ($rootScope.leaseInfo.adjustedCap - $rootScope.leaseInfo.endBuyout);

        $rootScope.leaseInfo.totalBase = $rootScope.leaseInfo.depValue + $rootScope.leaseInfo.rentCharge;

        $rootScope.leaseInfo.monthlyBase = ($rootScope.leaseInfo.totalBase / 36);

        $rootScope.leaseInfo.monthlyTax = ($rootScope.leaseInfo.totalBase / 36)*$rootScope.leaseInfo.taxRate;

        $rootScope.leaseInfo.templeasePayment = $rootScope.leaseInfo.monthlyBase  + $rootScope.leaseInfo.monthlyTax;

        $rootScope.calcLease2();
      };


      $rootScope.calcLease2 = function () {
        //clear backend to recalculate
        $rootScope.leaseCounter += 1;
        $rootScope.leaseInfo.backEnd = 0;
        $rootScope.leaseInfo.rentCharge = 0;
        $rootScope.leaseInfo.upfrontFees = (551.75 + $rootScope.leaseInfo.templeasePayment);

        if($rootScope.leaseInfo.downPayment > 0){

          var myTempCost = $rootScope.leaseInfo.downPayment * $rootScope.leaseInfo.taxRate;
          myTempCost = (myTempCost + 551.75);
          $rootScope.leaseInfo.capCostReduction = $rootScope.leaseInfo.downPayment - myTempCost;
          $rootScope.leaseInfo.capCostReduction = $rootScope.leaseInfo.capCostReduction - $rootScope.leaseInfo.templeasePayment;
          $rootScope.leaseInfo.upfrontFees = 0;
        }else{
          $rootScope.leaseInfo.capCostReduction = 0;
        }

        //Trade Value, can be negative number
        $rootScope.leaseInfo.tradeValue = (parseFloat($rootScope.leaseInfo.payOff) - parseFloat($rootScope.leaseInfo.tradeIn));

        //Get residual
        $rootScope.leaseInfo.endBuyout = ($rootScope.leaseInfo.msrp * $rootScope.leaseInfo.residual).toFixed(2);

        //Get Backend
        if ($rootScope.checkboxModel.value1 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.extWarrany)
        }
        if ($rootScope.checkboxModel.value2 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.vechileMaint)
        }
        if ($rootScope.checkboxModel.value3 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.permaPlate)
        }
        if ($rootScope.checkboxModel.value4 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.titanium)
        }
        if ($rootScope.checkboxModel.value5 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.clearShield)
        }
        if ($rootScope.checkboxModel.value6 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.gapProtect)
        }
        if ($rootScope.checkboxModel.value7 == 1) {
          $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.tinting)
        }
        if($rootScope.checkboxModel.value8 == 1)
        {  $rootScope.leaseInfo.backEnd = parseInt($rootScope.leaseInfo.backEnd + $rootScope.otdPrice.accessories)
        }

        $rootScope.leaseInfo.grossCap = parseFloat($rootScope.leaseInfo.sellPrice+$rootScope.leaseInfo.upfrontFees) + $rootScope.leaseInfo.backEnd + 10 + 595;

        $rootScope.leaseInfo.adjustedCap = ($rootScope.leaseInfo.grossCap - parseInt($rootScope.leaseInfo.capCostReduction)) + $rootScope.leaseInfo.tradeValue;


        $rootScope.leaseInfo.rentCharge = parseFloat(parseFloat($rootScope.leaseInfo.adjustedCap) + parseFloat($rootScope.leaseInfo.endBuyout)) * $rootScope.leaseInfo.moneyFactor;

        $rootScope.leaseInfo.rentCharge = ($rootScope.leaseInfo.rentCharge*36);

        $rootScope.leaseInfo.depValue = ($rootScope.leaseInfo.adjustedCap - $rootScope.leaseInfo.endBuyout);

        $rootScope.leaseInfo.totalBase = $rootScope.leaseInfo.depValue + $rootScope.leaseInfo.rentCharge;

        $rootScope.leaseInfo.monthlyBase = ($rootScope.leaseInfo.totalBase / 36);

        $rootScope.leaseInfo.monthlyTax = ($rootScope.leaseInfo.totalBase / 36)*$rootScope.leaseInfo.taxRate;

       if($rootScope.leaseCounter < 3) {
         $rootScope.leaseInfo.templeasePayment = $rootScope.leaseInfo.monthlyBase + $rootScope.leaseInfo.monthlyTax;
         $rootScope.calcLease2();
       }else{
         $rootScope.leaseInfo.leasePayment = $rootScope.leaseInfo.monthlyBase  + $rootScope.leaseInfo.monthlyTax;
         $rootScope.leaseCounter = 0;
       }

      };


      $ionicModal.fromTemplateUrl('findLease.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modalLease = modal;
      });
      $rootScope.showLease = function () {
        $rootScope.modalLease.show();
        $rootScope.calcLease();
      };
      $rootScope.hideLease = function () {
        $rootScope.modalLease.hide();
      };


      $ionicModal.fromTemplateUrl('my-prices.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modalPrices = modal;
      });

      $rootScope.showPrices = function () {
        $rootScope.modalPrices.show();
      };

      $rootScope.hidePrices = function () {
        $rootScope.modalPrices.hide();
        $rootScope.getOtd();
      };





    }])

  .controller('modelsCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser) {
      // $cordovaGoogleAnalytics.trackView('Staff Opened');

    }])

  .controller('cameraCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser) {


    }])


  .controller('contactsCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser', '$cordovaContacts', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser, $cordovaContacts, $ionicPlatform) {




      /*


       $ionicPlatform.ready(function(){
       $cordovaContacts.find({filter: ''}).then(function(result) {
       $rootScope.contacts = result;
       }, function(error) {
       console.log("ERROR: " + error);
       });

       });

       */


      /*$scope.findContactsBySearchTerm = function (searchTerm) {
       var opts = {                                           //search options
       filter : searchTerm,                                 // 'Bob'
       multiple: true,                                      // Yes, return any contact that matches criteria
       fields:  [ 'displayName', 'name','company' ] ,                  // These are the fields to search for 'bob'.
       desiredFields: ['displayName']    //return fields.
       };

       $cordovaContacts.find(opts).then(function (contactsFound) {
       $scope.contacts = contactsFound;
       });
       };

       $scope.findContactsBySearchTerm('customer')*/

    }])


  .controller('lotTechCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser', '$ionicPopover', '$rootScope', '$firebaseArray', '$firebase', '$cordovaDialogs', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser, $ionicPopover, $firebaseArray, $cordovaDialogs) {

      //   $cordovaGoogleAnalytics.trackView('Lot Tech Opened');


      //END CONTROLLER

    }])

  .controller('menuCtrl', ['$scope', '$stateParams', '$cordovaInAppBrowser', '$rootScope', '$cordovaSms', '$cordovaGoogleAnalytics','$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $cordovaInAppBrowser, $rootScope, $cordovaSms, $cordovaGoogleAnalytics, $ionicPopup) {



      $rootScope.openDeliveries = function () {
        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Customer Deliveries');
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };


        var myUsername = localStorage.getItem('cdUsername');
        var myPassword = localStorage.getItem('cdPassword');

        if(myUsername != null && myPassword != null)
        {


          $rootScope.logins.cdUsername = localStorage.getItem('cdUsername');
          $rootScope.logins.cdPassword = localStorage.getItem('cdPassword');
          var ref = $cordovaInAppBrowser.open('http://www.customerdeliveri.es/salespeople/sign_in', '_blank', defaultOptions)
            .then(function (event) {
              // success
              if(event.type == 'loadstop'){
                $cordovaInAppBrowser.executeScript(
                  {
                    code: 'document.getElementById("salesperson_email").value = "'+$rootScope.logins.cdUsername+'";' +
                    'document.getElementById("salesperson_password").value = "'+$rootScope.logins.cdPassword+'";' +
                    'document.getElementById("new_salesperson").submit();'
                  });
              }
            })
            .catch(function (event) {
              // error
            });


        }else{


          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="logins.cdUsername"><input type="password" ng-model="logins.cdPassword">',
            title: 'Enter Username and Password',
            subTitle: 'Please use normal things',
            scope: $rootScope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$rootScope.logins.cdUsername || !$rootScope.logins.cdUsername) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                  } else {
                    localStorage.setItem('cdUsername', $rootScope.logins.cdUsername);
                    localStorage.setItem('cdPassword', $rootScope.logins.cdPassword);
                    // $scope.data.logins;

                    //return [myReturns.myreturnUsername, myReturns.myreturnPassword];
                  }
                }
              }
            ]
          });

          myPopup.then(function(res) {
            //Username and Password were entered
            console.log('Tapped!', res);

            if($rootScope.logins.cdUsername.length < 5 || $rootScope.logins.cdPassword.length < 5){return;}

            var ref = $cordovaInAppBrowser.open('http://www.customerdeliveri.es/salespeople/sign_in', '_blank', defaultOptions)
              .then(function (event) {
                // success


                if(event.type == 'loadstop'){
                  $cordovaInAppBrowser.executeScript(
                    {
                      code: 'document.getElementById("salesperson_email").value = "'+$rootScope.logins.cdUsername+'";' +
                      'document.getElementById("salesperson_password").value = "'+$rootScope.logins.cdPassword+'";' +
                      'document.getElementById("new_salesperson").submit();'
                    });

                  setTimeout(function(){
                    $cordovaInAppBrowser.executeScript(
                      {
                        code: 'document.getElementById("direct_upload_photo_url").value = "'+$rootScope.mySavedImage+'";'
                      });
                  }, 5000);


                }



              })
              .catch(function (event) {
                // error
              });


          });


        }





      };


      $scope.kbbICO = function () {

        $cordovaGoogleAnalytics.trackEvent('Open Page', 'KBB ICO');
        $scope.url = 'https://www.kbb.com/instant-cash-offer/?SiteRef=8a0278ac-e006-437e-8618-5fce28f42b7c&OfferCode=K&lp=43A6F9B8-DB6C-48C0-A360-F658B2176E3E&funnelCode=KBB';
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
      };


      $scope.vehiclehistory = function () {

        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Vehicle History');
        $cordovaInAppBrowser.open('https://www.vehiclehistory.com/vehicle/land.php', '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
          })
          .catch(function (event) {// error
          });
      };

      //SEARCH BY CAR PRICE USED CARS
      //Search Under 10K
      $scope.searchUsed10K = function () {
        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Search 10K');
        $scope.url = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?internetPrice=1-9999&sortBy=internetPrice+asc&';
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
      }

      $scope.searchUsed20K = function () {
        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Search 20K');
        $scope.url = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?internetPrice=1-19999&sortBy=internetPrice+asc&';
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
      }

      $scope.searchUsed1020K = function () {
        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Search 10-20K');
        $scope.url = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?internetPrice=10000-19999&sortBy=internetPrice+asc&';
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
      }


      $scope.contact = function () {
        /*$scope.url = 'https://mtc.contactatonce.com/MobileTextConnectConversationInitiater.aspx?MerchantId=26707&ProviderId=4412&PlacementId=31';
         var defaultOptions = {
         location: 'no',
         clearcache: 'yes',
         toolbar: 'yes'
         };
         $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
         .then(function (event) {
         // success
         })
         .catch(function (event) {
         // error
         });*/

        //CONFIGURATION
        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
          }
        };

        $cordovaSms
          .send('8018079374', 'SMS content', options)
          .then(function () {
            // Success! SMS was sent
            alert('sent')
          }, function (error) {
            // An error occurred
            alert('error')
          });


      }


      $scope.searchUsedLowestFirst = function () {
        $cordovaGoogleAnalytics.trackEvent('Open Page', 'Search used lowest first');
        $scope.url = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?sortBy=internetPrice+asc&';
        var defaultOptions = {
          location: 'no',
          clearcache: 'no',
          toolbar: 'yes'
        };
        $cordovaInAppBrowser.open($scope.url, '_blank', defaultOptions)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });
      }


    }])

  .controller('toDoCtrl', ['$scope', '$stateParams', '$rootScope', '$ionicPopover', '$cordovaLocalNotification', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $cordovaLocalNotification) {

      // $rootScope.datetimeValue = '';
      //////////////////////////////////////////////////////
      //TO DO CODE//////////////////////////////////////////
      //////////////////////////////////////////////////////
      $scope.todoInput = {};

      if (localStorage.getItem("mytodos") == null) {
        $scope.todoList = [{todoText: 'Create a ToDo Item', done: false}];
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));

      } else {
        //set the todolist from local storage
        $scope.todoList = angular.fromJson(localStorage.getItem("mytodos"));
      }


      $rootScope.$on('cordova.plugins.notification.local:schedule',
        function (event, notification, state) {
          // ...
          alert(notification);
        });

      $scope.addAlert = function (time, id) {
        var now = new Date().getTime();
        var _10SecondsFromNow = new Date(now + 30 * 1000);
        cordova.plugins.notification.local.schedule({
          id: 123423,
          title: 'Title here',
          text: 'Text here',
          at: _10SecondsFromNow
        });
        $rootScope.trackItem('Todo Page', 'Add alert');

      };

// Add an item function
      $scope.todoAdd = function () {
        $rootScope.trackItem('Todo Page', 'Add todo');
        //check to see if text has been entered, if not exit
        if ($scope.todoInput.data.length < 2) {
          return;
        }

        //if ($scope.datetimeValue.length > 5 ){
        if ($scope.todoInput.date != undefined) {
          $scope.todoInput.id = Math.floor((Math.random() * 10000000) + 1);
          // var now = new Date().getTime();
          // var _10SecondsFromNow = new Date(now + 30 * 1000);
          cordova.plugins.notification.local.schedule({
            id: $scope.todoInput.id,
            title: 'Sales App ToDo Alert',
            text: $scope.todoInput.data,
            at: $scope.todoInput.date
          })

        } else {
          $scope.todoInput.id = 0;
        }
        //}


        //if there is text add it to the array
        $scope.todoList.push({
          todoText: $scope.todoInput.data,
          done: false,
          id: $scope.todoInput.id,
          date: $scope.todoInput.date
        });

        //clear the textbox
        $scope.todoInput.data = "";
        $scope.todoInput.date = undefined;

        //resave the list to localstorage
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));

      };

      $scope.remove = function () {
        //copy list
        var oldList = $scope.todoList;
        //clear list
        $scope.todoList = [];
        //cycle through list
        angular.forEach(oldList, function (x) {
          //add any non-done items to todo list
          if (!x.done) $scope.todoList.push(x);
          if (x.done && x.id > 0) {

            cordova.plugins.notification.local.cancel(x.id, function () {
              // Notification was cancelled
              console.log('alert has been cancelled!')
            }, $scope);

          }
        });
        //update local storage
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));

      };

      //The Update function
      //This waits 100ms to store the data in local storage
      $scope.update = function () {
        //update local storage 100 ms after the checkbox is clicked to allow it to process
        setTimeout(function () {
          localStorage.setItem("mytodos", angular.toJson($scope.todoList));
        }, 100)


      };

      ///////////////////////////////////////////////////
      //END TO DO CODE////////////////////////////////////
      ///////////////////////////////////////////////////


    }])


  .controller('usedcarsCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser','$filter','$state','$rootScope','$cordovaGoogleAnalytics',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser,$filter,$state, $cordovaGoogleAnalytics) {
      $cordovaGoogleAnalytics.trackView('Used Cars');

    }])

  .controller('newcarsCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser','$filter','$state','$rootScope','$cordovaGoogleAnalytics',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope, $http, $cordovaInAppBrowser,$filter,$state, $cordovaGoogleAnalytics) {
      $cordovaGoogleAnalytics.trackView('New Cars');
    }])

  .controller('staffListingCtrl', ['$scope', '$stateParams', '$http', '$cordovaInAppBrowser', '$cordovaGoogleAnalytics','$cordovaSms',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $cordovaInAppBrowser, $cordovaGoogleAnalytics,$cordovaSms) {

      $http.get('http://kengarff.cincyplanet.com/stafflisting.js')
        .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.staffList = response.data;
          // $cordovaGoogleAnalytics.trackEvent('Staff Page', 'Get listing');
          //alert($scope.staffList[0].name)
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("Error " + JSON.stringify(response))
        });

      $scope.callStaff = function (phone) {
        $cordovaInAppBrowser.open('tel://' + phone, '_system')
          .then(function (event) {
            // success
            //   $cordovaGoogleAnalytics.trackEvent('Staff Page', 'Call staff ' + phone);
          })
          .catch(function (event) {
            // error
          });
      };
      $scope.emailStaff = function (email) {
        $cordovaInAppBrowser.open('mailto:' + email, '_system')
          .then(function (event) {
            // success
            //   $cordovaGoogleAnalytics.trackEvent('Staff Page', 'Email staff ' + email);
          })
          .catch(function (event) {
            // error
          });
      };
      $scope.textStaff = function (mobile) {
        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            //intent: 'INTENT'  // send SMS with the native android SMS messaging
            intent: '' // send SMS without open any other app
          }
        };
        $cordovaSms
          .send(mobile, '', options)
          .then(function() {
            // Success! SMS was sent
          }, function(error) {
            // An error occurred
          });
      }

    }]);
