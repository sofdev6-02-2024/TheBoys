import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class MailerService {
  createEmailBody(
    title: string,
    status: string,
    body: string,
    comments: string | null,
    textClosing: string,
    imageCid: string,
    imageText: string,
  ): string {
    return `
      <h2>${title}</h2>
      <img src="cid:${imageCid}" alt="${imageText}" />
      <h3>Status of your request: ${status}</h3>
      <p>${body}</p>
      ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''} 
      <h4>${textClosing}</h4>
    `;
  }

  async sendEmail(
    toEmail: string,
    subject: string,
    title: string,
    imagePath: string,
    status: string,
    body: string | null,
    comments: string,
    textClosing: string,
    imageCid: string,
    imageText: string,
  ) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jheremykay777@gmail.com',
        pass: 'hdsr jiof gydp qwam',
      },
    });

    const emailBody = this.createEmailBody(
      title,
      status,
      body,
      comments,
      textClosing,
      imageCid,
      imageText,
    );

    const mailOptions = {
      from: 'jheremykay777@gmail.com',
      to: toEmail,
      subject: subject,
      html: emailBody,
      attachments: [
        {
          filename: path.basename(imagePath),
          path: imagePath,
          cid: imageCid,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return `Email sent to ${toEmail}`;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
