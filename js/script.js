function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var streetInput = $('#street').val();
    var cityInput = $('#city').val();
    var bgLocation = streetInput + ', ' + cityInput;
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + bgLocation + '';
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + bgLocation + '&sort=newest&api-key=';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    $greeting.text("Is " + bgLocation + " where you want to live?")

    // load streetview
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');
    //$body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + bgLocation + '">');

    $.getJSON(nyTimesURL, function(data) {
        console.log(data);
        //console.log("http://api.nytimes.com/svc/search/v2/articlesearch.json?q='" + bgLocation + "'&fq=source:('The New York Times')&glocations.contains='" + bgLocation + "'&begin_date=2014101&end_date201507011&sort=newest&api-key=b2db8097cb8fbf02d5f3db8bf759b051:0:72487022");
    });


    return false;
};

$('#form-container').submit(loadData);

// loadData();
