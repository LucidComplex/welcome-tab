const Settings = function(settingsElement, settingsContainerElement) {
	const self = this;
	this.settingsElement = settingsElement;
	this.settingsContainerElement = settingsContainerElement;

	this.init = function() {
		self.settingsElement.addEventListener('click', self.onClick);
	};

	this.onClick = function() {
		self.settingsContainerElement.classList.add('slide-in');
	};

	this.setOnClick = function(callback) {
		self.onClick = callback;
	};

	this.init();
};
