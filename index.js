function init() {
	const wallpaperManager = new WallpaperManager(document);
	const redditWallpaperProvider = new RedditWallpaperProvider('imaginarymindscapes');
	wallpaperManager.addProvider('reddit', redditWallpaperProvider);
	wallpaperManager.setRandomWallpaperFromProvider();

	const quoteManager = new QuoteManager(document);
	const redditQuoteProvider = new RedditQuoteProvider('showerthoughts');
	quoteManager.addProvider('reddit', redditQuoteProvider);
	quoteManager.setRandomQuoteFromProvider();

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
