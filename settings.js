const Settings = function(dom) {
	const self = this;
	this.settingsElement = dom.getElementById('settings');
	this.settingsCloseElement = dom.getElementById('settings-close');
	this.settingsContainerElement = dom.getElementById('settings-container');
	this.settingsComponentsContainer = dom.getElementById('settings-components-container');
	this.saveButton = document.createElement('button');

	this.components = [];

	// ### Attach event listeners
	this.settingsElement.addEventListener('click', function() {
		self.onOpenClick();
	});
	this.settingsCloseElement.addEventListener('click', function() {
		self.onCloseClick();
	});
	this.saveButton.addEventListener('click', function() {
		self.onSaveClick();
	});
	// ###

	this.onSaveClick = function() {
		for (let i = 0; i < self.components.length; i++) {

		}
	}

	this.onOpenClick = function() {
		self.settingsContainerElement.classList.add('slide-in');
	};

	this.onCloseClick = function() {
		self.settingsContainerElement.classList.remove('slide-in');
	};

	this.addComponent = function(component) {
		self.components.push(component);
	};

	this.drawLayout = function() {
		for (let i = 0; i < self.components.length; i++) {
			const component = self.components[i].buildSettingsLayout();
			self.settingsComponentsContainer.appendChild(component);
		}
		self.saveButton.innerHTML = 'Save';
		self.settingsComponentsContainer.appendChild(self.saveButton);
	};
};
