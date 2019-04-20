const Settings = function(settingsElement, settingsContainerElement) {
	const self = this;
	this.settingsElement = settingsElement;
	this.settingsContainerElement = settingsContainerElement;

	this.components = [];

	this.init = function() {
		self.settingsElement.addEventListener('click', self.onClick);
		const closeElements = self.settingsContainerElement.getElementsByClassName('close');
		closeElements.item(0).addEventListener('click', self.onCloseClick);
		self.renderComponents();
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

	this.renderComponents = function() {
		const container = self.settingsContainerElement.getElementsByClassName('forms-container')[0];
		while (container.lastChild) {
			container.removeChild(container.lastChild);
		}
		self.components.forEach(function(component) {
			container.appendChild(component);
		});
		const save = document.createElement('button');
		save.innerHTML = 'Save';
		container.appendChild(save);
	};

	this.addComponents = function(component) {
		self.components.push(component);
	}

	this.init();
};
