function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $wikiElemHeader = $('#wikipedia-header');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var streetInput = $('#street').val();
    var cityInput = $('#city').val();
    var bgLocation = streetInput + ', ' + cityInput;
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + bgLocation + '';
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + bgLocation + '&sort=newest&api-key=';
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cityInput + '&limit=10&format=json&callback=?';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    $greeting.text("Is " + bgLocation + " where you want to live?")

    // load streetview
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');
    //$body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + bgLocation + '">');

    $.getJSON(nyTimesURL, function(data) {
        $nytHeaderElem.append(' About ' + bgLocation);

        var articles = data.response.docs;
        var articleLength = articles.length;
        for (var i = 0; i < articleLength; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">'+ article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');

        };
    })
    .error(function(){
        $nytElem.text('New York Times Article Could Not Be Loaded');
    });

    // $.ajax Version with error handling //
    var wikiTimeOut = setTimeout(function(){
        $wikiElem.text("Failed to retrieve wiki resources")
    }, 8000);

    $.ajax(wikiURL, {
        dataType: "jsonp",
        success: function(data) {
            $wikiElemHeader.append(' on ' + cityInput);

            var entries = data[1];
            var entriesLength = data[1].length;
            for (var i = 0; i < entriesLength; i++) {
                wikiStr = entries[i];
                var url = 'http://en.wikipedia.org/wiki/' + wikiStr;
                $wikiElem.append('<ul><a href="' + url + '">' + wikiStr + '</a></ul>');
            };

            clearTimeout(wikiTimeOut);
        }
    });
    // $.getJSON(wikiURL, function(data){
    //     $wikiElemHeader.append(' on ' + cityInput);

    //     //console.log(data);

    //     var entries = data[1];
    //     var entriesLength = data[1].length;
    //     for (var i = 0; i < entriesLength; i++) {
    //         wikiStr = entries[i];
    //         var url = 'http://en.wikipedia.org/wiki/' + wikiStr;
    //         $wikiElem.append('<ul><a href="' + url + '">' + wikiStr + '</a></ul>');
    //     };
    //     //console.log(entries);
    // })
    // .error(function(){
    //     $wikiElemHeader.text('Wikipedia Pages Could Not Be Loaded');
    // });


    return false;
};

$('#form-container').submit(loadData);

// loadData();
