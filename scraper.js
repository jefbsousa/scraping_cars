
/*
	The website (https://www.cars.com), will limit search results up to 5K Ads in total,
	however, this can be "changed" using a parameter like:
		"search ads X miles from {NY, SF, ...}"
*/

var puppeteer = require('puppeteer');
var fs = require('fs');
var JSSoup = require('jssoup').default;


async function fetch_ads(page){
	selector = 'a.shop-srp-listings__listing';
	return await page.$$eval(selector, am => am.filter(e => e.href).map(e => e.href))
}


( async () => {
	var browser = await puppeteer.launch({headless: false});
	var page = await browser.newPage();
	await page.setViewport({ width: 950, height: 1450});

	// 'https://www.cars.com/for-sale/searchresults.action/?page=50&perPage=100&rd=99999&searchSource=PAGINATION&shippable-dealers-checkbox=true&showMore=false&sort=relevance&zc=60606&localVehicles=false'
	
	ny_url = 'https://www.cars.com/for-sale/searchresults.action/?page=1&perPage=100&rd=75&searchSource=GN_REFINEMENT&shippable-dealers-checkbox=true&showMore=false&sort=relevance&zc=10019&localVehicles=false';    

	await page.goto(ny_url);

	for(search_ind=1; search_ind <= 4; search_ind++){
		links = await fetch_ads(page);
		console.log(links.slice(1,3));
		await page.goto(`https://www.cars.com/for-sale/searchresults.action/?page=${search_ind}&perPage=100&rd=75&searchSource=GN_REFINEMENT&shippable-dealers-checkbox=true&showMore=false&sort=relevance&zc=10019&localVehicles=false`);
		await page.waitFor(3000);
	}

	await page.goto('https://www.cars.com/vehicledetail/detail/758401939/overview/'); 
	await page.waitFor(4000); 
	html = await page.content();
	fs.writeFileSync('/home/jeferson/github_projects/scraping_cars/test.html', html)
	// await browser.close()

})();
