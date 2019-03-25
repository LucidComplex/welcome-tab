const Today = function(element) {
	const self = this;
	this.element = element;
	this.localization = new Intl.DateTimeFormat('en-US', {month: 'long'});

	this.init = function() {
		const date = new Date();
		self.element.innerHTML = self.localization.format(date) + ' ' + date.getDate();
	};
}
