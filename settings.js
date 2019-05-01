const Settings = function(dom) {
	const self = this;
	this.settingsElement = dom.getElementById('settings');
	this.settingsCloseElement = dom.getElementById('settings-close');
	this.settingsContainerElement = dom.getElementById('settings-container');
	this.settingsComponentsContainer = dom.getElementById('settings-components-container');
	this.saveButton = dom.getElementById('save-button');

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
			if (self.components[i]) {
				self.components[i].save();
			}
		}
		self.onSave();
	}

	this.onSave = function() {
	};

	this.setOnSave = function(callback) {
		self.onSave = callback;
	};

	this.onOpenClick = function() {
		self.settingsContainerElement.classList.add('slide-in');
	};

	this.onCloseClick = function() {
		self.settingsContainerElement.classList.remove('slide-in');
	};

	this.addComponent = function(component) {
		self.components.push(component);
	};

	this.replaceComponent = function(oldComponent, newComponent) {
		for (let i = 0; i < self.components.length; i++) {
			if (self.components[i] === oldComponent) {
				self.components[i] = newComponent;
				return;
			}
		}
	};

	this.drawLayout = function() {
		const element = self.settingsComponentsContainer;
		while (element.lastChild) {
			element.removeChild(element.lastChild);
		}
		for (let i = 0; i < self.components.length; i++) {
			const component = self.components[i];
			if (!component) {
				continue;
			}
			const componentLayout = component.buildSettingsLayout();
			element.appendChild(componentLayout);
		}
	};
};
