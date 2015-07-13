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
        $nytElem.text('New York Times Articles About ' + bgLocation);

        var articles = data.response.docs;
        var articleLength = articles.length;
        for (var i = 0; i < articleLength; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">'+ article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');

        };
    }).error(function(e){
        $nytElem.text('New York Times Article Could Not Be Loaded');
    });


    return false;
};

$('#form-container').submit(loadData);

// loadData();
