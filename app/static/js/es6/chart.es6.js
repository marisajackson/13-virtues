/* global AmCharts, ajax, moment */
/* jshint unused:false */



(function() {
  'use strict';

  $(document).ready( () => {
    $('#showGraph').click(showGraph);
  });

  function showGraph(){
    ajax('/entries/trends', 'get', null, jsonObj=>{
      var data = [];
      for(var i = 0; i < jsonObj.length; i++){
        var obj = {};
        obj.date = jsonObj[i].date;
        obj.avgRating = jsonObj[i].avgRating * 1;
        data.push(obj);
      }
      graph(data);
    }, 'json');
  }

  function graph(data){
    console.log('DATA');
    console.log(data);
    var chartData = data;
    var chart = AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'theme': 'patterns',
      'pathToImages': 'http://www.amcharts.com/lib/3/images/',
      'dataProvider': chartData,
      'valueAxes': [{
          'axisAlpha': 0.2,
          'dashLength': 1,
          'position': 'left'
      }],
      'graphs': [{
          'id':'g1',
          'balloonText': '[[category]]<br /><b><span style="font-size:14px;">value: [[value]]</span></b>',
          'bullet': 'round',
          'bulletBorderAlpha': 1,
  		    'bulletColor':'#FFFFFF',
          'hideBulletsCount': 50,
          'title': 'red line',
          'valueField': 'avgRating',
  		    'useLineColorForBulletBorder':true
      }],
      'chartScrollbar': {
          'autoGridCount': true,
          'graph': 'g1',
          'scrollbarHeight': 40
      },
      'chartCursor': {
          'cursorPosition': 'mouse'
      },
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
          'axisColor': '#DADADA',
          'dashLength': 1,
          'minorGridEnabled': true
      },
  	   'exportConfig':{
  	    menuRight: '20px',
        menuBottom: '30px',
        menuItems: [{
        icon: 'http://www.amcharts.com/lib/3/images/export.png',
        format: 'png'
        }]
  	   }
    });

    chart.addListener('rendered', zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for 'dataUpdated' event
    function zoomChart() {
      // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
      chart.zoomToIndexes(data.length - 40, data.length - 1);
    }


  //generate some random data, quite different range
    // function generateChartData() {
    //   var chartData = [];
    //   var firstDate = new Date();
    //   firstDate.setDate(firstDate.getDate() - 5);
    //
    //   for (var i = 0; i < 1000; i++) {
    //       // we create date objects here. In your data, you can have date strings
    //       // and then set format of your dates using chart.dataDateFormat property,
    //       // however when possible, use date objects, as this will speed up chart rendering.
    //       var newDate = new Date(firstDate);
    //       newDate.setDate(newDate.getDate() + i);
    //
    //       var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;
    //
    //       chartData.push({
    //           date: newDate,
    //           avgRating: visits
    //       });
    //   }
    //   return chartData;
    // }
  }

}());
