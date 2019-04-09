const Settings = function(settingsElement, settingsContainerElement) {
	const self = this;
	this.settingsElement = settingsElement;
	this.settingsContainerElement = settingsContainerElement;

	this.init = function() {
		self.settingsElement.addEventListener('click', self.onClick);
		const closeElements = self.settingsContainerElement.getElementsByClassName('close');
		closeElements.item(0).addEventListener('click', self.onCloseClick);
	};

	this.onClick = function() {
		self.settingsContainerElement.classList.add('slide-in');
	};

	this.onCloseClick = function() {
		self.settingsContainerElement.classList.remove('slide-in');
	}

	this.setOnClick = function(callback) {
		self.onClick = callback;
	};

	this.onClose = function() {
	};

	this.init();
};
