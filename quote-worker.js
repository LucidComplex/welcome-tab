const RedditQuoteProvider = function(subreddit) {
	const self = this;
	this.subreddit = subreddit;

	this.getRandomQuote = function() {
		return new Promise(function(resolve, reject) {
			const endpoint = 'https://www.reddit.com/r/' + self.subreddit + '.json';
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
		const randomInt = Math.floor(Math.random() * 25);
		return response.data.children[randomInt].data.title;
	};
};

const QuoteWorker = function(element, quoteProvider) {
	const self = this;
	this.element = element;
	this.quoteProvider = quoteProvider;

	this.displayQuote = function() {
		quoteProvider.getRandomQuote().then(function(quote) {
			console.log(quote);
			self.element.innerHTML = quote;
		}).catch(function() {});
	};
};
