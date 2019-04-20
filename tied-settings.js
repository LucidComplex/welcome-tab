const RedditWallpaperProviderSettings = function(provider) {
	this.build = function() {
		const span = document.createElement('span');
		const label = document.createTextNode('Reddit Wallpaper Subreddit');
		const field = document.createElement('input', {type: 'text'});
		field.value = provider.subreddit;
		const header = document.createElement('h6');
		const div = document.createElement('div');
		span.appendChild(label);
		span.appendChild(field);
		div.appendChild(span);
		return div;
	};
};

const WallpaperWorkerSettings = function() {
	const self = this;

	this.providers = {};

	this.build = function() {
		const div = document.createElement('div');
		const header = document.createElement('h5');
		const headerText = document.createTextNode('Wallpaper Provider');
		const providerSelect = document.createElement('select');
		providerSelect.addEventListener('change', function() {
			console.log('changed');
		});
		const providerKeys = Object.keys(self.providers);
		for (let i = 0; i < providerKeys.length; i++) {
			let option = document.createElement('option', {value: providerKeys[i]});
			option.innerHTML = providerKeys[i];
			providerSelect.appendChild(option);
		}
		header.appendChild(headerText);
		div.appendChild(header);
		div.appendChild(providerSelect);
		const selectedProvider = self.getProvider(providerSelect.value);
		if (selectedProvider) {
			div.appendChild(selectedProvider.build());
		}
		return div;
	};

	this.getProvider = function(key) {
		const providerKeys = Object.keys(self.providers);
		for (let i = 0; i < providerKeys.length; i++) {
			if (key === providerKeys[i]) {
				return self.providers[providerKeys[i]];
			}
		}
		return null;
	};

	this.addProvider = function(name, provider) {
		self.providers[name] = provider;
	};
};
