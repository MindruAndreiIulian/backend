const enrichService = require("../services/CompanyService");

exports.enrichCompanyData = async (req, res) => {
  const { companyName, address, reviews } = req.body;
  const enrichedData = await enrichService.enrichData({
    companyName,
    address,
  });

  let reviewSummary
  
  try{
    reviewSummary = await enrichService.summarizeReviews(reviews, companyName);
  }catch(e){
    reviewSummary = `An error occured when summarizing reviews: ${e.message}`
  }

  try {
    res.json({
      companyData: enrichedData,
      reviewData: { reviews, reviewSummary },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
