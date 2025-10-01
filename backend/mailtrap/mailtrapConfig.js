
import { envConfig } from "../config/envConfig.js"
import { MailtrapClient } from "mailtrap"

export const mailtrapClient = new MailtrapClient({
  token: envConfig.MAILTRAP_TOKEN,
});

export const emailSender = {
  email: "hello@demomailtrap.co",
  name: "Blue bee",
};
