const WallpaperManager = function(dom) {
	const self = this;
	this.styleElement = dom.getElementById('style');

	this.setWallpaper = function(wallpaper) {
		this.styleElement.innerHTML = '.bg {background-image: url("' + wallpaper.url + '");}';
	};
};

const Wallpaper = function(url) {
	this.url = url;
};

