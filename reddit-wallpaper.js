const RedditWallpaperProvider = function(preferences) {
	const self = this;
	this.preferences = preferences;

	this.setSubreddit = function(subreddit) {
		self.subreddit = subreddit;
	};

	this.promiseRandomWallpaper = function() {
		return new Promise(function(resolve, reject) {
			let subreddit = self.preferences.get('wallpaper_reddit');
			if (!subreddit) {
				subreddit = 'earthporn';
				self.preferences.set('wallpaper_reddit', subreddit);
			}
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

	this.buildSettingsLayout = function() {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const label = document.createTextNode('Wallpaper subreddit: ');
		const value = self.preferences.get('wallpaper_reddit');
		const field = document.createElement('input', {type: 'text'});
		field.value = value;
		span.appendChild(label);
		span.appendChild(field);
		div.appendChild(span);
		return div;
	};
};
