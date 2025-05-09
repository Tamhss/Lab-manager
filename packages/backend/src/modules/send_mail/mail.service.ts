import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EConfiguration } from '@core/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>(EConfiguration.SMTP_HOST),
      port: this.configService.get<number>(EConfiguration.SMTP_PORT),
      auth: {
        user: this.configService.get<string>(EConfiguration.SMTP_USER),
        pass: this.configService.get<string>(EConfiguration.SMTP_PASS),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const from = this.configService.get<string>(EConfiguration.SMTP_FROM);
    return await this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  }
}
