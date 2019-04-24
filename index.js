function init() {
	const wallpaperManager = new WallpaperManager(document);
	const redditWallpaperProvider = new RedditWallpaperProvider('imaginarymindscapes');
	redditWallpaperProvider.promiseRandomWallpaper()
		.then(function(wallpaper) {
			wallpaperManager.setWallpaper(wallpaper);
		})
		.catch(function() {
		});

	const quote = document.getElementById('quote');
	const author = document.getElementById('author');
	const redditQuoteProvider = new RedditQuoteProvider('showerthoughts');
	const quoteWorker = new QuoteWorker(quote, author, redditQuoteProvider);
	quoteWorker.displayQuote();

	const todayElement = document.getElementById('date');
	const today = new Today(todayElement);
	today.init();

	const settingsElement = document.getElementById('settings');
	const settingsContainerElement = document.getElementById('settings-container');
	const settings = new Settings(settingsElement, settingsContainerElement);

	const redditWallpaperSettings = new RedditWallpaperProviderSettings(redditWallpaperProvider);
	const wallpaperSettings = new WallpaperWorkerSettings(wallpaperWorker);
	wallpaperSettings.addProvider('Reddit', redditWallpaperSettings);

	settings.addComponents(wallpaperSettings);
	settings.renderComponents();
}
