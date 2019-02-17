
var puppeteer = require('puppeteer');
var fs = require('fs');


( async () => {
	const browser = await puppeteer.launch({hadless: false});
	var page = await browser.newPage();
	await page.setViewPort({ width: 950, height: 1450});

	await page.goto('https://www.carsforsale.com/Search?Radius=100&PageNumber=2&OrderBy=Relevance&OrderDirection=Desc');
	await page.waitFor(3000);
	console.log('Navigated to...')

	// await browser.close()

})();
