'use strict';

var chartPlugin = angular.module('chart', ['sql', 'nvd3ChartDirectives'])
  .controller('ChartController', function ($scope, $location, $log, $timeout, $routeParams, SQLQuery) {
    var seriesName = "series";
    var xName = "x";
    var yName = "y";

    $scope.query = "";


    var showResults = function(result){
      var data = {};

      var indices = result.cols.reduce(function(dict, col, index){
          if(col === seriesName)
            dict[seriesName] = index;
          else if(col === xName)
            dict[xName] = index;
          else if(col === yName)
            dict[yName] = index;
          return dict;
      }, {});

      data = result.rows.reduce(function(previous, row){
        var value = [];
        var key = row[indices[seriesName]];

        if(key in previous){
          value = previous[key]
        }
        value.push([row[indices[xName]], row[indices[yName]]])
        previous[key] = value;
        return previous;
      }, {});
      var data_d3 = Object.keys(data).map(function(k){
        return { key: k, values: data[k] }
      });

      setChartData(data_d3);
    };
    var showError = function(result){
      $scope.error = result;
    };

    var setChartData = function(data){
      $scope.data = data;
    };

    $scope.runQuery = function(){
      console.log("executing " + $scope.query);
      SQLQuery.execute($scope.query).success(showResults).error(showError);
    };
    setChartData([{key: "hello", values: [[1,1],[2,2],[3,3]]}]);

  });

chartPlugin.run(function($window, $location, NavigationService) {

    var iconClass = "fa fa-bar-chart-o";
    var navElementText = "Charts";
    var urlPattern = "/charts";
    var position = 2;
    NavigationService.addNavBarElement(iconClass, navElementText, urlPattern, position);
});
