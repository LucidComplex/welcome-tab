const RedditQuoteProvider = function(preferences) {
	const self = this;
	this.preferences = preferences;

	this.promiseRandomQuote = function() {
		return new Promise(function(resolve, reject) {
			const subreddit = self.preferences.get('quote_reddit') || 'showerthoughts';
			const endpoint = 'https://www.reddit.com/r/' + subreddit + '.json';
			const request = new XMLHttpRequest();
			request.open('get', endpoint, true);
			request.onload = function() {
				const response = JSON.parse(this.response);
				const quote = self.getQuoteFromResponse(response);
				resolve(quote);
			};
			request.onerror = function() {
				reject();
			}
			request.send();
		});
	};

	this.getQuoteFromResponse = function(response) {
		let randomInt = Math.floor(Math.random() * 25);
		while (response.data.children[randomInt].data.stickied) {
			randomInt = Math.floor(Math.random() * 25);
		}
		const data = response.data.children[randomInt].data;
		return new Quote(data.title, '/u/' + data.author);
	};
};
