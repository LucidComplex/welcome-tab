const LinkWallpaperProvider = function(preferences) {
	const self = this;
	this.preferences = preferences;
	this.field = document.createElement('input', {type: 'text'});

	this.promiseWallpaper = function() {
		return new Promise(function(resolve, reject) {
			let wallpaper = self.preferences.get('wallpaper_link');
			if (!wallpaper) {
				wallpaper = 'https://via.placeholder.com/100/000000?text=%20'
			}
			resolve(new Wallpaper(wallpaper));
		});
	};

	this.buildSettingsLayout = function() {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const label = document.createTextNode('Wallpaper URL: ');
		const value = self.preferences.get('wallpaper_link');
		self.field.value = value;
		span.appendChild(label);
		span.appendChild(self.field);
		div.appendChild(span);
		return div;
	};

	this.save = function() {
		const fieldValue = self.field.value;
		if (fieldValue.match(/^https?:\/\//)) {
			self.preferences.set('wallpaper_link', self.field.value);
		} else {
			self.preferences.set('wallpaper_link', 'https://' + self.field.value);
		}
	};
};
