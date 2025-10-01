
const currentYear = new Date().getFullYear();
const companyName = "Bluebee Inc.";
const dashboardUrl = "https://www.google.com"; // Replace with actual dashboard URL


export const VERIFICATION_EMAIL_TEMPLATE = (verificationToken) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin-top: 30px; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <h2 style="color: #333333;">Verify Your Email</h2>
        <p style="color: #666666;">Use the code below to verify your email address:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #4CAF50;">${verificationToken}</div>
        <p style="color: #666666;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 20px; background-color: #f0f0f0;">
        <small style="color: #999999;">&copy; ${currentYear} ${companyName}. All rights reserved.</small>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export const WELCOME_EMAIL_TEMPLATE = (userName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to ${companyName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #4CAF50; color: #ffffff; text-align: center; padding: 30px 20px;">
              <h2 style="margin: 0; font-size: 24px;">Welcome to ${companyName}</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px 20px; color: #333333;">
              <h1 style="font-size: 22px; margin-bottom: 10px;">Hello ${userName},</h1>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                We're excited to have you on board! Thank you for joining <strong>${companyName}</strong>. 
                You’re now part of a growing community, and we can’t wait to see what you’ll do.
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                To get started, just click the button below and explore your dashboard.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Dashboard</a>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #666666; margin-top: 40px;">
                If you have any questions or need help, feel free to reach out to our support team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f0f0f0; text-align: center; padding: 20px; font-size: 12px; color: #999999;">
              &copy; ${currentYear} ${companyName}. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = (resetPasswordLink) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin-top: 30px; border-radius: 8px;">
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <h2 style="color: #333333;">Reset Your Password</h2>
        <p style="color: #666666;">We received a request to reset your password. Click the button below to proceed.</p>
        <a href="${resetPasswordLink}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p style="margin-top: 30px; color: #999999;">If you didn’t request this, you can safely ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 20px; background-color: #f0f0f0;">
        <small style="color: #999999;">&copy; ${currentYear} ${companyName}. All rights reserved.</small>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export const PASSWORD_RESET_SUCCESS_TEMPLATE = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin-top: 30px; border-radius: 8px;">
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <h2 style="color: #333333;">Your Password Was Reset</h2>
        <p style="color: #666666;">This is a confirmation that your password was successfully changed.</p>
        <p style="color: #666666;">If this wasn’t you, please contact support immediately.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 20px; background-color: #f0f0f0;">
        <small style="color: #999999;">&copy; ${currentYear} ${companyName}. All rights reserved.</small>
      </td>
    </tr>
  </table>
</body>
</html>
`
}