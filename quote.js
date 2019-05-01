const QuoteManager = function(dom, preferences) {
	const self = this;
	this.providers = {};
	this.quoteElement = dom.getElementById('quote');
	this.authorElement = dom.getElementById('author');
	this.preferences = preferences;
	this.providerField = document.createElement('select');
	this.temporaryProviderName = preferences.getQuoteProvider();

	// ### Attach events
	this.providerField.addEventListener('change', function() {
		const selectedProvider = self.getProvider(self.providerField.value);
		const temporaryProvider = self.getProvider(self.temporaryProviderName);
		self.temporaryProviderName = self.providerField.value;
		self.onProviderFieldChange(temporaryProvider, selectedProvider);
	});
	// ###

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

	this.setQuoteFromProvider = function() {
		const provider = self.getProvider(self.preferences.getQuoteProvider())
			|| self.getProvider(Object.keys(self.providers)[0]);
		provider.promiseQuote()
			.then(function(quote) {
				self.setQuote(quote);
			})
			.catch(function() {
			});
	};

	this.addProviders = function(providers) {
		const names = Object.keys(providers);
		for (let i = 0; i < names.length; i++) {
			self.addProvider(names[i], providers[names[i]]);
		}
	};

	this.buildSettingsLayout = function() {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const label = document.createTextNode('Quote Provider: ');
		const value = self.preferences.get('quoteProvider');
		const providers = Object.keys(self.providers);
		while (self.providerField.lastChild) {
			self.providerField.removeChild(self.providerField.lastChild);
		}
		for (let i = 0; i < providers.length; i++) {
			const option = document.createElement('option', {value: providers[i]});
			option.innerHTML = providers[i];
			self.providerField.appendChild(option);
		}
		self.providerField.value = self.temporaryProviderName;
		span.appendChild(label);
		span.appendChild(self.providerField);
		div.appendChild(span);
		return div;
	};

	this.onProviderFieldChange = function(previousProvider, currentProvider) {
	};

	this.setOnProviderFieldChange = function(onChange) {
		this.onProviderFieldChange = onChange;
	};

	this.save = function() {
		self.preferences.setQuoteProvider(self.providerField.value);
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
		quoteProvider.getQuote().then(function(quote) {
			self.quoteElement.innerHTML = quote.title;
			self.authorElement.innerHTML = '—/u/' + quote.author;
		}).catch(function() {});
	};
};
