const WallpaperManager = function(dom, preferences) {
	const self = this;
	this.providers = {};
	this.styleElement = dom.getElementById('style');
	this.preferences = preferences;
	this.temporaryProviderName = preferences.getWallpaperProvider();
	this.providerField = document.createElement('select');

	// ### Attach events
	this.providerField.addEventListener('change', function() {
		const selectedProvider = self.getProvider(self.providerField.value);
		const temporaryProvider = self.getProvider(self.temporaryProviderName);
		self.temporaryProviderName = self.providerField.value;
		self.onProviderFieldChange(temporaryProvider, selectedProvider);
	});
	// ###

	this.setWallpaper = function(wallpaper) {
		self.styleElement.innerHTML = '.bg {background-image: url("' + wallpaper.url + '");}';
	};

	this.addProvider = function(name, provider) {
		self.providers[name] = provider;
	};

	this.addProviders = function(providers) {
		const names = Object.keys(providers);
		for (let i = 0; i < names.length; i++) {
			self.addProvider(names[i], providers[names[i]]);
		}
	}

	this.getProvider = function(name) {
		return self.providers[name];
	};

	this.setRandomWallpaperFromProvider = function() {
		const providerName = self.preferences.getWallpaperProvider();
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
		self.preferences.setWallpaperProvider(self.providerField.value);
	};
};

const Wallpaper = function(url) {
	this.url = url;
};

