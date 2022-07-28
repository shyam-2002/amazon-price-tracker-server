const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(process.env.email_client_id, process.env.email_client_secret, process.env.redirectURI);
oAuth2Client.setCredentials({ refresh_token:process.env.refresh_token });


async function getAccessToken(){
    const accessToken = await oAuth2Client.getAccessToken;
    return accessToken;
}


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        type:'OAuth2',
        user: process.env.user_email,
        clientId: process.env.email_client_id,
        clientSecret: process.env.email_client_secret,
        refreshToken: process.env.refresh_token,
        accessToken: getAccessToken()
    }
}
)
module.exports = transporter;