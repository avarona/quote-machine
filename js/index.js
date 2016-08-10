$(document).ready(function() {

// QUOTE FUNCTION
  var website = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  console.log(website);         // log json quote website

  function newQuote() {
    var key = "";                   // generate random key for quote
    for(var i = 0; i < 6; i++) {
      key += Math.floor(Math.random() * 9);
    }
    website += "&key=" + key.toString();

  // RANDOM COLOR FUNCTION
    var str = "0123456789ABCDEF";
    var color = "#";
    for(var i = 0; i < 6; i++) {
      color += str[Math.floor(Math.random() * 16)];
    }
    console.log(color);           // log random color code

    $.getJSON(website, function(val){    // access api and receive response
      console.log(val);
      quoteText = val.quoteText;
      quoteAuthor = val.quoteAuthor;
      $("body, button").fadeIn(700).css("background-color", color);
      $("#quote").fadeIn(700).html('<i class="fa fa-quote-left pull-left"></i>' + val.quoteText).css("color", color);
      $("footer").fadeIn(700).html(val.quoteAuthor).css("color", color);
    });
  }
var quoteText = "";
var quoteAuthor = "";

// FIRST QUOTE
  newQuote();

// CLICK BUTTON
  $('#get-quote').click(function() {
    $("#quote, footer, button").fadeOut(300);
    newQuote();    // new quote + random color
  });

// POST TO TWITTER
  function openURL(url){
    window.open(url, 'Share', 'width=550, height=500, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }
  $('#twitter').click(function() {
    var hashtag = quoteAuthor;
    var newHash = hashtag.split(" ").join("");
      openURL("https://twitter.com/intent/tweet?hashtags=quotes," + newHash + "&text=" + encodeURIComponent('"' + quoteText + '"' + quoteAuthor));
  });

});
