angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.scanner', {
    url: '/scanner',
        cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      }
    }
  })

  .state('tabsController.oTD', {
    url: '/otd',
    cache: false,
    views: {
      'tab2': {
        templateUrl: 'templates/oTD.html',
        controller: 'oTDCtrl'
      }
    }
  })

  .state('tabsController.models', {
    url: '/model',
    cache: false,
    views: {
      'tab3': {
        templateUrl: 'templates/models.html',
        controller: 'modelsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/scanner',
    cache: false,
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('toDo', {
    url: '/todo',
    cache: false,
    templateUrl: 'templates/toDo.html',
    controller: 'toDoCtrl'
  })

    .state('camera', {
      url: '/camera',
      cache: false,
      templateUrl: 'templates/camera.html',
      controller: 'cameraCtrl'
    })

      .state('lotTech', {
        url: '/lotTech',
        cache: false,
        templateUrl: 'templates/lotTech.html',
        controller: 'lotTechCtrl'
      })

    .state('contacts', {
      url: '/contacts',
      cache: false,
      templateUrl: 'templates/contacts.html',
      controller: 'contactsCtrl'
    })

    .state('usedCars', {
      url: '/usedCars',
      cache: false,
      templateUrl: 'templates/usedCars.html',
      controller: 'usedcarsCtrl'
    })

    .state('newCars', {
      url: '/newCars',
      cache: false,
      templateUrl: 'templates/newCars.html',
      controller: 'newcarsCtrl'
    })

  .state('staffListing', {
    url: '/staff',
    cache: false,
    templateUrl: 'templates/staffListing.html',
    controller: 'staffListingCtrl'
  });

$urlRouterProvider.otherwise('/scanner/scanner')



});
