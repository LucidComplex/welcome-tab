const WallpaperManager = function(dom, preferences) {
	const self = this;
	this.providers = {};
	this.styleElement = dom.getElementById('style');
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
		let providerName = self.preferences.getWallpaperProvider();
		if (!providerName) {
			providerName = Object.keys(self.providers)[0];
			self.preferences.setWallpaperProvider(providerName);
		}
		const provider = self.getProvider(providerName);
		provider.promiseRandomWallpaper()
			.then(function(wallpaper) {
				self.setWallpaper(wallpaper);
			})
			.catch(function() {
			});
	};

	this.buildSettingsLayout = function() {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const label = document.createTextNode('Wallpaper Provider: ');
		const value = self.preferences.get('wallpaperProvider');
		const field = document.createElement('select', {value});
		const providers = Object.keys(self.providers);
		for (let i = 0; i < providers.length; i++) {
			const option = document.createElement('option', {value: providers[i]});
			option.innerHTML = providers[i];
			field.appendChild(option);
		}
		span.appendChild(label);
		span.appendChild(field);
		div.appendChild(span);
		return div;
	};
};

const Wallpaper = function(url) {
	this.url = url;
};

