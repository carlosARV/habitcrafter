const webpush = require("web-push");
const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

webpush.setVapidDetails(
  "mailto:habit_crafter@gmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);
 
module.exports = webpush;