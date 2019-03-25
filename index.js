function init() {
	const style = document.getElementById('style');
	const redditWallpaperProvider = new RedditWallpaperProvider('earthporn');
	const wallpaperWorker = new WallpaperWorker(style, redditWallpaperProvider);
	wallpaperWorker.install();

	const quote = document.getElementById('quote');
	const redditQuoteProvider = new RedditQuoteProvider('showerthoughts');
	const quoteWorker = new QuoteWorker(quote, redditQuoteProvider);
	quoteWorker.displayQuote();

	const todayElement = document.getElementById('date');
	const today = new Today(todayElement);
	today.init();
}
