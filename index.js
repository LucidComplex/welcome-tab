function init() {
	const preferences = new Preferences(window.localStorage);
	const wallpaperManager = new WallpaperManager(document, preferences);
	const redditWallpaperProvider = new RedditWallpaperProvider(preferences);
	const linkWallpaperProvider = new LinkWallpaperProvider(preferences);
	const wallpaperProviders = {
		'None': null,
		'Reddit': redditWallpaperProvider,
		'URL': linkWallpaperProvider,
	}
	let providerName = preferences.getWallpaperProvider();
	if (!providerName) {
		providerName = 'Reddit';
		preferences.setWallpaperProvider(providerName);
	}
	wallpaperManager.addProviders(wallpaperProviders);
	wallpaperManager.setWallpaperFromProvider();

	const quoteManager = new QuoteManager(document, preferences);
	const redditQuoteProvider = new RedditQuoteProvider(preferences);
	const quoteProviders = {
		'None': null,
		'Reddit': redditQuoteProvider,
	};
	providerName = preferences.getQuoteProvider();
	if (!providerName) {
		providerName = 'Reddit';
		preferences.setQuoteProvider(providerName);
	}
	quoteManager.addProviders(quoteProviders);
	quoteManager.setQuoteFromProvider();

	const dateManager = new DateManager(document);
	dateManager.setDate();

	const settings = new Settings(document);
	settings.addComponent(wallpaperManager);
	settings.addComponent(wallpaperProviders[preferences.getWallpaperProvider()]);
	settings.addComponent(quoteManager);
	settings.addComponent(quoteProviders[preferences.getQuoteProvider()]);
	const providerFieldChange = function(previousProvider, currentProvider) {
		settings.replaceComponent(previousProvider, currentProvider);
		settings.drawLayout();
	};
	wallpaperManager.setOnProviderFieldChange(providerFieldChange);
	quoteManager.setOnProviderFieldChange(providerFieldChange)
	settings.setOnSave(function() {
		wallpaperManager.setWallpaperFromProvider();
		quoteManager.setQuoteFromProvider();
	});
	settings.drawLayout();
}
