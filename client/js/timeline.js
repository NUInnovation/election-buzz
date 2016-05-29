var word = "";

function filterTrump(obj) {
    return obj.support === "realDonaldTrump";
}

function filterClinton(obj) {
    return obj.support === "HillaryClinton";
}

function filterSanders(obj) {
    return obj.support === "BernieSanders";
}
function filterDate(obj){
  return obj.Date > parseDate('2016/00');
}

var allData = null;
function updateChart(){
  var input=$('#word').val();
  url = 'https://162.243.13.220:8080/api/timeline?word='+input;
  console.log(url)
  // return;
  $.getJSON(url,function(data){
    data.forEach(function(d) {
        // if ()(d.Date.length)==6)
        // console.log(d.Date.length);
        if (d.Date.length == 6){
          d.Date  = d.Date.substr(0,5)+'0'+d.Date.substr(5,1);//+'/0';
        }
        else{
          d.Date = d.Date;//+'/0';
        }
        // console.log(d.Date);
        // console.log(d.Date+'-'+parseDate(d.Date));
        d.Date = parseDate(d.Date);
        // console.log(d.Date);
    });
    data = data.filter(filterDate);
    data = data.sort(function(a,b){
      return +a.Date - b.Date;
    });
    allData = data;
    var trumpData = data.filter(filterTrump);
    var clintonData = data.filter(filterClinton);
    var sandersData = data.filter(filterSanders);
    // console.table(data);

    x.domain(d3.extent(data, function(d) { return d.Date;}));
    y.domain(d3.extent(data, function(d) {return d.Ct; }));


    svg_timeline.select ('.x.axis')
      .call(xAxis);

    svg_timeline.select('.y.axis')
      .call(yAxis);

    svg_timeline.select('.x.grid')
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_axis()
          .tickSize(-height, 0, 0)
          .tickFormat("")
      );

    svg_timeline.select('.y.grid')
    .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )


    allDots = svg_timeline.selectAll('circle')
        .data(allData);

    allDots.enter()
        .append('circle');

    allDots.exit().remove();

    allDots.transition()
        .attr('cx',function(d) { return x(d.Date); })
        .attr('cy',function(d) { return y(d.Ct);})
        .attr('r','3px')
        .attr("stroke",function(d){
          // console.log('hihi');
          if (d.support === 'HillaryClinton')
          {
            return 'blue';
          }
          if (d.support === 'BernieSanders')
          {
            return 'green';
          }
          if (d.support === 'realDonaldTrump')
          {
            return 'red';
          }
        })
        .attr('data-legend',function(d){ return d.support;})
        .attr("fill",function(d){
          console.log('hihi');
          if (d.support === 'HillaryClinton')
          {
            return 'blue';
          }
          if (d.support === 'BernieSanders')
          {
            return 'green';
          }
          if (d.support === 'realDonaldTrump')
          {
            return 'red';
          }
        });

        // legend.attr("transform","translate(50,30)")
        // .style("font-size","15px")
        // .call(d3.legend);
    });
    return;
}

var margin = {top: 20, right: 80, bottom: 30, left: 50},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y/%U").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(8);


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(10)
};

function make_y_axis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10)
};

var line = d3.svg.line()
    // .interpolate("basis")
    .x(function(d) {
        console.log(d.Date+'-'+x(d.Date));
        return x(d.Date); })
    .y(function(d) {
      console.log(d.Date+'-'+y(d.Date));
      return y(d.Ct); });

var svg_timeline = d3.select("#graph_timeline").append("svg_timeline")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var trumpLine = null;
var clintonLine = null;
var sandersLine = null;
var allDots = null;
var xAxes = null;
var yAxes = null;
var yGrid = null;
var xGrid = null;
var legend = null;


var url = 'https://162.243.13.220:8080/api/timeline?word=women'
$('#word').val('women');
$.getJSON(url,function(data){

  // console.table(data);
    data.forEach(function(d) {
        // if ()(d.Date.length)==6)
        // console.log(d.Date.length);
        if (d.Date.length == 6){
          d.Date  = d.Date.substr(0,5)+'0'+d.Date.substr(5,1);//+'/0';
        }
        else{
          d.Date = d.Date;//+'/0';
        }
        // console.log(d.Date);
        // console.log(d.Date+'-'+parseDate(d.Date));
        d.Date = parseDate(d.Date);
        // console.log(d.Date);
    });
    data = data.filter(filterDate);
    data = data.sort(function(a,b){
      return +a.Date - b.Date;
    });
    allData = data;
    var trumpData = data.filter(filterTrump);
    var clintonData = data.filter(filterClinton);
    var sandersData = data.filter(filterSanders);

    // console.table(trumpData);
    x.domain(d3.extent(data, function(d) { return d.Date;}));
    y.domain(d3.extent(data, function(d) {return d.Ct; }));

    xAxes = svg_timeline.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    yAxes = svg_timeline.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

    yGrid = svg_timeline.append("g")
    .attr("class", "y grid")
    .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )

    xGrid = svg_timeline.append("g")
    .attr("class", "x grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat("")
    );
    // .text("Price ($)");

    allDots = svg_timeline.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',function(d) { return x(d.Date); })
        .attr('cy',function(d) { return y(d.Ct);})
        .attr('r','3px')
        .attr("stroke",function(d){
          console.log('hihi');
          if (d.support === 'HillaryClinton')
          {
            return 'blue';
          }
          if (d.support === 'BernieSanders')
          {
            return 'green';
          }
          if (d.support === 'realDonaldTrump')
          {
            return 'red';
          }
        })
        .attr('data-legend',function(d){ return d.support;})
        .attr("fill",function(d){
          console.log('hihi');
          if (d.support === 'HillaryClinton')
          {
            return 'blue';
          }
          if (d.support === 'BernieSanders')
          {
            return 'green';
          }
          if (d.support === 'realDonaldTrump')
          {
            return 'red';
          }
        });

  //  legend = svg_timeline.append("g")
  //         .attr("class","legend")
  //         .attr("transform","translate(50,30)")
  //         .style("font-size","15px")
  //         .call(d3.legend);

    // trumpLine = svg_timeline.append('path')
    //     .datum(trumpData)
    //     .attr('class','line')
    //     .attr('d',line)
    //     .style('stroke','red');
    //
    // clintonLine = svg_timeline_timeline.append('path')
    //     .datum(clintonData)
    //     .attr('class','line')
    //     .attr('d',line)
    //     .style('stroke','blue');
    //
    // sandersLine = svg_timeline.append('path')
    //     .datum(sandersData)
    //     .attr('class','line')
    //     .attr('d',line)
    //     .style('stroke','green');




});


var w = 800;
var h =800;

var max_n = 10;
