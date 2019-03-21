function init() {
	const body = document.getElementById('body');
	const redditWallpaperProvider = new RedditWallpaperProvider('earthporn');
	const wallpaperWorker = new WallpaperWorker(body, redditWallpaperProvider);
	wallpaperWorker.install();
}
