const RedditQuoteProvider = function(preferences) {
	const self = this;
	this.preferences = preferences;
	this.field = document.createElement('input', {type: 'text'});

	this.promiseQuote = function() {
		return new Promise(function(resolve, reject) {
			let subreddit = self.preferences.get('quote_reddit');
			if (!subreddit) {
				subreddit = 'showerthoughts';
				self.preferences.set('quote_reddit', subreddit);
			}
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

	this.buildSettingsLayout = function() {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const label = document.createTextNode('Quote subreddit: ');
		const value = self.preferences.get('quote_reddit');
		self.field.value = value;
		span.appendChild(label);
		span.appendChild(self.field);
		div.appendChild(span);
		return div;
	};

	this.save = function() {
		self.preferences.set('quote_reddit', self.field.value);
	};
};
