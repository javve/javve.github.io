var TweetStream = function(id, options) {
    var self = this,
        tweetList,
        tempItem,
        spinner,
        options;
    
    var init = {
        start: function(id, options) {
            options = options;
            this.list(id);
            this.loading();
            this.twitter(options.twitterUrl, options.streamName);
            this.instagram();
        },
        list: function(id) {
            tweetList = new List(id, {
                item: "tmpl-item",
                valueNames: ['text','user']
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
            var target = document.getElementById("stream-loading");
            target.appendChild(spinner.el);
        },
        twitter: function(twitterUrl, streamName) {
            var tweets = cache.get(streamName);
            if (tweets) {
                self.show.tweets(jQuery.parseJSON(tweets));
                return;
            }
            var s = document.createElement("script");
            s.type="text/javascript";
            s.src= twitterUrl+"="+streamName+".show.tweets";
            document.getElementsByTagName("body")[0].appendChild(s);
        },
        instagram: function() {
            $.get('http://instagram.heroku.com/users/9485463.atom', self.show.instagram); 
        }
    };
    
    var cache = {
        get: function(name) {
            if (localStorage) {
                var o = localStorage.getItem(name+'Time');
                if (o) {
                    var currentTimeMillis = new Date().getTime();
                    o = +o;
                    var diff = currentTimeMillis - o;
                    if (diff < 3600000) {
                        return localStorage.getItem(name);
                    }
                }
            }
            return false;
        },
        set: function(name, content) {
            if (localStorage) {
                var currentTimeMillis = new Date().getTime();
                localStorage.setItem(name+"Time", currentTimeMillis);
                localStorage.setItem(name, content);
                return true;
            }
            return false;
        }
    }
    
    this.show = {
        tweets: function(tweets) {
            var getTweet = tweetFrom.timeline;
            if (tweets.results) {
                tweets = tweets.results;
                getTweet = tweetFrom.search;
            } else {
                if (tweets[0] && tweets[0].from_user) {
                    getTweet = tweetFrom.search;
                }
            }
            spinner.stop();
			var maxLength = options.count || 7;
            for (var i = 0, il = tweets.length; i < il && i < maxLength; i++) {
                var tweet = getTweet(tweets[i]);
            
                tweetList.add({
                    text: tweet.text,
                    user: tweet.user
                });
            }
            cache.set(options.streamName, JSON.stringify(tweets));
        }, 
        instagram: function(data) {
            var jsonData = parseXML(data);
            console.log(jsonData);
        }
    };
    
    var tweetFrom = {
        timeline: function(t) {
            var u = t.user,
                url = "http://twitter.com/"+u.screen_name+"/status/"+t.id_str,
                created = t.created_at.substring(0,t.created_at.length-14),
                name = "@"+u.screen_name,
                text = twttr.txt.autoLink(twttr.txt.htmlEscape(t.text)),
                user = '<a href="'+url+'"><span class="name">'+name+'</span> <span class="date">'+created+'</span></a>';
            return {
                text: text,
                user: user
            };
        }, 
        search: function(t) {
            var url = "http://twitter.com/"+t.from_user+"/status/"+t.id_str,
                created = t.created_at.substring(0,t.created_at.length-14),
                name = "@"+t.from_user,
                text = twttr.txt.autoLink(twttr.txt.htmlEscape(t.text)),
                user = '<a href="'+url+'"><span class="name">'+name+'</span> <span class="date">'+created+'</span></a>';
            return {
                text: text,
                user: user
            };
        }
    }
    
    init.start(id, options);
};