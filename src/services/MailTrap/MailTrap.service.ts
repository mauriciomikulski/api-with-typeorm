import { IMailTrap, IMessage } from "../../providers/IMailTrap.provider";
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
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.to.name,
        address: message.to.email
      },
      subject: message.subject,
      html: message.body
    });
  }
}