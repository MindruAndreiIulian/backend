const constants = require("../constants");
const axios = require("axios");

exports.enrichData = async (payload) => {
  const { companyName, address, website } = payload;
  const data = {
    commercial_names: [companyName],
    address_txt: address,
    website,
  };

  try {
    const response = await axios.post(constants.VERIDION_API, data, {
      headers: {
        "X-api-key": "T0U9qKCVhtiDBUdblJovoz1Af70P7TeNsYOjWJ7K8gXngbB97PGnMAo4JNiA",
        "Content-type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

exports.summarizeReviews = async (reviews, company) => {
  try {
    const prompt = `Summarize the following reviews about the ${company} products:\n${reviews
      .map((review) => review.text.slice(0, 300))
      .join("\n")}\n\nSummary:`;

    const response = await axios.post(
      constants.GPT_API,
      {
        prompt,
        max_tokens: constants.MAX_TOKENS,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();
    return summary + `(based on ${reviews.length} reviews)`;
  } catch (error) {
    console.error("Error making API request:", error.message);
    throw error;
  }
};
