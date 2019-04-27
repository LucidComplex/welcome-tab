const WallpaperManager = function(dom, preferences) {
	const self = this;
	this.providers = {};
	this.styleElement = dom.getElementById('style');
	this.settings = settings;
	this.preferences = preferences;

	this.setWallpaper = function(wallpaper) {
		self.styleElement.innerHTML = '.bg {background-image: url("' + wallpaper.url + '");}';
	};

	this.addProvider = function(name, provider) {
		self.providers[name] = provider;
	};

	this.getProvider = function(name) {
		return self.providers[name];
	};

	this.setRandomWallpaperFromProvider = function() {
		const provider = self.getProvider(self.preferences.getWallpaperProvider())
			|| self.getProvider(Object.keys(self.providers)[0]);
		provider.promiseRandomWallpaper()
			.then(function(wallpaper) {
				self.setWallpaper(wallpaper);
			})
			.catch(function() {
			});
	};
};

const Wallpaper = function(url) {
	this.url = url;
};

