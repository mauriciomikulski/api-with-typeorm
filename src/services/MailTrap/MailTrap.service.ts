import { IMailTrap, IMessage } from "../../providers/IMailTrapProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailTrapService implements IMailTrap {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "83ef480bfff8b8",
        pass: "8b8e17a7263ca6"
      }
    });
  }

  public async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
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