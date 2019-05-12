const puppeteer = require('puppeteer');

const chatinputSelector = '#main > footer div.selectable-text[contenteditable]';
const interval = 750;

const getMessage = () => {
	const smileys = ['*_*', '`_`', '+_+', '"_"'];
	const smileys2 = [':)', ';)', ':]', ':|'];
	return smileys[Math.ceil(Math.random() * smileys.length)] + "  " + smileys2[Math.ceil(Math.random() * smileys2.length)];
};

(async () => {
	const browser = await puppeteer.launch({
		executablePath: '/usr/bin/google-chrome-stable',
		headless: false
	});

	const page = await browser.newPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 12) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15'
	);

	try {
		await page.goto('https://web.whatsapp.com/', {timeout: 60000});
	} catch (error) {
		console.log('error while navigation');
	}

	console.log('open the chat to spam bomb within 15 seconds');
	setTimeout(() => {
		page.$eval(chatinputSelector, elem => elem.click())
			.then(() => {
				console.log('gonna flood the chat with messagees x)');
				setInterval(async () => {
					await page.keyboard.down('Shift');
					await page.keyboard.press('Enter');
					await page.keyboard.up('Shift');
					await page.keyboard.type(getMessage());
					await page.keyboard.press('Enter');
				}, interval);
			})
			.catch(error => console.log(error));
	}, 15000);
})();
