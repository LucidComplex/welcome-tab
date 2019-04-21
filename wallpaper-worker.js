const WallpaperWorker = function(element, provider) {
	const self = this;
	this.element = element;
	this.provider = provider;

	this.apply = function() {
		self.provider.getRandom().then(function(url) {
			self.element.innerHTML = '.bg {background-image: url("' + url + '");}';
		}).catch(function(){});
	}
}

const RedditWallpaperProvider = function(subreddit) {
	const self = this;
	this.subreddit = subreddit;

	this.getRandom = function() {
		return new Promise(function(resolve, reject) {
			const endpoint = 'https://www.reddit.com/r/' + self.subreddit + '.json';
			const request = new XMLHttpRequest();
			request.open('get', endpoint, true);
			request.onload = function() {
				const response = JSON.parse(this.response);
				const imageUrl = self.getRandomImageUrlFromResponse(response);
				resolve(imageUrl);
			}
			request.onerror = function() {
				reject();
			}
			request.send();
		});
	}

	this.getRandomImageUrlFromResponse = function(response) {
		const randomInt = Math.floor(Math.random() * 25);
		return response.data.children[randomInt].data.url;
	}
}
