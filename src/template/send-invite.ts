const sendInvite = (firstName: string, url: string) => {
    return `
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>You're Invited!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), 
                       url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
              }
              @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), 
                       url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
              }
          }
          body {
              background-color: #f0f8ff;
              margin: 0;
              padding: 0;
              font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
              color: #333;
          }
          table {
              border-collapse: collapse !important;
              width: 100%;
          }
          img {
              height: auto;
              line-height: 100%;
              text-decoration: none;
              border: 0;
              outline: none;
          }
          a {
              color: #1e90ff;
              text-decoration: none;
          }
          .email-body {
              background-color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              overflow: hidden;
          }
          .email-header {
              text-align: center;
              padding: 24px;
              background-color: #1e90ff;
              color: #ffffff;
          }
          .email-header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
          }
          .email-content {
              padding: 24px;
          }
          .email-content p {
              margin: 0 0 16px;
              font-size: 16px;
              line-height: 1.5;
          }
          .email-button {
              text-align: center;
              margin: 24px 0;
          }
          .email-button a {
              background-color: #1e90ff;
              color: #ffffff;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              text-decoration: none;
          }
          .email-footer {
              text-align: center;
              padding: 16px;
              font-size: 14px;
              color: #777;
              background-color: #f0f8ff;
              border-top: 1px solid #e0e0e0;
          }
      </style>
  </head>
  
  <body>
      <div class="email-body">
          <!-- Header -->
          <div class="email-header">
              <h1>Welcome to JCM!</h1>
          </div>
  
          <!-- Content -->
          <div class="email-content">
              <p>Hi <strong>${firstName}</strong>,</p>
              <p>We're excited to invite you to join our platform. Get ready to explore a range of features designed to make your experience seamless and enjoyable.</p>
              <div class="email-button">
                  <a href="${url}" target="_blank">Get Started</a>
              </div>
              <p>If the button doesn't work, copy and paste the following link into your browser:</p>
              <p><a href="${url}" target="_blank">${url}</a></p>
              <p><strong>Note:</strong> This link will expire in <strong>48 hours</strong>. Please make sure to use it before it becomes invalid.</p>
              <p>We can't wait to have you on board!</p>
          </div>
  
          <!-- Footer -->
          <div class="email-footer">
              <p>Need help? Reach out to our support team at <h3>hodtechteam@gmail.com</h3>.</p>
              <p>Best Regards,<br>HOD Tech Team</p>
          </div>
      </div>
  </body>
  
  </html>
  `;
  };
  
  export default sendInvite;
  