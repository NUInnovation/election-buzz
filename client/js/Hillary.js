

$(function() {
  $( "#datepicker" ).datepicker({
      onSelect: updateImg,
      minDate: new Date("May 1, 2016 11:13:00"),
      maxDate: new Date("May 20, 2016 11:13:00"),
      defaultDate: new Date()
     });
});

var today = new Date("May 1, 2016 11:11:00");
var todayString = '05/01/2016'
console.log(todayString);

updateImg = function(val)
{
  console.log(val);
  var date = val.replace(/\//g,'_');
  var dateStringEnd = date.slice(1,5);
  console.log(dateStringEnd);
  var fileName = 'images/word_cloud/clinton/HillaryClinton_2016_'+dateStringEnd+'.png';
  console.log(fileName);
  $('#galleryImg').attr('src',fileName);
}
updateImg(todayString);
$('#datepicker').val(todayString);

  // var word = "";
  //
  // function filterTrump(obj) {
  //     return obj.support === "realDonaldTrump";
  // }
  //
  // function filterClinton(obj) {
  //     return obj.support === "HillaryClinton";
  // }
  //
  // function filterSanders(obj) {
  //     return obj.support === "BernieSanders";
  // }
  // function filterDate(obj){
  //   return obj.Date > parseDate('2016/00');
  // }
  //
  // var allData = null;
  // function updateChart(){
  //   var input=$('#word').val();
  //   url = 'http://162.243.13.220:8081/api/timeline?word='+input;
  //   console.log(url)
  //   // return;
  //   $.getJSON(url,function(data){
  //
  //     data.forEach(function(d) {
  //         // if ()(d.Date.length)==6)
  //         // console.log(d.Date.length);
  //         if (d.Date.length == 6){
  //           d.Date  = d.Date.substr(0,5)+'0'+d.Date.substr(5,1);//+'/0';
  //         }
  //         else{
  //           d.Date = d.Date;//+'/0';
  //         }
  //         // console.log(d.Date);
  //         // console.log(d.Date+'-'+parseDate(d.Date));
  //         d.Date = parseDate(d.Date);
  //         // console.log(d.Date);
  //     });
  //     data = data.filter(filterDate);
  //     data = data.sort(function(a,b){
  //       return +a.Date - b.Date;
  //     });
  //     allData = data;
  //     var trumpData = data.filter(filterTrump);
  //     var clintonData = data.filter(filterClinton);
  //     var sandersData = data.filter(filterSanders);
  //     // console.table(data);
  //
  //     x.domain(d3.extent(data, function(d) { return d.Date;}));
  //     y.domain(d3.extent(data, function(d) {return d.Ct; }));
  //
  //     svg.select ('.x.axis')
  //       .call(xAxis);
  //
  //     svg.select('.y.axis')
  //       .call(yAxis);
  //
  //     allDots = svg.selectAll('circle')
  //         .data(allData);
  //
  //     allDots.enter()
  //         .append('circle');
  //
  //     allDots.exit().remove();
  //
  //     allDots.transition()
  //         .attr('cx',function(d) { return x(d.Date); })
  //         .attr('cy',function(d) { return y(d.Ct);})
  //         .attr('r','3px')
  //         .attr("stroke",function(d){
  //           // console.log('hihi');
  //           if (d.support === 'HillaryClinton')
  //           {
  //             return 'blue';
  //           }
  //           if (d.support === 'BernieSanders')
  //           {
  //             return 'green';
  //           }
  //           if (d.support === 'realDonaldTrump')
  //           {
  //             return 'red';
  //           }
  //         })
  //         .attr("fill",function(d){
  //           console.log('hihi');
  //           if (d.support === 'HillaryClinton')
  //           {
  //             return 'blue';
  //           }
  //           if (d.support === 'BernieSanders')
  //           {
  //             return 'green';
  //           }
  //           if (d.support === 'realDonaldTrump')
  //           {
  //             return 'red';
  //           }
  //         });
  //     });
  //     return;
  // }
  //
  // var margin = {top: 20, right: 80, bottom: 30, left: 50},
  // width = 600 - margin.left - margin.right,
  // height = 300 - margin.top - margin.bottom;
  //
  // var parseDate = d3.time.format("%Y/%U").parse;
  //
  // var x = d3.time.scale()
  //     .range([0, width]);
  //
  // var y = d3.scale.linear()
  //     .range([height, 0]);
  //
  // var color = d3.scale.category10();
  // var xAxis = d3.svg.axis()
  //     .scale(x)
  //     .orient("bottom")
  //     .ticks(8);
  //
  // var yAxis = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     .ticks(5);
  //
  // var line = d3.svg.line()
  //     // .interpolate("basis")
  //     .x(function(d) {
  //         console.log(d.Date+'-'+x(d.Date));
  //         return x(d.Date); })
  //     .y(function(d) {
  //       console.log(d.Date+'-'+y(d.Date));
  //       return y(d.Ct); });
  // var svg = d3.select("#graph").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  //   var trumpLine = null;
  //   var clintonLine = null;
  //   var sandersLine = null;
  //   var allDots = null;
  //   var xAxes = null;
  //   var yAxes = null;
  //
  //   var url = 'http://162.243.13.220:8081/api/timeline?word=women'
  //   $.getJSON(url,function(data){
  //
  //     // console.table(data);
  //       data.forEach(function(d) {
  //           // if ()(d.Date.length)==6)
  //           // console.log(d.Date.length);
  //           if (d.Date.length == 6){
  //             d.Date  = d.Date.substr(0,5)+'0'+d.Date.substr(5,1);//+'/0';
  //           }
  //           else{
  //             d.Date = d.Date;//+'/0';
  //           }
  //           // console.log(d.Date);
  //           // console.log(d.Date+'-'+parseDate(d.Date));
  //           d.Date = parseDate(d.Date);
  //           // console.log(d.Date);
  //       });
  //       data = data.filter(filterDate);
  //       data = data.sort(function(a,b){
  //         return +a.Date - b.Date;
  //       });
  //       allData = data;
  //       var trumpData = data.filter(filterTrump);
  //       var clintonData = data.filter(filterClinton);
  //       var sandersData = data.filter(filterSanders);
  //
  //       // console.table(trumpData);
  //       x.domain(d3.extent(data, function(d) { return d.Date;}));
  //       y.domain(d3.extent(data, function(d) {return d.Ct; }));
  //
  //       xAxes = svg.append("g")
  //         .attr("class", "x axis")
  //         .attr("transform", "translate(0," + height + ")")
  //         .call(xAxis);
  //
  //       yAxes = svg.append("g")
  //       .attr("class", "y axis")
  //       .call(yAxis)
  //       .append("text")
  //       .attr("transform", "rotate(-90)")
  //       .attr("y", 6)
  //       .attr("dy", ".71em")
  //       .style("text-anchor", "end")
  //
  //       // .text("Price ($)");
  //       allDots = svg.selectAll('circle')
  //           .data(data)
  //           .enter()
  //           .append('circle')
  //           .attr('cx',function(d) { return x(d.Date); })
  //           .attr('cy',function(d) { return y(d.Ct);})
  //           .attr('r','3px')
  //           .attr("stroke",function(d){
  //             console.log('hihi');
  //             if (d.support === 'HillaryClinton')
  //             {
  //               return 'blue';
  //             }
  //             if (d.support === 'BernieSanders')
  //             {
  //               return 'green';
  //             }
  //             if (d.support === 'realDonaldTrump')
  //             {
  //               return 'red';
  //             }
  //           })
  //           .attr("fill",function(d){
  //             console.log('hihi');
  //             if (d.support === 'HillaryClinton')
  //             {
  //               return 'blue';
  //             }
  //             if (d.support === 'BernieSanders')
  //             {
  //               return 'green';
  //             }
  //             if (d.support === 'realDonaldTrump')
  //             {
  //               return 'red';
  //             }
  //           });
  //   });
  //   var w = 500;
  //   var h =500;
  //   var max_n = 10;
  //   var lineFunction = d3.svg.line()

function filterThemselves(elem) {
  result = elem.screen_name === 'HillaryClinton';
  result = result | elem.screen_name === "ERNESTZorro";
  return !result;

};

    /// FOLLOWERS
    var clintonFollowers = null;
    var urlFollowers = 'http://162.243.13.220:8081/api/followers'
    $.getJSON(urlFollowers,function(data){
        $('#loading').remove();

        clintonFollowers = JSON.parse(data.Clinton);//.slice(0,6);
        clintonFollowers = clintonFollowers.filter(filterThemselves);
        clintonFollowers = clintonFollowers.slice(0,6);
        console.table(clintonFollowers);
        clintonFollowers.forEach(function(element){
          // append to twitterFollowers class
          $('#followerProfiles').append(
            '<div class="col-sm-2" style="font-weight:bold; color:blue"><a href="https://twitter.com/'+element.screen_name+'"><div><img class="img-circle" style="width:100%" src="'+element.picture_url+'"></div>@'+element.screen_name+'</a></div>'
          );
        });
    });

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('galleryImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
