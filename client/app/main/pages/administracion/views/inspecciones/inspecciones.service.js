(function ()
{
    'use strict';

    angular
        .module('app.administracion')
        .factory('InspeccionesService', [ '$document', '$http', '$mdDialog', '$q', 'Auth', 'ApiEndpoint', 'msApi', InspeccionesService] );

    /** @ngInject */
    function InspeccionesService( $document, $http, $mdDialog, $q, Auth, ApiEndpoint, msApi)
    {
        var id = parseInt(new Date().valueOf(), 16);
        var lista = [];
        var boardInfo = {name: '', id: ''};
        var service = {

            data: {
                name    : 'Untitled Board',
                uri     : 'untitled-board',
                id      : id,
                settings: {
                    color          : '',
                    subscribed     : false,
                    cardCoverImages: true
                },
                lists   : [],
                cards   : [],
                members : [
                    {
                        id    : '56027c1930450d8bf7b10758',
                        name  : 'Alice Freeman',
                        avatar: 'assets/images/avatars/alice.jpg'
                    },
                    {
                        id    : '26027s1930450d8bf7b10828',
                        name  : 'Danielle Obrien',
                        avatar: 'assets/images/avatars/danielle.jpg'
                    },
                    {
                        id    : '76027g1930450d8bf7b10958',
                        name  : 'James Lewis',
                        avatar: 'assets/images/avatars/james.jpg'
                    },
                    {
                        id    : '36027j1930450d8bf7b10158',
                        name  : 'Vincent Munoz',
                        avatar: 'assets/images/avatars/vincent.jpg'
                    }
                ],
                labels  : [
                    {
                        id   : '26022e4129ad3a5sc28b36cd',
                        name : 'High Priority',
                        color: 'red'
                    },
                    {
                        id   : '56027e4119ad3a5dc28b36cd',
                        name : 'Design',
                        color: 'orange'
                    },
                    {
                        id   : '5640635e19ad3a5dc21416b2',
                        name : 'App',
                        color: 'blue'
                    },
                    {
                        id   : '6540635g19ad3s5dc31412b2',
                        name : 'Feature',
                        color: 'green'
                    }
                ]
            },
            addNewBoard : addNewBoard,
            getBoardData: getBoardData,
            openCardDialog: openCardDialog,
            addCard: addCard,
            getCard: getCard,
            setBoardInfo: setBoardInfo,
            getBoardInfo: getBoardInfo,
            getInspection: getInspection,
            createInspection: createInspection,
            updateInspection: updateInspection,
            name   : '',
            labels : [],
            members: [],
            clear  : clear,
            isOn   : isOn
        };

        /**
         * Open card dialog
         *
         * @param ev
         * @param cardId
         */

         function addCard(card){
           lista.push(card);
         }

         function getCard(){
           return lista;
         }

         function setBoardInfo(value){
           boardInfo = value;
         }

         function getBoardInfo(){
           return boardInfo;
         }

        function openCardDialog(ev, cardId) {
            $mdDialog.show({
                templateUrl: 'app/main/pages/administracion/views/inspecciones/dialogs/card/card-dialog.html',
                controller: 'ScrumboardCardDialogController',
                controllerAs: 'vm',
                parent: $document.find('#scrumboard'),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                locals: {
                    cardId: cardId
                }
            });
        }

        /**
         * Clear
         */
        function clear()
        {
            service.name = '';
            service.labels = [];
            service.members = [];
        }

        /**
         * Is on
         *
         * @returns {boolean}
         */
        function isOn()
        {
            return (service.name === '' && service.labels.length === 0 && service.members.length === 0 ) ? false : true;
        }


        /**
         * Get board data from the server
         *
         * @param boardId
         * @returns {*}
         */
        function getBoardData(boardId)
        {
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('scrumboard.board@get', {id: boardId},

                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the promise
                    deferred.resolve(response);
                },

                // ERROR
                function (response)
                {
                    // Reject the promise
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        /**
         * Create an empty board object and set it.
         *
         * For the demonstration purposes, we are creating the
         * empty object in the javascript which you wouldn't do
         * it in real life. Rather, you would make an API call
         * to your server to generate an empty object that fills
         * some of the areas for you like an ID, labels, members
         * or the default board settings.
         *
         * Then you would grab the response that comes from
         * the API call and attach it to the service.data object.
         */
        function addNewBoard()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Here you would make an API call to your server...
            _generateEmptyScrumboardObject().then(
                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the response
                    deferred.resolve(response);
                },
                // ERROR
                function (response)
                {
                    // Reject the response
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        /**
         * Dummy function for generating an empty
         * scrumboard object for demonstration
         * purposes
         *
         * @private
         * returns {$promise}
         */
        function _generateEmptyScrumboardObject()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Fake id generator
            var id = parseInt(new Date().valueOf(), 16);

            // Prepare an empty scrumboard object
            var emptyObject = {
                data: {
                    name    : 'Untitled Board',
                    uri     : 'untitled-board',
                    id      : id,
                    settings: {
                        color          : '',
                        subscribed     : false,
                        cardCoverImages: true
                    },
                    lists   : [],
                    cards   : [],
                    members : [
                        {
                            id    : '56027c1930450d8bf7b10758',
                            name  : 'Alice Freeman',
                            avatar: 'assets/images/avatars/alice.jpg'
                        },
                        {
                            id    : '26027s1930450d8bf7b10828',
                            name  : 'Danielle Obrien',
                            avatar: 'assets/images/avatars/danielle.jpg'
                        },
                        {
                            id    : '76027g1930450d8bf7b10958',
                            name  : 'James Lewis',
                            avatar: 'assets/images/avatars/james.jpg'
                        },
                        {
                            id    : '36027j1930450d8bf7b10158',
                            name  : 'Vincent Munoz',
                            avatar: 'assets/images/avatars/vincent.jpg'
                        }
                    ],
                    labels  : [
                        {
                            id   : '26022e4129ad3a5sc28b36cd',
                            name : 'High Priority',
                            color: 'red'
                        },
                        {
                            id   : '56027e4119ad3a5dc28b36cd',
                            name : 'Design',
                            color: 'orange'
                        },
                        {
                            id   : '5640635e19ad3a5dc21416b2',
                            name : 'App',
                            color: 'blue'
                        },
                        {
                            id   : '6540635g19ad3s5dc31412b2',
                            name : 'Feature',
                            color: 'green'
                        }
                    ]
                }
            };

            // Resolve the promise
            deferred.resolve(emptyObject);

            return deferred.promise;
        }

        function getInspection(id){
          var deferred = $q.defer();

          $http.get(ApiEndpoint.inspections.uri +'/'+ id ).then(function successCallback(getResult){
            deferred.resolve(getResult);

          }, function errorCallback(err){
            console.log("error in update->get inspection");
            deferred.resolve(undefined);
          });

          return deferred.promise;
        }

        function createInspection(data){
          addNewBoard();
          lista = [];
          boardInfo = {name: '', id: ''};
          var deferred = $q.defer();
          var param = {
            name: data.name,
            customer: {
              localId:   Auth.getCurrentUser().customer.localId,
              localName: Auth.getCurrentUser().customer.localName
            },
            check: []
          };

          $http.post(ApiEndpoint.inspections.uri, param).then(function successCallback(result){
            console.log("éxito al crear inspección", result);
            deferred.resolve(result);

          }, function errorCallback(err){
            console.log("error in create inspection");
            deferred.resolve(undefined);
          });

          return deferred.promise;

        }

        function updateInspection(data){
          var deferred = $q.defer();
          //console.log("data for service inspection update", data);
          $http.put(ApiEndpoint.inspections.uri +'/'+ boardInfo.id, data).then(function successCallback(result){
            console.log("éxito al actualizar inspección", result);
            deferred.resolve(result);

          }, function errorCallback(err){

            console.log("error in update inspection", err);
            deferred.resolve(undefined);
          });

          return deferred.promise;
        }

         return service;
    }



})();
