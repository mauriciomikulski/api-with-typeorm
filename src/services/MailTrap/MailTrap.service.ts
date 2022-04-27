import { IMailTrap, IMessage } from "../../providers/IMailTrapProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailTrapService implements IMailTrap {
  sendMail;
  constructor() { this.sendMail = MailTrapService.sendMail; }
  
  static setTransporter(): Mail<any> {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "83ef480bfff8b8",
        pass: "8b8e17a7263ca6"
      }
    });
    return transporter;
  }
  

  public static async sendMail(message: IMessage): Promise<void> {
    const transporter = this.setTransporter();
    await transporter.sendMail({
      to: {
        name: message.to.user_name,
        address: message.to.user_email
      },
      from: {
        name: message.to.user_name,
        address: message.to.user_email
      },
      subject: message.subject,
      html: message.body
    });
  }
}