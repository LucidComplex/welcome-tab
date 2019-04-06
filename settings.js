const Settings = function(settingsElement) {
	const self = this;
	this.settingsElement = settingsElement;

	this.init = function() {
		self.settingsElement.addEventListener('click', self.onClick);
	};

	this.onClick = function() {
		console.log('yes');
	};

	this.init();
};
