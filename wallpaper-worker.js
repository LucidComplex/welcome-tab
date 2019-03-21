const WallpaperWorker = function(element, provider) {
	const self = this;
	this.element = element;
	this.provider = provider;

	this.install = function() {
		self.provider.getRandom('earthporn').then(function(url) {
			self.element.setAttribute('style', 'background-image: url("' + url + '");');
		}).catch(function(){});
	}
}

const uuid = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)}

const RedditWallpaperProvider = function(accessToken) {
	const self = this;

	this.getRandom = function(subreddit) {
		return new Promise(function(resolve, reject) {
			const endpoint = 'https://www.reddit.com/r/' + subreddit + '.json';
			const request = new XMLHttpRequest();
			request.open('get', endpoint, true);
			request.onload = function() {
				const response = JSON.parse(this.response);
				console.log(response);
				resolve(response.data.children[0].url);
			}
			request.onerror = function() {
				reject();
			}
			request.send();
		});
	}
}
