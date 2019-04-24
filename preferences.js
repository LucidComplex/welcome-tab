const Preferences = function(storage) {
	const self = this;
	this.storage = storage;

	this.getWallpaperProvider = function() {
		return self.wallpaperProvider;
	};

	this.setWallpaperProvider = function(provider) {
		self.storage.setItem('wallpaperProvider', provider);
	};

	this.get = function(key) {
		console.log(key);
		return self.storage.getItem(key);
	};
};
