import { mailtrapClient, emailSender } from "./mailtrapConfig.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (toEmail, verificationToken) => {
  const recipients = [
    {
      email: toEmail,
    },
  ];

  try {
    const response = await mailtrapClient
    .send({
      from: emailSender,
      to: recipients,
      subject: "Verify your account",
      html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
      category: "Email verification",
    })

    console.log("Verification email sent successfully", response);
    return;

  } catch (error) {
    console.error("Error sending verification email:", error);
    return;
  }
};

export const sendWelcomeEmail = async (toEmail, userName) => {
  const recipients = [
    {
      email: toEmail,
    },
  ];

  try {
    const response = await mailtrapClient
    .send({
      from: emailSender,
      to: recipients,
      subject: "Welcome to Your Company!",
      html: WELCOME_EMAIL_TEMPLATE(userName),
      category: "Welcome email",
    })

    if(!response.success) {
      console.log("Failed to send Welcome email", response);
    }

    console.log("Welcome email sent successfully", response);
    return;

  } catch (error) {
    console.error("Error sending welcome email:", error);
    return;
  }
};

export const sendResetPasswordEmail = async (toEmail, resetPasswordLink ) => {
  const recipients = [
    {email: toEmail}
  ]

  try {
    const response = await mailtrapClient.send({
      from: emailSender,
      to: recipients,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE(resetPasswordLink),
      category: "Password reset",
    })

    if(!response.success) {
      console.log("Failed to send Reset Password email", response);
    }

    console.log("Reset Password email sent successfully", response);
    return;

  }catch(error){
    console.error("Error sending reset password email: ", error.message)
    return 
  }
}

export const sendPasswordResetSuccessEmail = async (toEmail) => {
  const recipients = [{email: toEmail}]

  try {
    const response = await mailtrapClient.send({
      from: emailSender,
      to: recipients,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE(),
      category: "Password reset success"
    })

    if(!response.success){
      console.log("Failed to send Password Reset Success email", response);
    }

    console.log("Password Reset Success email sent successfully", response);
    return;
  }catch(error){
    console.error("Error sending password reset success email: ", error.message)
    return
  }
}