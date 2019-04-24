function init() {
	const wallpaperManager = new WallpaperManager(document);
	const redditWallpaperProvider = new RedditWallpaperProvider('imaginarymindscapes');
	redditWallpaperProvider.promiseRandomWallpaper()
		.then(function(wallpaper) {
			wallpaperManager.setWallpaper(wallpaper);
		})
		.catch(function() {
		});

	const quoteManager = new QuoteManager(document);
	const redditQuoteProvider = new RedditQuoteProvider('showerthoughts');
	redditQuoteProvider.promiseRandomQuote()
		.then(function(quote) {
			quoteManager.setQuote(quote);
		})
		.catch(function() {
		});

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
