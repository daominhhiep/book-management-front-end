var application = angular.module('table', ['ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.exporter', 'ui.grid.resizeColumns']);

application.controller('tableController', ['$scope', '$http', '$filter', 'uiGridConstants', function ($scope, $http, $filter, uiGridConstants) {

    $scope.categories = []

    $scope.autoRefresh = function(){
        setInterval(function () {
            let flag = localStorage.getItem('flag')
            if(flag && flag == 'true')
                $scope.prepareData()
        }, 1000)
    }

    $scope.autoRefresh()

    $scope.tableData = {
        enableFiltering: true,
        paginationPageSizes: [50, 100, 200],
        paginationPageSize: 50,
        columnDefs: [
            {name: 'name', fields: "Name", minwidth: 200, maxwidth: 250, cellTooltip: true},
            {name: 'author', fields: "Author", minwidth: 150, maxwidth: 200, cellTooltip: true},
            {name: 'category', fields: "Category", minwidth: 150, maxwidth: 200, cellTooltip: true},
            {name: 'purchasedDate', fields: "Purchased date", minwidth: 150, maxwidth: 200, cellFilter: 'date:\'dd-MM-yyyy\'' , enableColumnMenu: false, enableFiltering: false, cellClass: 'text-center', cellTooltip: true},
            {name: 'description', fields: "Description", minwidth: 280, maxwidth: 330, enableColumnMenu: false, cellTooltip: true},
            {name: 'publisher', fields: "Publisher", minwidth: 140, maxwidth: 190, cellTooltip: true},
            {name: 'createdDate', fields: 'Created date', minwidth: 135, maxwidth: 185, enableColumnMenu: false, enableFiltering: false, cellClass: 'text-center', cellTooltip: true},
            {name: 'updatedDate', fields: 'Updated date', minwidth: 135, maxwidth: 185, enableColumnMenu: false, enableFiltering: false, cellClass: 'text-center', cellTooltip: true},
            {name: 'status', fields: "Status", minwidth: 150, maxwidth: 200, enableColumnMenu: false,
                cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"><a href="/borrowing-history?bookId={{row.entity.id}}" title="Detail"><span class="fas fa-info-circle"></span></a>&nbsp{{row.entity.status}}</div>',
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [ { value: 'READY', label: 'READY' }, { value: 'BORROWING', label: 'BORROWING' }, { value: 'OVERDUE', label: 'OVERDUE'}]
                }
            },
            {
                name: 'action',
                fields: "Action",
                minwidth: 105,
                maxwidth: 155,
                enableColumnMenu: false,
                enableFiltering: false, 
                cellClass: 'text-center',
                cellTemplate: '<button class="btn btn-order" title="Order"><span class="fa fa-cart-plus" style={{padding:"2px 3px"}}></span></button>&nbsp<button class="btn custom-btn" ng-click="grid.appScope.editBook(row.entity)" title="Edit"><span class="fas fa-edit" style={{padding:"2px 3px"}}></span></button>&nbsp<button class="btn btn-delete" title="Delete" ng-click="grid.appScope.deleteBook(row.entity.id)"><span class="fas fa-trash" style={{padding:"2px 3px"}}></span></button>',
            }
        ]
    }
    
    $scope.deleteBook = function (id) {
        var res = confirm("Do you want to delete this book?");
        if (res == true) {
          $http.delete("http://localhost:9000/api/books/" + id).then(function (bookResponse) {
            alert("Delete success!")
            })
        } 
    };

    $scope.editBook = function (book) {
        window.showModal(book);
    };

    $scope.prepareData = function(){
        $http.get("http://localhost:9000/api/categories").then(function (categorieResponse) {
            $scope.categories = categorieResponse.data.result

            $http.get("http://localhost:9000/api/books").then(function (bookResponse) {
                $scope.tableData.data = $scope.generateTableData($scope.categories, bookResponse.data.result)
            })
        })
    }

    $scope.generateTableData = function(categories, books){
        return books.map(book => {
            let category = categories.find(category => category.id == book.category)

            return {
                "id": book.id,
                "order": "",
                "isActive": book.isActive,
                "status": book.status,
                "name": book.name,
                "author": book.author,
                "category": category.name,
                "purchasedDate": book.purchasedDate,
                "description": book.description,
                "publisher": book.publisher,
                "createdDate": book.createdAt,
                "updatedDate": book.updatedAt,
                "nextOrder": "Thuy_VT"
            }
        })
    }

    $scope.prepareData()
}])
