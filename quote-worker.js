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
		while (response.data.children[randomInt].data.stickied) {
			randomInt = Math.floor(Math.random() * 25);
		}
		return {
			title: response.data.children[randomInt].data.title,
			author: response.data.children[randomInt].data.author
		};
	};
};

const QuoteWorker = function(quoteElement, authorElement, quoteProvider) {
	const self = this;
	this.quoteElement = quoteElement;
	this.authorElement = authorElement;
	this.quoteProvider = quoteProvider;

	this.displayQuote = function() {
		quoteProvider.getRandomQuote().then(function(quote) {
			self.quoteElement.innerHTML = quote.title;
			self.authorElement.innerHTML = '—/u/' + quote.author;
		}).catch(function() {});
	};
};
