let DATA = [];

function extractSingle(item) {
	let link = item.querySelector('.entity-result__title-text').querySelector('a');
	let location = item.querySelector('.entity-result__primary-subtitle').innerText.split(" • ");
	return [link.innerText, link.href, location[1]]
}

function extractAll() {
	let companies = document.querySelectorAll('.entity-result__item');
	for (let company of companies) {
		DATA.push(extractSingle(company))
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goToNextPage() {
	window.scrollTo(0, 2500);
	await sleep(1000);

    let nextBtn = document.querySelector('.artdeco-pagination__button--next');
    if (nextBtn.disabled) return false;

    nextBtn.click();
    await sleep(5000);
    return true;
}

async function main(totalPages = 2) {
	let totalCrawled = 0;
	let nextPageExists = true;
	while (totalCrawled < totalPages && nextPageExists) {
		extractAll();
		nextPageExists = await goToNextPage();
		totalCrawled++;
	}

}

main();