
var puppeteer = require('puppeteer');
var fs = require('fs');


( async () => {
	var browser = await puppeteer.launch({headless: false});
	var page = await browser.newPage();
	await page.setViewport({ width: 950, height: 1450});

	await page.goto('https://www.cars.com/vehicledetail/detail/758401939/overview/'); 
	await page.waitFor(4000); 
	html = await page.content();
	fs.writeFileSync('/home/jeferson/github_projects/scraping_cars/test.html', html)
	// await browser.close()

})();
