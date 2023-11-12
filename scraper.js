const puppeteer = require("puppeteer");
const fs = require("fs");

scrapeReviews = async () => {
  const url = process.argv[2];
  const maxPages = process.argv[3];
  const outputFile = "reviews.json";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Googlebot');

  try {
    const allReviews = [];

    for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
      const currentPageUrl =
        currentPage === 1 ? url : `${url}?page=${currentPage}`;
      await page.goto(currentPageUrl);

      // Wait for reviews to load (you might need to adjust the selector based on the actual structure of the page).

      // Extract review data.
      const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll(
          ".styles_reviewContent__0Q2Tg"
        );
        const reviewsData = [];

        reviewElements.forEach((element) => {
          // Wait for the rating element to be available.
          const titleElement = element.querySelector("h2");
          const textElement = element.querySelector(
            ".typography_body-l__KUYFJ"
          );
          const dateElement = element.querySelector(
            ".typography_body-m__xgxZ_"
          );

          if (titleElement && textElement && dateElement) {
            const title = titleElement.innerText.trim();
            const text = textElement.innerText.trim().replace(/\n/g, " ");
            const date = dateElement.innerText
              .trim()
              .replace("Date of experience:", "")
              .trim();

            reviewsData.push({ title, text, date });
          }
        });

        return reviewsData;
      });

      allReviews.push(...reviews);

      // Check if there is a next page button.
      const nextPageButton = await page.$(".pagination-link_next__SDNU4");
      if (!nextPageButton) {
        break; // No next page, exit loop.
      }

      // Click the next page button.
      await nextPageButton.click();
    }

    // Write all reviews to a JSON file.
    fs.writeFileSync(outputFile, JSON.stringify(allReviews, null, 2), "utf-8");

    console.log(`Reviews scraped successfully and saved to ${outputFile}`);
  } catch (error) {
    console.error("Error scraping reviews:", error);
  } finally {
    await browser.close();
  }
};

scrapeReviews();
