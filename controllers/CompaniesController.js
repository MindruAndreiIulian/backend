const enrichService = require("../services/CompanyService");

exports.enrichCompanyData = async (req, res) => {
  const { companyName, address, website, reviews } = req.body;
  const enrichedData = await enrichService.enrichData({
    companyName,
    address,
    website,
  });
console.log(req.body)
  const reviewSummary = await enrichService.summarizeReviews(reviews, companyName);

  try {
    res.json({
      companyData: enrichedData,
      reviewData: { reviews, reviewSummary },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
