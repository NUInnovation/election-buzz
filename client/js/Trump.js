

$(function() {
  $( "#datepicker" ).datepicker({
      onSelect: updateImg,
      minDate: -20,
      maxDate: "+1M +10D",
      defaultDate: new Date()
     });
});

var today = new Date();
var todayString = '0'+(today.getMonth() + 1) + '/' + (today.getDate()-10) + '/' +  today.getFullYear()
console.log(todayString);

updateImg = function(val)
{
  console.log(val);
  var date = val.replace(/\//g,'_');
  var dateStringEnd = date.slice(1,5);
  console.log(dateStringEnd);
  var fileName = 'images/word_cloud/trump/realDonaldTrump_2016_'+dateStringEnd+'.png';
  console.log(fileName);
  $('#galleryImg').attr('src',fileName);
}
updateImg(todayString);

function filterThemselves(elem) {
  result = elem.screen_name === 'realDonaldTrump';
  result = result | (elem.screen_name === 'RT_com');
  result = result | (elem.screen_name === 'AppSame');
  result = result | (elem.screen_name === 'CapitalFMKenya');
  result = result | (elem.screen_name === 'theage');
  return !result;
};

    /// FOLLOWERS
    var trumpFollowers = null;
    var urlFollowers = 'http://162.243.13.220:8081/api/followers'
    $.getJSON(urlFollowers,function(data){

        trumpFollowers = JSON.parse(data.Trump);//.slice(0,6);
        trumpFollowers = trumpFollowers.filter(filterThemselves);
        trumpFollowers = trumpFollowers.slice(0,6);
        console.table(trumpFollowers);
        trumpFollowers.forEach(function(element){
          // append to twitterFollowers class
          $('#followerProfiles').append(
            '<div class="col-sm-2" style="font-weight:bold; color:blue"><a href="https://twitter.com/'+element.screen_name+'"><div><img class="img-circle" style="width:100%" src="'+element.picture_url+'"></div>@'+element.screen_name+'</a></div>'
          );
        });
    });
