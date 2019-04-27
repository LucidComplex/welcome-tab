function init() {
	const preferences = new Preferences(window.localStorage);
	const wallpaperManager = new WallpaperManager(document, preferences);
	const redditWallpaperProvider = new RedditWallpaperProvider(preferences);
	wallpaperManager.addProvider('Reddit', redditWallpaperProvider);
	wallpaperManager.setRandomWallpaperFromProvider();

	const quoteManager = new QuoteManager(document, preferences);
	const redditQuoteProvider = new RedditQuoteProvider(preferences);
	quoteManager.addProvider('Reddit', redditQuoteProvider);
	quoteManager.setRandomQuoteFromProvider();

	const dateManager = new DateManager(document);
	dateManager.setDate();

	const settings = new Settings(document);
	settings.addComponent(wallpaperManager);
	settings.addComponent(redditWallpaperProvider);
	settings.drawLayout();
}
