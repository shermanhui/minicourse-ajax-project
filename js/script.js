
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $streetInput = $('#street');
    var $cityInput = $('#city');
    var bgLocation = $streetInput.val() + ', ' + $cityInput.val();

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    console.log(bgLocation);

    // load streetview
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + bgLocation + '">');
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
