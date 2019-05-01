function init() {
	const preferences = new Preferences(window.localStorage);
	const wallpaperManager = new WallpaperManager(document, preferences);
	const redditWallpaperProvider = new RedditWallpaperProvider(preferences);
	const wallpaperProviders = {
		'None': null,
		'Reddit': redditWallpaperProvider,
	}
	let providerName = preferences.getWallpaperProvider();
	if (!providerName) {
		providerName = 'Reddit';
		preferences.setWallpaperProvider(providerName);
	}
	wallpaperManager.addProviders(wallpaperProviders);
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
	wallpaperManager.setOnProviderFieldChange(function(previousProvider, currentProvider) {
		settings.replaceComponent(previousProvider, currentProvider);
		settings.drawLayout();
	});
	settings.setOnSave(function() {
		wallpaperManager.setRandomWallpaperFromProvider();
	});
	settings.drawLayout();
}
