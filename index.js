function init() {
	const preferences = new Preferences(window.localStorage);
	const wallpaperManager = new WallpaperManager(document, preferences);
	const redditWallpaperProvider = new RedditWallpaperProvider(preferences);
	wallpaperManager.addProvider('reddit', redditWallpaperProvider);
	wallpaperManager.setRandomWallpaperFromProvider();

	const quoteManager = new QuoteManager(document, preferences);
	const redditQuoteProvider = new RedditQuoteProvider(preferences);
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
