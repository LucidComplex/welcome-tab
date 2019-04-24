const RedditWallpaperProvider = function(preferences) {
	const self = this;
	this.preferences = preferences;

	this.setSubreddit = function(subreddit) {
		self.subreddit = subreddit;
	};

	this.promiseRandomWallpaper = function() {
		return new Promise(function(resolve, reject) {
			const subreddit = self.preferences.get('redditWallpaper') || 'earthporn';
			const endpoint = 'https://www.reddit.com/r/' + subreddit + '.json';
 			const request = new XMLHttpRequest();
 			request.open('get', endpoint, true);
 			request.onload = function() {
 				const response = JSON.parse(this.response);
 				const imageUrl = self.getRandomImageUrlFromResponse(response);
 				resolve(new Wallpaper(imageUrl));
 			}
 			request.onerror = function() {
 				reject();
 			}
 			request.send();
		});
	};

 	this.getRandomImageUrlFromResponse = function(response) {
 		const randomInt = Math.floor(Math.random() * 25);
 		return response.data.children[randomInt].data.url;
 	};
};

