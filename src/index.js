/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import mailchimp from "@mailchimp/mailchimp_marketing";

const MAILCHIMP_API_KEY = "ab8f895310006feb7d104d1516f43bc7-us21";
const MAILCHIMP_API_SERVER = "us21";
const MAILCHIMP_AUDIENCE_ID = "fba5e5d181";

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_API_SERVER, // e.g. us1
});


export default async (req, res) => {
  const { email } = req.body;
  // Add headers to the response

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
