const QuoteManager = function(dom, settings) {
	const self = this;
	this.providers = {};
	this.quoteElement = dom.getElementById('quote');
	this.authorElement = dom.getElementById('author');

	this.setQuote = function(quote) {
		self.quoteElement.innerHTML = quote.getContent();
		self.authorElement.innerHTML = '— ' + quote.author;
	};

	this.addProvider = function(name, provider) {
		self.providers[name] = provider;
	};

	this.getProvider = function(name) {
		return self.providers[name];
	};

	this.setRandomQuoteFromProvider = function() {
		const provider = self.getProvider('reddit');
		provider.promiseRandomQuote()
			.then(function(quote) {
				self.setQuote(quote);
			})
			.catch(function() {
			});
	};
};

const Quote = function(content, author) {
	const self = this;

	this.content = content;
	this.author = author;

	this.setContent = function(content) {
		self.content = content;
	};

	this.setAuthor = function(author) {
		self.author = author;
	};

	this.getContent = function() {
		return self.content;
	};

	this.getAuthor = function() {
		return self.author;
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
