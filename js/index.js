$(document).ready(function() {

// LANDING PAGE
  $("#quote").html("<h1>Inspiration Quotes</h1>").css("color", "#8F0000");
  $("#twitter").hide();

// NEW QUOTE BUTTON
  $('#get-quote').click(function() {
    newQuote();       // new quote + random color
  });

// QUOTE FUNCTION
  var quoteText, quoteAuthor;
  var website = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  // console.log(website);
  function newQuote() {
    var key = "";              // generate random key for quote
    for(var i = 0; i < 6; i++) {
      key += Math.floor(Math.random() * 9);
    }
    website += "&key=" + key.toString();

// RANDOM COLOR FUNCTION
    var str = "0123456789";
    var color = "#";
    for(var i = 0; i < 6; i++) {
      color += str[Math.floor(Math.random() * 10)];
    }
    // console.log(color);
    $.getJSON(website, function(val){    // quote API
      quoteText = val.quoteText.trim();
      quoteAuthor = val.quoteAuthor.trim();
      var tweetLength = quoteText.length + quoteAuthor.split(" ").join("").length + 4;
      $("#twitter").show(0);
      $("body, button").animate({backgroundColor: color});
      if(quoteAuthor) {
        $("#quote").html('<i class="fa fa-quote-left pull-left"></i>' + quoteText).animate({color: color});
        $("cite").html(quoteAuthor).animate({color: color});
      } else {
        $("#quote").html('<i class="fa fa-quote-left pull-left"></i>' + quoteText).animate({color: color});
        $("cite").html("Unknown").animate({color: color});
      }
      if(tweetLength > 140) {       // disable tweet > 140
        console.log("tweet greter than 140");
        $("#twitter").fadeOut("fast");
      }
    });
  }

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
      openURL("https://twitter.com/intent/tweet?hashtags=" + newHash + "&text=" + encodeURIComponent('"' + quoteText + '"'));
    }
  });

});
