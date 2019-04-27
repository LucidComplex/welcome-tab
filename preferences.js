const Preferences = function(storage) {
	const self = this;
	this.storage = storage;

	this.getWallpaperProvider = function() {
		return self.get('wallpaperProvider');
	};

	this.setWallpaperProvider = function(provider) {
		self.storage.setItem('wallpaperProvider', provider);
	};

	this.getQuoteProvider = function() {
		return self.get('quoteProvider');
	};

	this.setQuoteProvider = function(provider) {
		self.storage.setItem('wallpaperProvider', provider);
	};

	this.get = function(key) {
		return self.storage.getItem(key);
	};

	this.set = function(key, value) {
		self.storage.setItem(key, value);
	}
};
