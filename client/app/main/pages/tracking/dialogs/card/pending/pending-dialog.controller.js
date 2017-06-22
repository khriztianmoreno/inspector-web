(function ()
{
    'use strict';

    angular
        .module('app.pages.tracking')
        .controller('PendingDialogController', PendingDialogController);

    /** @ngInject */
    function PendingDialogController($document, $mdDialog, fuseTheming,
    fuseGenerator, msUtils, cardInfo, TrackingService, providers)
    {
        var vm = this;

        // Data
        vm.cardInfo = cardInfo;
        vm.cardInfo.checklists = [{id: msUtils.guidGenerator(),name:'Para cotizar',
        checkItemsChecked: 0, checkItems:[]}];
        vm.cardInfo.due= new Date();
        vm.editChecklistForm ={};
        vm.editChecklistForm.$visible = true;
        vm.cardInfo.providers = providers;
        vm.provider = null;

        // Methods
        vm.palettes = fuseTheming.getRegisteredPalettes();
        vm.rgba = fuseGenerator.rgba;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;
        vm.closeDialog = closeDialog;
        vm.removeCard = removeCard;
        /* Attachment */
        vm.toggleCoverImage = toggleCoverImage;
        vm.removeAttachment = removeAttachment;
        /* Labels */
        vm.labelQuerySearch = labelQuerySearch;
        vm.filterLabel = filterLabel;
        vm.addNewLabel = addNewLabel;
        vm.removeLabel = removeLabel;
        /* Members */
        vm.memberQuerySearch = memberQuerySearch;
        vm.filterMember = filterMember;
        /* Checklist */
        vm.updateCheckedCount = updateCheckedCount;
        vm.addCheckItem = addCheckItem;
        vm.removeChecklist = removeChecklist;
        vm.removeChecklistItem = removeChecklistItem;
        vm.createCheckList = createCheckList;
        /* Comment */
        vm.addNewComment = addNewComment;
        vm.currentItem ={text:null,value:0};
        vm.updateStatus = updateStatus;

        //////////

        /**
         * Close Dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

        /**
         * Update Tracking Status
         *
         * @param tracking
         */
        function updateStatus(tracking)
        {
            tracking.currentStatus.id += 1;
            vm.tracking.providers = vm.provider;
           // TrackingService.update(tracking);
           console.log(tracking);
            closeDialog();
        }

        /**
         * Remove card
         *
         * @param ev
         */
        function removeCard(ev)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Remove Card',
                parent             : $document.find('#scrumboard'),
                textContent        : 'Are you sure want to remove card?',
                ariaLabel          : 'remove card',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });

            $mdDialog.show(confirm).then(function ()
            {

            }, function ()
            {
                // Canceled
            });
        }

        /**
         * Toggle cover image
         *
         * @param attachmentId
         */
        function toggleCoverImage(attachmentId)
        {
            if ( attachmentId === vm.card.idAttachmentCover )
            {
                vm.card.idAttachmentCover = null;
            }
            else
            {
                vm.card.idAttachmentCover = attachmentId;
            }
        }

        /**
         * Remove attachment
         *
         * @param item
         */
        function removeAttachment(item)
        {
            if ( vm.card.idAttachmentCover === item.id )
            {
                vm.card.idAttachmentCover = '';
            }
            vm.card.attachments.splice(vm.card.attachments.indexOf(item), 1);
        }

        /**
         * Add label chips
         *
         * @param query
         * @returns {filterFn}
         */
        function labelQuerySearch(query)
        {
            return query ? vm.labels.filter(createFilterFor(query)) : [];
        }

        /**
         * Label filter
         *
         * @param label
         * @returns {boolean}
         */
        function filterLabel(label)
        {
            if ( !vm.labelSearchText || vm.labelSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(label.name).indexOf(angular.lowercase(vm.labelSearchText)) >= 0;
        }

        /**
         * Add new label
         */
        function addNewLabel()
        {
            vm.board.labels.push({
                id   : msUtils.guidGenerator(),
                name : vm.newLabelName,
                color: vm.newLabelColor
            });

            vm.newLabelName = '';
        }

        /**
         * Remove label
         */
        function removeLabel()
        {
            var arr = vm.board.labels;
            arr.splice(arr.indexOf(arr.getById(vm.editLabelId)), 1);

            angular.forEach(vm.board.cards, function (card)
            {
                if ( card.idLabels && card.idLabels.indexOf(vm.editLabelId) > -1 )
                {
                    card.idLabels.splice(card.idLabels.indexOf(vm.editLabelId), 1);
                }
            });

            vm.newLabelName = '';
        }

        /**
         * Add member chips
         *
         * @param query
         * @returns {Array}
         */
        function memberQuerySearch(query)
        {
            return query ? vm.members.filter(createFilterFor(query)) : [];
        }

        /**
         * Member filter
         *
         * @param member
         * @returns {boolean}
         */
        function filterMember(member)
        {
            if ( !vm.memberSearchText || vm.memberSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(member.name).indexOf(angular.lowercase(vm.memberSearchText)) >= 0;
        }

        /**
         * Update check list stats
         * @param list
         */
        function updateCheckedCount(list)
        {
            var checkItems = list.checkItems;
            var checkedItems = 0;
            var allCheckedItems = 0;
            var allCheckItems = 0;

            angular.forEach(checkItems, function (checkItem)
            {
                if ( checkItem.checked )
                {
                    checkedItems++;
                }
            });

            list.checkItemsChecked = checkedItems;

            angular.forEach(vm.cardInfo.checklists, function (item)
            {
                allCheckItems += item.checkItems.length;
                allCheckedItems += item.checkItemsChecked;
            });

            vm.cardInfo.checklists.checkItems = allCheckItems;
            vm.cardInfo.checklists.checkItemsChecked = allCheckedItems;
        }

        /**
         * Add checklist item
         *
         * @param text
         * @param checkList
         */
        function addCheckItem(text,value,checkList)
        {
            vm.currentItem ={text:null,value:0};
            if ( !text || text === '' )
            {
                return;
            }

            var newCheckItem = {
                name   : text,
                checked: false,
                value: value,

            };

            checkList.checkItems.push(newCheckItem);


            updateCheckedCount(checkList);
        }

        /**
         * Remove checklist
         *
         * @param item
         */
        function removeChecklist(item)
        {
            vm.card.checklists.splice(vm.card.checklists.indexOf(item), 1);

            angular.forEach(vm.card.checklists, function (list)
            {
                updateCheckedCount(list);
            });
        }

        /**
         * Remove checklist Item
         *
         * @param item
         */
        function removeChecklistItem(item, list)
        {
            list.splice(list.indexOf(item), 1);

            angular.forEach(vm.card.checklists, function (list)
            {
                updateCheckedCount(list);
            });
        }

        /**
         * Create checklist
         */
        function createCheckList()
        {
            vm.cardInfo.checklists.push({
                id               : msUtils.guidGenerator(),
                name             : vm.newCheckListTitle,
                checkItemsChecked: 0,
                checkItems       : []
            });

            vm.newCheckListTitle = '';
        }

        /**
         * Add new comment
         *
         * @param newCommentText
         */
        function addNewComment(newCommentText, id)
        {

            var newComment = {
                idMember: id,
                message : newCommentText,
                time    : new Date()
            };
            vm.cardInfo.comments.push(newComment);
            console.log(vm.cardInfo.comments)
        }

        /**
         * Filter for chips
         *
         * @param query
         * @returns {filterFn}
         */
        function createFilterFor(query)
        {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item)
            {
                return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
            };
        }
    }
})();
