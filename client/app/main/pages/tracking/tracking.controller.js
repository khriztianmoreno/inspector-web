(function ()
{
  'use strict';

  angular
    .module('app.pages.tracking')
    .controller('BoardViewController', BoardViewController);

  /** @ngInject */
  function BoardViewController($mdSidenav, $document, $window, $timeout,
  $mdDialog, $http, msUtils, BoardList, BoardService, CardFilters,
  DialogService, BoardData, Providers)
  {
    var vm = this;

    // Data
    vm.currenDate= new Date();
    vm.trackingCards = BoardData.data;
    vm.trackingCards.due = vm.currenDate.setDate(vm.currenDate.getDate() + 10);
    vm.providers = Providers.data;
    vm.boardList = BoardList.data.lists;

    // Methods
    vm.openCardDialog = openCardDialog;
    vm.addNewList = addNewList;
    vm.removeList = removeList;
    vm.cardFilter = cardFilter;
    vm.isOverdue = isOverdue;
    vm.toggleSidenav = toggleSidenav;
    vm.updateBoardUri = updateBoardUri;
    vm.clearFilters = CardFilters.clear;
    vm.filteringIsOn = CardFilters.isOn;

    //////////

    init();

    /**
    * Initialize
    */
    function init()
    {

      $timeout(function ()
      {
        // IE list-content max-height hack
        if ( angular.element('html').hasClass('explorer') )
        {
          // Calculate the height for the first time
          calculateListContentHeight();

          // Attach calculateListContentHeight function to window resize
          $window.onresize = function ()
          {
            calculateListContentHeight();
          };
        }
      }, 0);

    }

    /**
    * IE ONLY
    * Calculate the list-content height
    * IE ONLY
    */
    function calculateListContentHeight()
    {
      var boardEl = angular.element('#board');
      var boardElHeight = boardEl.height();

      boardEl.find('.list-wrapper').each(function (index, el)
      {
        // Get the required heights for calculations
        var listWrapperEl = angular.element(el),
        listHeaderElHeight = listWrapperEl.find('.list-header').height(),
        listFooterElHeight = listWrapperEl.find('.list-footer').height();

        // Calculate the max height
        var maxHeight = boardElHeight - listHeaderElHeight - listFooterElHeight;

        // Add the max height
        listWrapperEl.find('.list-content').css({'max-height': maxHeight});
      });
    }

    /**
    * Open card dialog
    *
    * @param ev
    * @param cardId
    */
    function openCardDialog(ev, cardInfo, statusId, providers)
    {
      switch (statusId) {
            case 1:
                $mdDialog.show({
                  templateUrl        : 'app/main/pages/tracking/dialogs/card/pending/pending-dialog.html',
                  controller         : 'PendingDialogController',
                  controllerAs       : 'vm',
                  parent             : $document.find('#scrumboard'),
                  targetEvent        : ev,
                  clickOutsideToClose: true,
                  escapeToClose      : true,
                  locals             : {
                    cardInfo: cardInfo,
                    providers: providers
                  }
                });
                break;
            case 2:
                $mdDialog.show({
                  templateUrl        : 'app/main/pages/tracking/dialogs/card/provider/provider-dialog.html',
                  controller         : 'ProviderDialogController',
                  controllerAs       : 'vm',
                  parent             : $document.find('#scrumboard'),
                  targetEvent        : ev,
                  clickOutsideToClose: true,
                  escapeToClose      : true,
                  locals             : {
                    cardInfo: cardInfo
                  }
                });
                break;
            default:
        }
    }

    /**
    * Add new list
    */
    function addNewList()
    {
      if ( vm.newListName === '' )
      {
        return;
      }

      vm.board.lists.push({
        id     : msUtils.guidGenerator(),
        name   : vm.newListName,
        idCards: []
      });

      vm.newListName = '';
    }

    /**
    * Remove list
    *
    * @param ev
    * @param list
    */
    function removeList(ev, list)
    {
      var confirm = $mdDialog.confirm({
        title              : 'Remove List',
        parent             : $document.find('#scrumboard'),
        textContent        : 'Are you sure want to remove list?',
        ariaLabel          : 'remove list',
        targetEvent        : ev,
        clickOutsideToClose: true,
        escapeToClose      : true,
        ok                 : 'Remove',
        cancel             : 'Cancel'
      });
      $mdDialog.show(confirm).then(function ()
      {
        vm.board.lists.splice(vm.board.lists.indexOf(list), 1);
      }, function ()
      {
        // Canceled
      });

    }

    /**
    * Card filter
    *
    * @param cardId
    * @returns {*}
    */
    function cardFilter(cardId)
    {
      var card = vm.board.cards.getById(cardId);

      try
      {
        if ( angular.lowercase(card.name).indexOf(angular.lowercase(vm.cardFilters.name)) < 0 )
        {
          throw false;
        }

        angular.forEach(vm.cardFilters.labels, function (label)
        {
          if ( !msUtils.exists(label, card.idLabels) )
          {
            throw false;
          }
        });

        angular.forEach(vm.cardFilters.members, function (member)
        {
          if ( !msUtils.exists(member, card.idMembers) )
          {
            throw false;
          }
        });


      } catch ( err )
      {
        return err;
      }

      return true;
    }

    /**
    * Is the card overdue?
    *
    * @param cardDate
    * @returns {boolean}
    */
    function isOverdue(cardDate)
    {
      return moment() > moment(cardDate, 'x');
    }

    /**
    * Update Board Uri
    *
    * Once you connect your app to your server,
    * you would do this on your API server.
    */
    function updateBoardUri()
    {
      if ( vm.boardList.getById(vm.board.id) )
      {
        vm.boardList.getById(vm.board.id).name = vm.board.name;
        vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
      }
    }

    /**
    * Toggle sidenav
    *
    * @param sidenavId
    */
    function toggleSidenav(sidenavId)
    {
      $mdSidenav(sidenavId).toggle();
    }

    /**
    * Array prototype
    *
    * Get by id
    *
    * @param value
    * @returns {T}
    */
    Array.prototype.getById = function (value)
    {
      return this.filter(function (x)
      {
        return x.id === value;
      })[0];
    };

  }
})();
