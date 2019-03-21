function init() {
	const style = document.getElementById('style');
	const redditWallpaperProvider = new RedditWallpaperProvider('earthporn');
	const wallpaperWorker = new WallpaperWorker(style, redditWallpaperProvider);
	wallpaperWorker.install();
}
