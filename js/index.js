$(document).ready(function() {

// QUOTE FUNCTION
  var website = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  console.log(website);         // log json quote website

  function newQuote() {
    var key = "";              // generate random key for quote
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
      quoteText = val.quoteText;
      quoteAuthor = val.quoteAuthor;
      $("body, button").animate({backgroundColor: color})
      if(quoteAuthor) {
        $("#quote").html('<i class="fa fa-quote-left pull-left"></i>' + quoteText).animate({color: color});
        $("cite").html(quoteAuthor).animate({color: color});
      } else {
        $("#quote").html('<i class="fa fa-quote-left pull-left"></i>' + quoteText).animate({color: color});
        $("cite").html("Unknown").animate({color: color});
      }
    });
  }
  var quoteText = "";
  var quoteAuthor = "";

// LANDING PAGE
  $("#quote").html("<h1>Inspirational Quotes</h1>").css("color", "#8F0000");
  $("#twitter").hide();

// NEW QUOTE BUTTON
  $('#get-quote').click(function() {
    newQuote();       // new quote + random color
  $("#twitter").delay(200).show(0);
  });

// TWITTER NEW PAGE
  function openURL(url){
    window.open(url, 'Share', 'width=550, height=500, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }

// POST TO TWITTER
  $('#twitter').click(function() {
    var hashtag = quoteAuthor;
    var newHash = hashtag.split(" ").join("");
    if(!quoteAuthor) {
      openURL("https://twitter.com/intent/tweet?hashtags=" + ",quotation&text=" + encodeURIComponent('"' + quoteText + '" '));
    } else {
      openURL("https://twitter.com/intent/tweet?hashtags=" + newHash + ",quotation&text=" + encodeURIComponent('"' + quoteText + '"'));
    }
  });

});
