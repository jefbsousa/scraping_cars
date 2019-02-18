
/*
	The website (https://www.cars.com), will limit search results up to 5K Ads in total,
	however, this can be "changed" using a parameter like:
		"search ads X miles from {NY, SF, ...}"
*/

var puppeteer = require('puppeteer');
var fs = require('fs');


( async () => {
	var browser = await puppeteer.launch({headless: false});
	var page = await browser.newPage();
	await page.setViewport({ width: 950, height: 1450});

	// 'https://www.cars.com/for-sale/searchresults.action/?page=1&perPage=100&rd=99999&searchSource=PAGINATION&showMore=false&sort=relevance&stkTypId=28881&zc=60606&userSetIxt=true'   
	await page.goto('https://www.cars.com/vehicledetail/detail/758401939/overview/'); 
	await page.waitFor(4000); 
	html = await page.content();
	fs.writeFileSync('/home/jeferson/github_projects/scraping_cars/test.html', html)
	// await browser.close()

})();
