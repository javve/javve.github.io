var LifeStream = function() {
    var self = this,
        tweetList,
        tempItem,
        spinner;
    
    var init = {
        start: function() {
            this.list();
            this.loading();
            this.twitter();
        },
        list: function() {
            tweetList = new List('lifestream', {
                item: "lifestream-item",
                valueNames: ['text']
            });
        },
        loading: function() {
            var opts = {
                lines: 10, // The number of lines to draw
                length: 4, // The length of each line
                width: 4, // The line thickness
                radius: 7, // The radius of the inner circle
                color: '#000', // #rgb or #rrggbb
                speed: 1.2, // Rounds per second
                trail: 56, // Afterglow percentage
                shadow: false // Whether to render a shadow
            };
            spinner = new Spinner(opts).spin();
            var target = document.getElementById("lifestream-loading");
            target.appendChild(spinner.el);
            
        },
        twitter: function() {
            var s = document.createElement("script");
            s.type="text/javascript";
            s.src= "https://api.twitter.com/statuses/user_timeline/javve.json?callback=lifeStream.show";
            document.getElementsByTagName("body")[0].appendChild(s);
        }
    };
    
    this.show = function(tweets) {
        spinner.stop();
        for (var i = 0, il = tweets.length; i < il && i < 10; i++) {
            var tweet = twttr.txt.autoLink(twttr.txt.htmlEscape(tweets[i].text));
            var items = tweetList.add({
                text: tweet
            });
            //instagramHack(items[0]);
        }
    };
    /*
    var instagramHack = function(item) {
        var $links = $(item.elm).find('a');
        if ($links.size()) {
            var link = $($links.get($links.size()-1));
            if (!link.hasClass('username')) {
                var url = link.attr('href');
                console.log(link, url);
                $.get(url, function(data) {
                   console.log(response); 
                });
            }
        }   
    }
    */
    
    init.start();
};

var lifeStream = new LifeStream();