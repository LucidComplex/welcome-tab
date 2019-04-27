const DateManager = function(dom) {
	const self = this;
	this.element = dom.getElementById('date');
	this.localization = new Intl.DateTimeFormat('en-US', {month: 'long'});

	this.setDate = function() {
		const date = new Date();
		self.element.innerHTML = self.localization.format(date) + ' ' + date.getDate();
	};
}
