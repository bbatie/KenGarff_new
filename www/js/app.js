// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


//Dealer Socket login Page
//https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwj1wv3GiJXTAhUH12MKHco8AokQFggaMAA&url=https%3A%2F%2Fmy.dealersocket.com%2FSSO%2FLogin.aspx%3FReturnURL%3D%2FCRM%2FLogin.aspx%26NoRedirect%3D1&usg=AFQjCNEAGNKIHa4hStxnXofCHWDnnNGaFQ&sig2=d2q2mehYFSSEr8ha_KNYjw&bvm=bv.152174688,d.cGc

var myResults = '';

var blob;

function shouldRotateToOrientation(degrees) {
  return true;
};

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services',
  'ngCordova', 'firebase', 'ngPrettyJson', 'ion-datetime-picker', 'pdf', 'ngCsvImport'])

  .config(function ($ionicConfigProvider) {

  })

  .run(function ($ionicPlatform, $cordova3DTouch, $state, $cordovaBarcodeScanner, $rootScope, $cordovaInAppBrowser,
                 $http, $cordovaToast, $ionicPopup, $cordovaClipboard, $ionicActionSheet, $ionicLoading, $cordovaCamera,
                 $firebaseArray, $cordovaLocalNotification, $cordovaFlashlight, $cordovaVibration, $cordovaInstagram,
                 $cordovaMedia, $cordovaAppVersion, $ionicModal, $cordovaFileOpener2, $filter, $cordovaStatusbar, $cordovaGoogleAnalytics, $cordovaCamera) {

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
        $cordovaStatusbar.show();
      }


      //PUSH notification testing


      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal
        .startInit("1beec417-423e-4f81-8ed6-04d04c2a6df5")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();


      var config = {
        apiKey: "AIzaSyCU2ICgeFh3r3pvqWmj3cUj4DIjNgIxpWc",
        authDomain: "kengarff-780c5.firebaseapp.com",
        databaseURL: "https://kengarff-780c5.firebaseio.com"
      };

      firebase.initializeApp(config);

      /*   ref1 = firebase.database().ref().child('users');

       $rootScope.users = $firebaseArray(ref1);*/


      window.plugins.OneSignal.getIds(function (ids) {
        console.log('getIds: ' + JSON.stringify(ids));

        //If we want to add user to user messaging this is a start with FIrebase
        /* if( localStorage.getItem('firstName') == null)
         {


         $rootScope.pushData = {};

         // An elaborate, custom popup
         var myPopup = $ionicPopup.show({
         template: '<input type="text" ng-model="pushData.firstName"> <input type="text" ng-model="pushData.lastName">',
         title: 'Enter Your Name',
         subTitle: 'Enter First and Last Name',
         scope: $rootScope,
         buttons: [
         { text: 'Cancel' },
         {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
         if (!$rootScope.pushData.firstName || !$rootScope.pushData.firstName) {
         //don't allow the user to close unless he enters wifi password
         e.preventDefault();
         } else {
         localStorage.setItem('firstName', $rootScope.pushData.firstName);
         localStorage.setItem('lastName', $rootScope.pushData.lastName);
         return $rootScope.pushData;
         }
         }
         }
         ]
         });

         myPopup.then(function(res) {
         // localStorage.setItem('firstName', res.firstName);
         //localStorage.setItem('lastName', res.lastName);
         localStorage.setItem('firstName', $rootScope.pushData.firstName);
         localStorage.setItem('lastName', $rootScope.pushData.lastName);

         localStorage.setItem('myID', ids.userId);
         localStorage.setItem('myToken', ids.pushToken);

         $rootScope.users.$add({
         firstName: $rootScope.pushData.firstName,
         lastName: $rootScope.pushData.lastName,
         userID: ids.userId,
         pushToken: ids.pushToken
         });
         // console.log('Tapped!', res);
         console.warn('user saved');
         });



         }else{
         //We know the salesperson, remove and update

         console.warn("sales person exists");

         $rootScope.users.$save({
         firstName: localStorage.getItem('firstName'),
         lastName: localStorage.getItem('lastName'),
         userID: ids.userId,
         pushToken: ids.pushToken
         });


         }*/

        //alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
      });


      $rootScope.sendNotification = function () {
        var notificationObj = {
          contents: {en: "message body"}, headings: {en: "My Title"},
          include_player_ids: ['1848dda6-5f4d-4155-8a24-1e86498a3814']
        };
        window.plugins.OneSignal.postNotification(notificationObj,
          function (successResponse) {
            console.log("Notification Post Success:", successResponse);
          },
          function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
        );

      }


      $rootScope.counter = 0;
      $rootScope.username = '';
      $rootScope.backImage = '';
      $rootScope.logoImage = '';

      $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        //  modal.el.className = modal.el.className + " top-modal";
        $rootScope.modalImage = modal;
      });

      $rootScope.openImageModal = function (index) {
        //Clicked from scanner page
        /* $ionicModal.fromTemplateUrl('image-modal.html', {
         scope: $rootScope,
         animation: 'slide-in-up'
         }).then(function(modal) {
         //  modal.el.className = modal.el.className + " top-modal";
         $rootScope.modalImage = modal;
         });*/
        if (index == 0) {
          $rootScope.modalImage1 = $rootScope.backImage
        }
        if (index == 1) {
          $rootScope.modalImage1 = $rootScope.myImage
        }
        if (index == 2) {
          $rootScope.modalImage1 = $rootScope.myImage1
        }


        $rootScope.modalImage.show();
        /* setTimeout(function(){
         $rootScope.closeImageModal();
         },10000)*/
      };

      $rootScope.closeImageModal = function () {
        $rootScope.modalImage.hide();

        setTimeout(function () {
          $rootScope.modalImage.remove();
          $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            //  modal.el.className = modal.el.className + " top-modal";
            $rootScope.modalImage = modal;
          });
        }, 300);


      };

      $rootScope.getFeed = function () {
        $http.get('http://www.customerdeliveri.es/kengarffhondariverdale/latest')
          .then(function (response) {

              //alert(JSON.stringify(response.data));
              var str = JSON.stringify(response.data);
              console.log(str)
              var result = str.match(/<strong>(.*?)<\/strong>/g).map(function (val) {
                $rootScope.username = val.replace(/<\/?b>/g, '');
              });
              //var str = $rootScope.username;
              /*       var result = str.match(/src(.*?)<\/alt/g).map(function(val){
               $rootScope.backImage = val.replace(/<\/?b>/g,'');
               });
               */

              var urlRegex = /(http?:\/\/[^\s]+)/g;
              return str.replace(urlRegex, function (url) {

                if ($rootScope.counter == 1) {
                  $rootScope.logoImage = url;
                }
                if ($rootScope.counter == 0) {
                  $rootScope.backImage = url;
                  $rootScope.counter += 1;
                }
                // $rootScope.counter = 1;
                //$rootScope.backImage = url;// '<a href="' + url + '">' + url + '</a>';
              });

              /* var url = $('http://www.customerdeliveri.es/kengarffhondariverdale/group').css('background-image');
               alert(url)*/

            },
            function (error) {
              alert(JSON.stringify(error))
            });

      };


      $rootScope.getFeed();


      $rootScope.vinList = [];

      $rootScope.testing = true;


      //Show the TMV from edmunds
      $rootScope.getTMV = false;
      $rootScope.tmvData = {};

      $rootScope.getMonthlyPayment = function () {
        /*        // $rootScope.trackItem('OTD controller', 'Get monthly payment');
         //  $rootScope.otdPrice.mothlyPayment = carTotal * ($rootScope.otdPrice.interest / 100 / 12) * (Math.pow(1 + ($rootScope.otdPrice.interest / 100 / 12), $rootScope.otdPrice.term)) / (Math.pow(1 + ($rootScope.otdPrice.interest / 100 / 12), $rootScope.otdPrice.term) - 1);//$scope.otdPrice.totalOTD * $scope.otdPrice.interest * (Math.pow(1 + $scope.otdPrice.interest, $scope.otdPrice.term)) / (Math.pow(1 + $scope.otdPrice.interest, $scope.otdPrice.term) - 1);
         // $cordovaGoogleAnalytics.trackEvent('OTD -payment', 'payment calculated');*/

        var princ = $rootScope.otdPrice.totalOTD;
        console.log('OTD: ' + princ);
        var term = $rootScope.otdPrice.term;
        console.log('Term : ' + term);
        var intr = $rootScope.otdPrice.interest / 1200;
        console.log('Interest : ' + intr);
        $rootScope.otdPrice.mothlyPayment = (princ * intr / (1 - (Math.pow(1 / (1 + intr), term)))).toFixed(2);
      };


      $cordovaGoogleAnalytics.startTrackerWithId('UA-92200251-1');


      codePush.notifyApplicationReady(function () {
      }, function () {
        alert('Update notification failed!')
      });

      //dealership settings

      $rootScope.myBrand = 'honda'; //set brand for dealership, to pull list from edmunds
      $rootScope.myZipCode = 84405;

      $rootScope.myDealership = "kengarffhondariverdale";

      $rootScope.defaultOptions = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'yes'
      };

      $rootScope.searchCarsParams = {
        price: '0-1000000',
        zip: $rootScope.myZipCode,
        radius: 5,
        term: '',
        termNEW: '',
        type: 'used',
        around: false,
        vin: ''
      };

      $rootScope.myInfo = {
        name: '',
        phone: ''
      };

      $rootScope.checkboxModel = {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
        value7: 0,
        value8: 0
      };

      $rootScope.logins = {
        //Customer Deliveries User/Pass
        cdUsername: '',
        cdPassword: ''
      };


      $rootScope.otdPrice = {
        carPrice: 10000,
        taxPrice: 700,
        extWarrany: 1895,
        vechileMaint: 99,
        permaPlate: 795,
        titanium: 699,
        clearShield: 649,
        gapProtect: 695,
        tinting: 250,
        accessories: 0,
        totalOTD: 0,
        mothlyPayment: 0,
        principle: 10000,
        interest: 2.99,
        term: 60,
        totalPrice: 0,
        downPayment: 0,
        tradeIn: 0,
        payOff: 0,
        myTaxes: 0,
        taxRate: 0.0730,
        carYear: 2017,
        carAge: 0,
        totalFees: 450,
        choice: 'new',
        docFee: 299,
        stockNumber: '',
        carInfo: ''
      };


      $rootScope.getEdmundsTMV = function (styleID) {

        //Need to get mileage and zip code
        // An elaborate, custom popup

        var myPopup = $ionicPopup.show({
          template: '<input type="number" ng-model="tmvData.miles" placeholder="Miles"><div class="list">',
          title: 'Mileage for Vehicle',
          subTitle: 'Assumes Clean Condition Vehicle',
          scope: $rootScope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Get Trade Est.</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$rootScope.tmvData.miles) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {

                  console.log(styleID)

                  $http.get('https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=' + styleID + '&condition=Clean&mileage=' + $rootScope.tmvData.miles + '&zip=84405&fmt=json&api_key=69warnfcn6wnhx2bb5fh4xn5')
                    .then(function (response) {

                        var myPrice = parseFloat(response.data.tmv.nationalBasePrice.usedTradeIn) + parseFloat(response.data.tmv.conditionAdjustment.usedTmvRetail) + parseFloat(response.data.tmv.mileageAdjustment.usedTradeIn);
                        console.log(myPrice);

                        // alert( "Estimated Trade Value: $" + parseInt(myPrice * .85)  );

                        var alertPopup = $ionicPopup.alert({
                          title: 'Estimated Trade In Value:',
                          template: '$ ' + parseInt(myPrice * .85) + '<br>Estimation Only, not an offer!'
                        });


                      },
                      function (error) {
                        alert(JSON.stringify(error))
                      });
                  return $rootScope.tmvData;
                }
              }
            }
          ]
        });


      }


      $rootScope.setChoice = function () {
        $rootScope.getOtd();
      };

      $rootScope.getOtd = function () {

        //TODO add age based property tax
        //change the 600 below to 450
        $rootScope.otdPrice.carAge = (2017 - $rootScope.otdPrice.carYear);


        //New Car
        if ($rootScope.otdPrice.choice == 'new') {
          //New Car: $540.92
          $rootScope.otdPrice.totalFees = 241.92;
        }
        else
        ////Used Car: $426.91 + car age fee
        {
          if ($rootScope.otdPrice.carAge > 11) {
            $rootScope.otdPrice.totalFees = 137.91;
          }
          if ($rootScope.otdPrice.carAge < 12) {
            $rootScope.otdPrice.totalFees = 177.91;
          }
          if ($rootScope.otdPrice.carAge < 10) {
            $rootScope.otdPrice.totalFees = 207.91;
          }
          if ($rootScope.otdPrice.carAge < 7) {
            $rootScope.otdPrice.totalFees = 247.91;
          }
          if ($rootScope.otdPrice.carAge < 4) {
            $rootScope.otdPrice.totalFees = 277.91;
          }
        }


        /*        if($rootScope.otdPrice.carAge > 11){ $rootScope.otdPrice.totalFees = 460; }
         if($rootScope.otdPrice.carAge < 12){ $rootScope.otdPrice.totalFees = 500; }
         if($rootScope.otdPrice.carAge < 10){ $rootScope.otdPrice.totalFees = 530; }
         if($rootScope.otdPrice.carAge < 7){ $rootScope.otdPrice.totalFees = 560; }
         if($rootScope.otdPrice.carAge < 4){ $rootScope.otdPrice.totalFees = 600; }*/

        $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.carPrice + $rootScope.otdPrice.docFee);

        $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD - $rootScope.otdPrice.tradeIn);

        if ($rootScope.checkboxModel.value1 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.extWarrany)
        }
        if ($rootScope.checkboxModel.value2 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.vechileMaint)
        }
        if ($rootScope.checkboxModel.value3 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.permaPlate)
        }
        if ($rootScope.checkboxModel.value4 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.titanium)
        }
        if ($rootScope.checkboxModel.value5 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.clearShield)
        }
        if ($rootScope.checkboxModel.value6 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.gapProtect)
        }
        if ($rootScope.checkboxModel.value7 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.tinting)
        }
        if ($rootScope.checkboxModel.value8 == 1) {
          $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.accessories)
        }

        $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.payOff);


        $rootScope.otdPrice.myTaxes = parseInt($rootScope.otdPrice.totalOTD * $rootScope.otdPrice.taxRate);
        $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD + $rootScope.otdPrice.myTaxes + $rootScope.otdPrice.totalFees);
        $rootScope.otdPrice.totalOTD = parseInt($rootScope.otdPrice.totalOTD - $rootScope.otdPrice.downPayment);
        $rootScope.getMonthlyPayment();

      };

      //$rootScope.getOtd();
      $rootScope.myProducts = '';
      $rootScope.printOTD = function () {

        $rootScope.myProducts = '';

        if ($rootScope.checkboxModel.value1 == 1) {
          $rootScope.myProducts = "<br>Mechanical Breakdown Protection: " + formatDollar(parseFloat($rootScope.otdPrice.extWarrany));
        }
        if ($rootScope.checkboxModel.value2 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Vehicle Maintenance: " + formatDollar(parseFloat($rootScope.otdPrice.vechileMaint));
        }
        if ($rootScope.checkboxModel.value3 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Perma Plate: " + formatDollar(parseFloat($rootScope.otdPrice.permaPlate));
        }
        if ($rootScope.checkboxModel.value4 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Titanium: " + formatDollar(parseFloat($rootScope.otdPrice.titanium));
        }
        if ($rootScope.checkboxModel.value5 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Clear Shield: " + formatDollar(parseFloat($rootScope.otdPrice.clearShield));
        }
        if ($rootScope.checkboxModel.value6 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>GAP Protection: " + formatDollar(parseFloat($rootScope.otdPrice.gapProtect));
        }
        if ($rootScope.checkboxModel.value7 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Window Tinting: " + formatDollar(parseFloat($rootScope.otdPrice.tinting));
        }
        if ($rootScope.checkboxModel.value8 == 1) {
          $rootScope.myProducts = $rootScope.myProducts + "<br>Accessories: " + formatDollar(parseFloat($rootScope.otdPrice.accessories));
        }

        $rootScope.myPrintOut = "<img src='https://kgmimaging.com/marketing/Utah/HondaRiverdale/Specials/151001_Specials/151001_SpecialsFooter.png' style='width: 100%'> <br><h2>Pricing</h2>" +
          "<br>Car Info: " + $rootScope.otdPrice.carInfo +
          "<br>Stock Number: " + $rootScope.otdPrice.stockNumber +
          "<br>Car Price: " + formatDollar(parseFloat($rootScope.otdPrice.carPrice)) +
          "<br>Taxes: " + formatDollar(parseFloat($rootScope.otdPrice.myTaxes)) +
          "<br>Doc Fee: " + formatDollar(parseFloat($rootScope.otdPrice.docFee)) +
          "<br>License & Fees: " + formatDollar(parseFloat($rootScope.otdPrice.totalFees)) +
          "<br>Trade In: " + formatDollar(parseFloat($rootScope.otdPrice.tradeIn)) +
          "<br>Payoff: " + formatDollar(parseFloat($rootScope.otdPrice.payOff)) +
          "<br>Down Payment: " + formatDollar(parseFloat($rootScope.otdPrice.downPayment)) +
          "<br>F&I Products: " + $rootScope.myProducts +
          "<br>Total: <b>" + formatDollar(parseFloat($rootScope.otdPrice.totalOTD)) + "</b>" +
          "<br><br>Term: " + $rootScope.otdPrice.term + " months " +
          "<br>Interest: " + $rootScope.otdPrice.interest + " % " +
          "<br>Payment: <b>" + formatDollar(parseFloat($rootScope.otdPrice.mothlyPayment)) + "</b>" +
          "<br>This does not constitute a contract or agreement to purchase a vehicle.";

        cordova.plugins.printer.print($rootScope.myPrintOut, {duplex: 'none'}, function (res) {
          // alert(res );
          if (res == false) {
            return;
          }

          alert('Print Job ' + (res));
        });
      };


      //OTD Code
      //$cordovaGoogleAnalytics.trackView('OTD Opened');
      // Form data for the login modal
      $rootScope.loginData = {};
      $rootScope.myStockNum = {};

      $rootScope.mainTitle = "Pricing";


      //Todo Lease Modal

      $rootScope.leaseInfo = {
        msrp: 24635,
        sellPrice: 23065,
        moneyFactor: 0.00080,
        residual: 0.60,
        downPayment: 2000,
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
        grossCap: 0
      };

      $rootScope.calcLease = function () {
        //Get residual

        $rootScope.leaseInfo.endBuyout = ($rootScope.leaseInfo.msrp * $rootScope.leaseInfo.residual).toFixed(2);

        $rootScope.leaseInfo.grossCap = $rootScope.leaseInfo.sellPrice + $rootScope.leaseInfo.acqFee + 10;

        $rootScope.leaseInfo.netCap = $rootScope.leaseInfo.grossCap - ( $rootScope.leaseInfo.downPayment - 1114) - ($rootScope.leaseInfo.tradeIn - $rootScope.leaseInfo.payOff);

//          $rootScope.leaseInfo.netCap = ($rootScope.leaseInfo.sellPrice - ($rootScope.leaseInfo.downPayment) - ($rootScope.leaseInfo.tradeIn - $rootScope.leaseInfo.payOff)) + 885 ;

        $rootScope.leaseInfo.depValue = ($rootScope.leaseInfo.netCap - $rootScope.leaseInfo.endBuyout) / $rootScope.leaseInfo.paymentNum;

        $rootScope.leaseInfo.myFinance = (parseInt($rootScope.leaseInfo.netCap) + parseInt($rootScope.leaseInfo.endBuyout)) * $rootScope.leaseInfo.moneyFactor;

        $rootScope.leaseInfo.salesTax = $rootScope.leaseInfo.depValue * $rootScope.leaseInfo.taxRate;

        $rootScope.leaseInfo.leasePayment = ($rootScope.leaseInfo.myFinance + $rootScope.leaseInfo.depValue) + $rootScope.leaseInfo.salesTax;

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


      $cordovaGoogleAnalytics.trackView('Home Screen');

      $rootScope.hondaNewBaseURL = 'https://www.kengarffhondariverdale.com/new-inventory/index.htm?search=';
      $rootScope.hondaUsedBaseURL = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?search=';

      $rootScope.kenGarffUsedbaseURL = 'https://www.kengarff.com/' + $rootScope.searchCarsParams.type + '-inventory/index.htm?internetPrice=' + $rootScope.searchCarsParams.price + '&search=' + $rootScope.searchCarsParams.term + '&geoZip=' + $rootScope.searchCarsParams.zip + '&geoRadius=' + $rootScope.searchCarsParams.radius + '&sortBy=internetPrice+asc&';

      $rootScope.trackItem = function (name, detail) {
        $cordovaGoogleAnalytics.trackEvent(name, detail);
      };


      Date.prototype.getWeekNumber = function () {
        /*  var d = new Date(+this);
         d.setHours(0, 0, 0, 0);
         d.setDate(d.getDate() + 4 - (d.getDay() || 7));
         return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);*/

        // Copy date so don't modify original
        var d = new Date(+d);
        d.setHours(0, 0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        // alert(weekNo);
        return weekNo;


      };

      //Schedules
      $http.get('http://kengarff.cincyplanet.com/schedule.js')
        .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $rootScope.schedules = response.data;
          result = new Date().getWeekNumber();

          var weekNum = $filter('date')(new Date(), 'ww');

          if ((weekNum % 2) == 0) {
            $rootScope.whichWeek = true
          } else {
            $rootScope.whichWeek = false
          }

          // alert($rootScope.whichWeek);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("Error " + JSON.stringify(response))
        });

      $rootScope.doRefresh = function () {
        $http.get('http://kengarff.cincyplanet.com/schedule.js')
          .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.schedules = response.data;
            $rootScope.whichWeek = new Date().getWeekNumber() % 1;
            //alert($scope.staffList[0].name)
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error " + JSON.stringify(response))
          })
          .finally(function () {
            // Stop the ion-refresher from spinning
            $rootScope.$broadcast('scroll.refreshComplete');
          });
      };


      //Check Sign In
      /* firebase.auth().createUserWithEmailAndPassword('brandonbatie@gmail.com', 'password').catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       alert(errorCode + ' ' + errorMessage);
       });*/


      $rootScope.signIn = function () {

        $rootScope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="email" ng-model="data.email"><input type="password" ng-model="data.password">',
          title: 'Enter Signin Email and Password',
          subTitle: 'Please use normal things',
          scope: $rootScope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$rootScope.data.email && !$rootScope.data.password) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $rootScope.data;
                }
              }
            }
          ]
        });

        myPopup.then(function (res) {
          console.log('Tapped!', res);
          firebase.auth().signInWithEmailAndPassword($rootScope.data.email, $rootScope.data.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorCode + ' ' + errorMessage);
          });
        });


      };


      $rootScope.aboutScreen = function () {

        $rootScope.checkUpdate();

        /*  $ionicPopup.alert({
         title: 'About:',
         template: 'Copyright Cincyplanet 2016. All rights reserved. App version is: ' + $rootScope.myVersion +
         "<br> {{hasUpdate}}"
         });*/
        // $rootScope.signIn();


      };


      $rootScope.flashlight = function () {
        $cordovaFlashlight.toggle()
          .then(function (success) { /* success */
            },
            function (error) { /* error */
            });
      };

      $rootScope.$on('$cordovaLocalNotification:schedule',
        function (event, notification, state) {
          // ...
          console.log("alert fired");
        });

      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          // ...
          //console.log("alert trigger");
          //alert(JSON.stringify(notification));
          $cordovaVibration.vibrate(1000);
          navigator.notification.beep();

          //Todo play media file for better sound

          $ionicPopup.alert({
            title: notification.title,
            template: notification.text
          })

        });

      $rootScope.$on('$cordovaLocalNotification:update',
        function (event, notification, state) {
          // ...
          console.log('Updated!')
        });

      $rootScope.$on('$cordovaLocalNotification:clear',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:clearall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:cancel',
        function (event, notification, state) {
          // ...
          console.log('Cancelled!');
        });

      $rootScope.$on('$cordovaLocalNotification:cancelall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:click',
        function (event, notification, state) {
          // ...
          // console.log("alert clicked");
          $state.go('toDo');
        });


      ///////////////
      //Lot Tech
      ///////////////////
// Initialize Firebase
      /* var config = {
       apiKey: "AIzaSyCU2ICgeFh3r3pvqWmj3cUj4DIjNgIxpWc",
       authDomain: "kengarff-780c5.firebaseapp.com",
       databaseURL: "https://kengarff-780c5.firebaseio.com"
       };*/
      var ref;
      setTimeout(function () {
        // firebase.initializeApp(config);

        ref = firebase.database().ref().child($rootScope.myDealership);

        $rootScope.messages = $firebaseArray(ref);

        ref1 = firebase.database().ref().child('users');

        $rootScope.users = $firebaseArray(ref1);

      }, 3000);


      $rootScope.addNew = function () {
        var d = new Date();
        var n = d.toLocaleString();


        $rootScope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.stockNumber" placeholder="Stock Number"><input type="text" ng-model="data.note" placeholder="What does it need?">',
          title: 'Enter Item Details',
          subTitle: 'Enter Vehicle details.',
          scope: $rootScope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$rootScope.data.stockNumber && !$rootScope.data.note) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $rootScope.data;
                }
              }
            }
          ]
        });


        myPopup.then(function (res) {
          console.log('Tapped!', res);
          $rootScope.messages.$add({
            stockNumber: $rootScope.data.stockNumber,
            note: $rootScope.data.note,
            timestamp: n,
            addedby: 'coming soon',
            done: false
          });
          $cordovaGoogleAnalytics.trackEvent('Lot Tech Add Item', 'Stock: ' + $rootScope.data.stockNumber);

        });


      };


      $rootScope.update = function (x) {
        //update local storage 100 ms after the checkbox is clicked to allow it to process
        setTimeout(function () {
          $rootScope.messages.$save(x);
        }, 200)

      };

      $rootScope.deleteChecked = function () {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Remove Completed?',
          template: 'Remove all completed items? This cannot be undone!'
        });

        confirmPopup.then(function (res) {
          if (res) {
            angular.forEach($rootScope.messages, function (x) {
              //add any non-done items to todo list
              if (x.done) $rootScope.messages.$remove(x);//  $rootScope.messages.$set(x.$remove );
            });
          } else {
            console.log('You are not sure');
          }
        });

      };

      //////
      /////
      //END LOT TECH


      ///$rootScope.getHondas = function(){


      $http.get('https://api.edmunds.com/api/vehicle/v2/' + $rootScope.myBrand + '/models?state=new&view=basic&fmt=json&api_key=69warnfcn6wnhx2bb5fh4xn5')
        .then(function (response) {

          $rootScope.allHondas = response.data.models;

        }, function (error) {
          // $scope.error2 = JSON.stringify(error);
          var alertPopup = $ionicPopup.alert({
            title: 'ERROR!',
            template: "There was an error reading the barcode or with the VIN info decoding."
          });

          alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        });


      //   };

      $rootScope.vinDecode = {
        make: '',
        model: '',
        trim: '',
        year: '',
        type: ''
      };


      $rootScope.getCarFax = function (vin) {
        $cordovaInAppBrowser.open('https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=AMA_0&vin=' + vin, '_blank', $rootScope.defaultOptions)

          .then(function (event) {// success
            // alert(JSON.stringify(event))
          })
          .catch(function (event) {// error
          });
      };

      $rootScope.copyVIN = function (vin) {
        $cordovaClipboard
          .copy(vin)
          .then(function () {
            // success
          }, function () {
            // error
          });

      };


      //TODO Save Decoded VINs

      if (localStorage.getItem("myVins") == null) {
        /* $rootScope.vinList = [{
         vin: 'JHLRD77874C026456',
         year: '2004',
         make: 'Honda',
         model: 'CRV',
         style: 'Passenger Car'
         }];*/
        //  localStorage.setItem("myVins", angular.toJson($rootScope.vinList));

      } else {
        //set the todolist from local storage
        $rootScope.vinList = angular.fromJson(localStorage.getItem("myVins"));
        for (i = 0; i < $rootScope.vinList.length; i++) {
          //  alert($rootScope.vinList[i].private);
        }
      }


      $rootScope.currentVehicle = {};

      $rootScope.deleteVin = function (myVin) {
        console.log("Items: " + $rootScope.vinList.length);
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete VIN: ' + myVin + '? ',
          template: 'Are your sure you want to delete this VIN?'
        });

        confirmPopup.then(function (res) {
          if (res) {


            for (i = 0; i < $rootScope.vinList.length; i++) {
              if ($rootScope.vinList[i].vin == myVin) {
                $rootScope.vinList.splice(i, 1);
                localStorage.setItem("myVins", angular.toJson($rootScope.vinList));
                console.log('You are sure');
              }
            }

            /*      $rootScope.vinList.splice(index,1);
             localStorage.setItem("myVins", angular.toJson($rootScope.vinList));
             if($rootScope.vinList.length == 0){
             localStorage.removeItem("myVins");
             }*/


          } else {
            console.log('You are not sure');
          }
        });
      };

      $rootScope.carFeed = [];


      $rootScope.dealerVault = function () {
        $ionicLoading.show({
          template: 'Checking DealerVault...',
          duration: 30000
        }).then(function () {
          console.log("The loading indicator is now displayed");
        });
        Papa.parse("http://kengarff.cincyplanet.com/CommaDelimited.csv", {
          download: true,
          header: false,
          delimiter: "",	// auto-detect
          newline: "",	// auto-detect
          complete: function (results) {
            //alert(results.data);
            $ionicLoading.hide();
            $rootScope.carFeed = results.data;
            console.log($rootScope.carFeed[5]);
            console.log($rootScope.carFeed[5][0]);
            //alert(JSON.stringify($rootScope.carFeed[5],null, ' '));
            /*for (i = 0; i < $rootScope.carFeed.length; i++) {
             console.log($rootScope.carFeed[i]);

             }*/
          }
        });
      }


      $rootScope.getVINInfo = function (vin, add) {

        $cordovaGoogleAnalytics.trackEvent('Get VIN Info', vin);

        $ionicLoading.show({
          template: 'Checking VIN...',
          duration: 10000
        }).then(function () {
          console.log("The loading indicator is now displayed");
        });


        if (vin.length != 17) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'VIN Length Error',
            template: "The VIN must be 17 characters in length! This one is: " + vin.length
          });
          $cordovaGoogleAnalytics.trackEvent('VIN Error', 'Not 17');
          return;
        }


        //$rootScope.searchCarsParams.vin = vin;


        //EDMUNDS VIN DECODE API

        $http.get('https://api.edmunds.com/api/vehicle/v2/vins/' + vin + '?fmt=json&api_key=69warnfcn6wnhx2bb5fh4xn5')
          .then(function (response) {
            $ionicLoading.hide();
            $rootScope.currentVehicle = response.data;

            /*         var myMessage = 'Year: ' + response.data.years[0].year  + '<br>' +
             'Make: ' + response.data.make.name  + '<br>' +
             'Model: ' + response.data.model.name + '<br>' +
             'Style: ' + response.data.years[0].styles[0].name;

             var alertPopup = $ionicPopup.alert({
             title: 'Car Info',
             template: myMessage
             });
             */


            var ourCar = false;

            var myStockNumber = '';

            for (i = 0; i < $rootScope.newCars.length; i++) {
              if ($rootScope.newCars[i].VIN == vin) {
                var myyear = $rootScope.newCars[i].Vehicle.toString();
                myStockNumber = $rootScope.newCars[i].car['Stock #'];
                console.log(myyear.substring(0, 5));
                $rootScope.otdPrice.carYear = parseInt(myyear.substring(0, 5));
                $rootScope.otdPrice.carPrice = $rootScope.newCars[i].Price;
                ourCar = true;
                $rootScope.otdPrice.choice = 'new';
                $rootScope.buttons = [
                  {text: 'Get CarFax'},
                  {text: 'View Web Listing'},
                  {text: 'Get OTD'}
                ];
                break;
              }

            }

            if (ourCar == false) {
              for (i = 0; i < $rootScope.usedCars.length; i++) {
                if ($rootScope.usedCars[i].VIN == vin) {
                  var myyear = $rootScope.usedCars[i].Vehicle.toString();
                  myStockNumber = $rootScope.usedCars[i]['Stock #'];
                  console.log(myyear.substring(0, 5));
                  $rootScope.otdPrice.carYear = parseInt(myyear.substring(0, 5));
                  $rootScope.otdPrice.carPrice = $rootScope.usedCars[i].Price;
                  ourCar = true;
                  $rootScope.otdPrice.choice = 'used';
                  $rootScope.buttons = [
                    {text: 'Get CarFax'},
                    {text: 'View Web Listing'},
                    {text: 'Get OTD'}
                  ];
                  break;
                }

              }
            }


            if (add == true) {
              //If greater than 10 remove fisrt one
              if ($rootScope.vinList.length > 10) {
                $rootScope.vinList.splice(0, 1)
              }

              //if there is text add it to the array
              $rootScope.vinList.push({
                vin: vin,
                year: response.data.years[0].year,
                make: response.data.make.name,
                model: response.data.model.name,
                style: response.data.years[0].styles[0].name,
                drive: response.data.drivenWheels,
                retail: response.data.price.usedTmvRetail,
                private: response.data.price.usedPrivateParty,
                tradein: response.data.price.usedTradeIn,
                msrp: response.data.price.baseMSRP,
                invoice: response.data.price.baseInvoice,
                deliveryCharges: response.data.price.deliveryCharges,
                doors: response.data.numOfDoors,
                style: response.data.categories.vehicleStyle,
                modelID: response.data.years[0].styles[0].id,
                hiwayMPG: response.data.MPG.highway,
                cityMPG: response.data.MPG.city,
                stockNumber: myStockNumber
              });

              //alert(response.data.years[0].styles[0].id)

              localStorage.setItem("myVins", angular.toJson($rootScope.vinList));
            }


            if (ourCar == false) {
              $rootScope.buttons = [
                {text: 'Get CarFax'}
              ];
            }

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
              buttons: $rootScope.buttons/*[
               {text: 'Search New'},
               {text: 'Search Used'},
               {text: 'Get CarFax'},
               {text: 'Get VehicleHistory.com'}
               ]*/,
              /*  destructiveText: 'Cancel',*/
              titleText: '<h3>' + response.data.years[0].year + ' ' + response.data.make.name + ' ' + response.data.model.name + '</h3><br>' + response.data.years[0].styles[0].name + '<br><b>' + myStockNumber + '</b>',
              cancelText: 'Cancel',
              cancel: function () {
                // add cancel code..
              },
              buttonClicked: function (index) {
                switch (index) {

                  case 0:
                    //Get Car Fax
                    $rootScope.getCarFax(vin);
                    break;
                  case 1:
                    //Search New
                    $cordovaInAppBrowser.open('https://www.kengarff.com/all-inventory/index.htm?search=' + vin, '_blank', $rootScope.defaultOptions)
                      .then(function (event) {// success
                      })
                      .catch(function (event) {// error
                      });
                    break;

                  case 2:
                    $rootScope.getOtd();
                    $state.go('tabsController.oTD');
                    break;
                }

                return true;
              }
            });


          }, function (error) {
            // $scope.error2 = JSON.stringify(error);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'ERROR!',
              template: "There was an error reading the barcode or with the VIN info decoding."
            });

            alertPopup.then(function (res) {

              console.log('Thank you for not eating my delicious ice cream cone');
            });
          });

      };


      $rootScope.searchSite = function (year, name) {
        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
        };

        name = name.replace('Special Edition', 'SE');
        name = name.replace('V-6', 'V6');
        name = name.replace('2dr', '');
        name = name.replace('4dr', '');

        var myURL = $rootScope.hondaNewBaseURL + name;

        $cordovaInAppBrowser.open(myURL, '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Site Search', 'Search from Models list');
          })
          .catch(function (event) {// error
          });
      };


      $rootScope.scanCode = function (index) {

        /* if (index == 1) {

         window.plugins.VINBarcodeScanner.scan(function (result) {

         if (result.VINCode < 1) {
         return;
         }
         $rootScope.copyVIN(result.VINCode);
         $rootScope.getVINInfo(result.VINCode, true);

         }, function (message) {
         $ionicPopup.alert({
         title: 'Barcode Failure',
         template: message
         });

         });

         return;
         }
         */

        cordova.plugins.barcodeScanner
          .scan(
            function (barcodeData) {
              // Success! Barcode data is here
              // alert(barcodeData.format + ' | ' + barcodeData.text)

              switch (barcodeData.format) {
                case '':
                  /*                   $ionicPopup.alert({
                   title: 'CANCELLED!',
                   template: "Scan Cancelled!"
                   });*/
                  break;
                case 'QR_CODE':
                  //Website
                  if (barcodeData.text.indexOf('http') > -1 || barcodeData.text.indexOf('www') > -1 || barcodeData.text.indexOf('.com') > -1) {
                    $cordovaInAppBrowser.open(barcodeData.text, '_blank', $rootScope.defaultOptions)
                      .then(function (event) {// success
                        $cordovaGoogleAnalytics.trackEvent('QR Code', 'Site scanned');
                      })
                      .catch(function (event) {// error
                      });
                  } else {  //what to do on invalid qr url... maybe nothing
                    $ionicPopup.alert({
                      title: 'ERROR!',
                      template: "Not a valid website!"
                    });
                  }
                  break;
                case 'UPC_A':
                  //alert('code is UPCA');
                  $ionicPopup.alert({
                    title: 'Code Type!',
                    template: "Code is a UPCA, not valid VIN!"
                  });
                  break;
                case 'PDF_417':
                  $rootScope.myName = {};
                  $cordovaGoogleAnalytics.trackEvent('Scan  Code', 'Drivers License');
                  var arrayOfLines = barcodeData.text.match(/[^\r\n]+/g);
                  // alert(JSON.stringify(arrayOfLines, null, "  "));
                  for (var i = 0; i < arrayOfLines.length; i++) {
                    //code here using lines[i] which will give you each line
                    //  if(arrayOfLines[i].length < 5) {return;}
                    // alert(arrayOfLines[i]);//.substring(3, lines[i].length));
                    if (arrayOfLines[i].substring(0, 3) == 'DCS') {
                      $rootScope.myName.lastName = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DAD') {
                      $rootScope.myName.middleName = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DAC') {
                      $rootScope.myName.firstName = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DBB') {
                      $rootScope.myName.dateofbirth = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }

                    if (arrayOfLines[i].substring(0, 3) == 'DBC') {
                      if (arrayOfLines[i].substring(3, arrayOfLines[i].length) == '1') {
                        $rootScope.myName.sex = 'M';
                      }
                      else {
                        $rootScope.myName.sex = 'F';
                        //$rootScope.myName.sex = 'M';//arrayOfLines[i].substring(3, arrayOfLines[i].length)
                      }
                    }

                    if (arrayOfLines[i].substring(0, 3) == 'DAG') {
                      $rootScope.myName.address = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DAI') {
                      $rootScope.myName.city = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DAJ') {
                      $rootScope.myName.state = arrayOfLines[i].substring(3, arrayOfLines[i].length)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DAK') {
                      $rootScope.myName.zip = arrayOfLines[i].substring(3, arrayOfLines[i].length - 6)
                    }
                    if (arrayOfLines[i].substring(0, 3) == 'DCK') {
                      $rootScope.myName.idnumber = arrayOfLines[i].substring(4, arrayOfLines[i].length - 4)
                    }


                  }
                  $cordovaGoogleAnalytics.trackEvent('DL Scanned', 'Drivers license scanned');
                  //alert($rootScope.myName.firstName + ' ' + $rootScope.myName.middleName + ' ' + $rootScope.myName.lastName);
                  $ionicPopup.alert({
                    title: 'Info on Drivers License',
                    template: $rootScope.myName.firstName + ' ' + $rootScope.myName.middleName + ' ' + $rootScope.myName.lastName + '<br>' +
                    $rootScope.myName.address + ' <br>' + $rootScope.myName.city + ' ' + $rootScope.myName.state + ' ' + $rootScope.myName.zip + '<br>ID Number: ' + $rootScope.myName.idnumber
                  });
                  break;
                case 'CODE_39': //VIN is a code 39

                  if (barcodeData.text.length == 18) {
                    $rootScope.copyVIN(barcodeData.text.substr(1));
                    $rootScope.getVINInfo(barcodeData.text.substr(1), true);
                  } else {
                    $rootScope.copyVIN(barcodeData.text);
                    $rootScope.getVINInfo(barcodeData.text, true);
                  }


                  break;
                case 'CODE_128': //VIN is a code 39
                  $rootScope.copyVIN(barcodeData.text);
                  $rootScope.getVINInfo(barcodeData.text, true);

                  break;

                default:
                  //if unknown or cancelled.
                  //  alert(barcodeData.format)
                  $cordovaGoogleAnalytics.trackEvent('Scan Code', 'Unsupported ' + barcodeData.format);
                  $ionicPopup.alert({
                    title: 'Unsupported Barcode',
                    template: "The barcode you are scanning is unsupported at this time."
                  });
              }
              /**
               * Barcode Types
               * QR_CODE - QR open URL
               * CODE_39 - Open VIN search or Vehicle History if possible- carfax?
               * UPC_A
               */

            }, function (error) {
              // An error occurred
              $cordovaGoogleAnalytics.trackEvent('Scan Error', 'Scanning Failed ' + error);
              alert("Scanning failed: " + error);
            },
            {
              preferFrontCamera: false, // iOS and Android
              showFlipCameraButton: false, // iOS and Android
              showTorchButton: true, // iOS and Android
              torchOn: true, // Android, launch with the torch switched on (if available)
              prompt: "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats: "QR_CODE,PDF_417,CODE_39,UPC_A", // default: all but PDF_417 and RSS_EXPANDED
              orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations: true // iOS
            });
      };


      $rootScope.searchUsed = function (searchTerm) {

        if ($rootScope.searchCarsParams.around == true) {
          $rootScope.myURL = $rootScope.kenGarffUsedbaseURL = 'https://www.kengarff.com/' + $rootScope.searchCarsParams.type + '-inventory/index.htm?internetPrice=' + $rootScope.searchCarsParams.price + '&search=' + searchTerm + '&geoZip=' + $rootScope.searchCarsParams.zip + '&geoRadius=' + $rootScope.searchCarsParams.radius + '&sortBy=internetPrice+asc&';
        } else {
          $rootScope.myURL = $rootScope.hondaUsedBaseURL = 'https://www.kengarffhondariverdale.com/used-inventory/index.htm?search=' + searchTerm;
        }


        $cordovaInAppBrowser.open($rootScope.myURL, '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Search Site', 'Search used cars');
          })
          .catch(function (event) {// error
          });

      };

      $rootScope.searchNew = function (searchTerm) {

        $rootScope.myURL = $rootScope.hondaNewBaseURL + searchTerm;


        $cordovaInAppBrowser.open($rootScope.myURL, '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Search Site', 'Search New Cars');
          })
          .catch(function (event) {// error
          });

      };


      //Brand specific URL helpers
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modal = modal;
      });

      $ionicModal.fromTemplateUrl('my-frontline.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modalMag = modal;
      });

      $ionicModal.fromTemplateUrl('my-camera.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.mycamera = modal;
      });


      $rootScope.showCamera = function () {
        $rootScope.mycamera.show();
      };

      $rootScope.watermark = null;
      $rootScope.canvasDom = null;
      $rootScope.canvas = null;
      $rootScope.img = null;

      $rootScope.showButton = false;

      $rootScope.deliverCar = function (vin) {
        //$rootScope.mycamera.show();
        $state.go('camera');
        setTimeout(function () {
          var canvas = document.getElementById("myCanvas");
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#f5eff2";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.font = "25px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText(vin, canvas.width / 2, canvas.height / 2);
          $rootScope.showButton = true;
          var dataURL = canvas.toDataURL('image/jpeg', 1);
          $rootScope.myImage = dataURL;//"data:image/jpeg;base64," + dataURL;
        }, 500)

      };

      $rootScope.takeVin = function () {

        var popover = new CameraPopoverOptions(0, 0, 100, 100, 0);
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: popover,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $rootScope.myImage = "data:image/jpeg;base64," + imageData;
          /*  $rootScope.img = new Image();
           $rootScope.img.src = $rootScope.myImage;*/
        }, function (err) {
          // error
        });
      };

      $rootScope.takeImage = function () {
        var popover = new CameraPopoverOptions(0, 0, 100, 100, 0);
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: popover,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $rootScope.myImage1 = "data:image/jpeg;base64," + imageData;
          /*   $rootScope.img = new Image();
           $rootScope.img.src = $rootScope.myImage1;*/
        }, function (err) {
          // error
        });
      };

      $rootScope.saveImage = function () {

        if ($rootScope.myImage != null) {
          CameraRoll.saveToCameraRoll($rootScope.myImage, function () {
          }, function (err) {
          });
        }

        if ($rootScope.myImage1 != null) {
          CameraRoll.saveToCameraRoll($rootScope.myImage1, function () {
          }, function (err) {
          });
        }

        $rootScope.openDeliveries();
        //Clear Images after saving.
        clearImages();
      };


      $rootScope.myOrientation = true;

      function readDeviceOrientation() {

        if (Math.abs(window.orientation) == 90) {
          // Landscape
          $rootScope.$apply(function () {
            $rootScope.myOrientation = false;
          });

        } else {
          // Portrait
          $rootScope.$apply(function () {
            $rootScope.myOrientation = true;
          });

        }
      }

      window.onorientationchange = readDeviceOrientation;


      $ionicModal.fromTemplateUrl('my-models.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modalModels = modal;
      });

      $ionicModal.fromTemplateUrl('camera-view.html', {
        scope: $rootScope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $rootScope.modalcamera = modal;
      });

      $rootScope.hondaModels = function () {

        $rootScope.modalModels.show();

      };

      $rootScope.toggleGroup = function (group) {
        group.show = !group.show;
      };
      $rootScope.isGroupShown = function (group) {
        return group.show;
      };


      $rootScope.hondaSurvey = function () {
        $cordovaGoogleAnalytics.trackEvent('Honda Info', 'Honda Survey');
        $rootScope.modal.show();

      };

      $rootScope.hondaFrontline = function () {
        $http.get('http://kengarff.cincyplanet.com/frontline.js')
          .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.magList = response.data;
            $rootScope.modalMag.show();
            $cordovaGoogleAnalytics.trackEvent('Honda Info', 'open frontlines');
            //alert($scope.staffList[0].name)
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error " + JSON.stringify(response))
          });

      };


      $rootScope.openPDF = function (url) {

        /*        alert(url)
         $cordovaFileOpener2.open(
         url,
         'application/pdf'
         ).then(function(res) {
         alert(JSON.stringify(res,null,  ' '));
         // file opened successfully
         }, function(err) {
         alert(JSON.stringify(err,null,  ' '));
         // An error occurred. Show a message to the user
         });*/

        if (cordova.platformId == 'ios') {
          $cordovaInAppBrowser.open(url, '_blank', $rootScope.defaultOptions)
            .then(function (event) {// success
            })
            .catch(function (event) {// error
            });
        } else {
          window.open(url, '_system', 'location=no');
        }

      };

      $rootScope.mobileAssist = function () {


        $cordovaInAppBrowser.open('http://www.automobiles.honda.com', '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Honda Info', 'Open mobile assist');
          })
          .catch(function (event) {// error
          });

      };

      $rootScope.hondaOwners = function () {


        $cordovaInAppBrowser.open('http://m.owners.honda.com/', '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Honda Info', 'Open honda owners');
          })
          .catch(function (event) {// error
          });

      };


      $rootScope.techTutor = function () {


        $cordovaInAppBrowser.open('http://www.hondatechtutor.com', '_blank', $rootScope.defaultOptions)
          .then(function (event) {// success
            $cordovaGoogleAnalytics.trackEvent('Honda Info', 'Open tech tutor');
          })
          .catch(function (event) {// error
          });

      };


      //CodePush
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        $rootScope.versionNumber = version;
      });

      //Clear image on the camera view
      $rootScope.clearImages = function () {
        $rootScope.myImage = null;
        $rootScope.myImage1 = null;
      };

      //Clear saved username and password for Customer Deliveries
      $rootScope.clearStorageCD = function () {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Remove All Usernames and Passwords',
          template: 'Are you sure you want to do this? It cannot be undone!'
        });

        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            localStorage.removeItem('cdUsername');
            localStorage.removeItem('cdPassword');
            $rootScope.logins = {
              //Customer Deliveries User/Pass
              cdUsername: '',
              cdPassword: ''
            };

          } else {
            console.log('You are not sure');
          }
        });

      };


      $rootScope.checkUpdate = function () {
        // alert('update');
        $cordovaAppVersion.getVersionNumber().then(function (version) {
          $rootScope.versionNumber = version;
        });

        $ionicPopup.alert({
          title: 'About:',
          template: 'Copyright Cincyplanet 2016-2017. <br>All rights reserved. App version is: ' + $rootScope.versionNumber +
          '<button class="button button-block button-assertive" ng-click="clearStorageCD()">Clear Customer Deliveries Usernames and Password</button>'
        });

        /* $ionicLoading.show({
         template: 'Looking for Update...',
         duration: 30000
         }).then(function(){
         console.log("The loading indicator is now displayed");
         });

         codePush.checkForUpdate(function (update) {
         if (!update) {
         console.log("The app is up to date.");
         $ionicLoading.hide().then(function(){
         console.log("The loading indicator is now hidden");
         });
         $rootScope.hasUpdate = "The app is up to date.";
         $ionicPopup.alert({
         title: 'About:',
         template: 'Copyright Cincyplanet 2016. All rights reserved. App version is: ' + $rootScope.versionNumber +
         "<br> {{hasUpdate}}"
         });
         } else {
         $ionicLoading.show({
         template: 'Loading Update...',
         duration: 30000
         }).then(function(){
         console.log("The loading indicator is now displayed");
         });
         //console.log("An update is available! Should we download it?");
         //$rootScope.hasUpdate = "The app has an update, please restart!";
         codePush.sync(null, { updateDialog: { title: "The app will update then restart!" }, installMode: InstallMode.IMMEDIATE });
         }
         });*/
      };

      if ($rootScope.testing == false) {
        codePush.checkForUpdate(function (update) {
          if (!update) {
            console.log("The app is up to date.");
          } else {
            $ionicLoading.show({
              template: 'Loading Update...',
              duration: 30000
            }).then(function () {
              console.log("The loading indicator is now displayed");
            });
            //console.log("An update is available! Should we download it?");
            //$rootScope.hasUpdate = "The app has an update, please restart!";
            codePush.sync(null, {
              updateDialog: {title: "The app will update then restart!"},
              installMode: InstallMode.IMMEDIATE
            });
          }
        });
      }


      $rootScope.snapshotTimestamp = Date.now();
      $rootScope.reverseCameraTimestamp = Date.now();

      $rootScope.fireOverlay = function () {

        //  $rootScope.modalcamera.show();

        //add ezar block snippet below
        /*  if (window.ezar) {
         ezar.initializeVideoOverlay(
         function() {
         ezar.getBackCamera().start();
         },
         function(err) {
         alert('unable to init ezar: ' + err);
         });
         }*/

        return;

        //ignore ghost clicks, wait 1.5 sec between invocations
        if (Date.now() - $rootScope.snapshotTimestamp < 1500) return;
        $rootScope.snapshotTimestamp = Date.now();

        //get snapshot & revcamera buttons to hide/show
        var snapshotBtn = document.getElementById("snapshot");
        var revCameraBtn = document.getElementById("revcamera");

        var inclWebView = true;    // include/exclude webView content on top of cameraView
        var inclCameraBtns = true; // show/hide snapshot & revcamera btns

        if (inclWebView && !inclCameraBtns) {
          revCameraBtn.classList.add("hide");
          snapshotBtn.classList.add("hide");
        }

        setTimeout(function () {
          ezar.snapshot(
            function () {
              //perform screen capture
              //show snapshot button
              if (inclWebView && !inclCameraBtns) {
                snapshotBtn.classList.remove("hide");
                revCameraBtn.classList.remove("hide");
              }
            }, null,
            {
              encodingType: ezar.ImageEncoding.PNG,
              includeWebView: inclWebView,
              saveToPhotoAlbum: true
            });
        }, 200);

      };


      $rootScope.cameraStart = function () {
        $cordovaGoogleAnalytics.trackView('Camera Opened');
        window.open('camera/index.html', '_self')
      };

      $rootScope.cameraTake = function () {


      };

      $rootScope.stopCameraButton = function () {

      };


      //Add a dynamic quick action with title "Saved" and a built-in "Favorite" icon
      $cordova3DTouch.addQuickAction('search', 'SearchUsed', 'Search', null, 'Search Used Cars', function () {
        //Navigate to target state when the quick action was pressed on home screen
        $state.go('tabsController.scanner');

        $rootScope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.wifi"> <li class="item item-toggle"> Search Around <label class="toggle toggle-assertive">  <input type="checkbox" ng-model="searchCarsParams.around"> <div class="track"> <div class="handle"></div> </div> </label>   </li>',
          title: 'Enter Search Term', subTitle: 'Enter the term to search for in used cars.',
          scope: $rootScope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Search</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$rootScope.data.wifi) {
                  //don't allow the user to close unless he enters wifi password
                  //e.preventDefault();
                } else {
                  $rootScope.searchCarsParams.term = $rootScope.data.wifi;
                  $rootScope.searchUsed($rootScope.data.wifi);
                }
              }
            }
          ]
        });


      });


//Add a dynamic quick action with title "Saved" and a built-in "Favorite" icon
      $cordova3DTouch.addQuickAction('schedules', 'schedules', 'Contact', null, 'Show Schedules', function () {
        //Navigate to target state when the quick action was pressed on home screen
        $state.go('tabsController.models');
      });


//Add a dynamic quick action with title "Saved" and a built-in "Favorite" icon
      $cordova3DTouch.addQuickAction('scanner', 'Scanner', 'CapturePhoto', null, 'Scan Code', function () {
        //Navigate to target state when the quick action was pressed on home screen
        $state.go('tabsController.scanner');
        $rootScope.scanCode();
      });

      //Add a dynamic quick action with title "Saved" and a built-in "Favorite" icon
      $cordova3DTouch.addQuickAction('customer', 'Customer Delivery', 'Delivery', null, 'Customer Delivery', function () {
        //Navigate to target state when the quick action was pressed on home screen
        //TEMPORARY GO TO TO DO LIST
        $rootScope.openDeliveries();
      });


      $rootScope.usedCars = [];
      $rootScope.newCars = [];
      $rootScope.orderType = 'Price';

      Papa.parse("http://kengarff.cincyplanet.com/Previously Owned.csv", {
        download: true,
        header: true,
        complete: function (results) {
          $rootScope.usedCars = results.data;
          for (i = 0; i < $rootScope.usedCars.length; i++) {
            $rootScope.usedCars[i].carYear = parseInt($rootScope.usedCars[i].Vehicle);
            $rootScope.usedCars[i].Price = parseInt($rootScope.usedCars[i].Price);
          }
        }
      });


      Papa.parse("http://kengarff.cincyplanet.com/New Cars.csv", {
        download: true,
        header: true,
        complete: function (results) {
          $rootScope.newCars = results.data;
          for (i = 0; i < $rootScope.newCars.length; i++) {
            $rootScope.newCars[i].carYear = parseInt($rootScope.newCars[i].Vehicle);
            $rootScope.newCars[i].Price = parseInt($rootScope.newCars[i].Price);
          }
        }
      });


      $rootScope.sortBy = function (propertyName) {
        $rootScope.orderType = propertyName;
      };

      $rootScope.getPricing = function (year, price, stockNumber, type) {

        $rootScope.otdPrice.choice = type;

        $state.go('tabsController.oTD');

        setTimeout(function () {
          $rootScope.$apply(function () {
            $rootScope.otdPrice.carInfo = year;
            $rootScope.otdPrice.carYear = parseInt(year.substring(0, 5));
            $rootScope.otdPrice.carPrice = parseInt(price);
            $rootScope.otdPrice.stockNumber = stockNumber;
            $rootScope.getOtd();
          });
        }, 200);


      }


    });
  });



