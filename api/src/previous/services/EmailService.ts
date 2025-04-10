// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import {render} from "@react-email/render";
// import * as React from "react";
// import VerificationEmail from "../emails/VerificationEmail";
// import WelcomeEmail from   "../emails/WelcomeEmail"


// dotenv.config()


// export class EmailService {


//     private static transporter = nodemailer.createTransport({
//         host : process.env.EMAIL_HOST,
//         // port: 465,
//         port: 2080,
//         secure: true,
//         auth: {
//             user : process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });


//     public static async sendVerificationEmail(to: string, token: string): Promise<void> {
//         const verificationUrl = `${process.env.FRONTEND_URL}/verifiy-email?token=${token}`;
//         // const htmlContent = await render(
//         //     <VerificationEmail verificationUrl={verificationUrl}/> as unknown as React.ReactElement
//         // );

//         const htmlContent = await render(
//             React.createElement(VerificationEmail, { verificationUrl })
//         );
        

//         await EmailService.transporter.sendMail({
//             from: `"Support" <${process.env.EMAIL_USER}>`,
//             to,
//             subject: 'Vérification de votre email',
//             html: htmlContent, // Envoi du HTML généré
//         });
//     }

//     public static async sendWelcomeEmail(to: string, firstName: string, lastName: string): Promise<boolean> {
//         const htmlContent = await render(
//             React.createElement(WelcomeEmail, { firstName, lastName })
//         );
//         try {
//             await EmailService.transporter.sendMail({
//                 from: `"Support" <${process.env.EMAIL_USER}>`,
//                 to,
//                 subject: 'Bienvenu chez Sublime World',
//                 html: htmlContent, // Envoi du HTML généré
//             });
//             return true;
//         } catch (error) {
//             console.log(error);
//             return false;
//         }
//     }


// }












import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { render } from "@react-email/render";
import * as React from "react";
import VerificationEmail from "../emails/VerificationEmail";
import WelcomeEmail from "../emails/WelcomeEmail";

dotenv.config();

export class EmailService {
  // Configuration principale (SSL/TLS)
  private static primaryTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465, // port sécurisé recommandé
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configuration de secours (non-SSL/TLS)
  private static fallbackTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // ou mail.sublimworld.com si nécessaire
    port: 26, // port non sécurisé (selon ta config non-recommandée)
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  public static async sendVerificationEmail(
    to: string,
    token: string
  ): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verifiy-email?token=${token}`;
    const htmlContent = await render(
      React.createElement(VerificationEmail, { verificationUrl })
    );

    try {
      // Tentative d'envoi avec le transporter principal
      await EmailService.primaryTransporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Vérification de votre email",
        html: htmlContent,
      });
    } catch (error) {
      console.error(
        "Erreur avec la configuration principale, tentative avec la configuration de secours",
        error
      );
      // Tentative d'envoi avec la configuration de secours
      await EmailService.fallbackTransporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Vérification de votre email",
        html: htmlContent,
      });
    }
  }

  public static async sendWelcomeEmail(
    to: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> {
    const htmlContent = await render(
      React.createElement(WelcomeEmail, { firstName, lastName })
    );

    console.log("htmlContent", htmlContent);

    try {
      // Essai avec la configuration principale
      await EmailService.primaryTransporter.sendMail({
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Bienvenu chez Sublime World",
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error(
        "Erreur avec la configuration principale, tentative avec la configuration de secours",
        error
      );
      try {
        // Essai avec la configuration de secours
        await EmailService.fallbackTransporter.sendMail({
          from: `"Support" <${process.env.EMAIL_USER}>`,
          to,
          subject: "Bienvenu chez Sublime World",
          html: htmlContent,
        });
        return true;
      } catch (fallbackError) {
        console.error("Erreur avec la configuration de secours", fallbackError);
        return false;
      }
    }
  }
}














// const to = "totonlionel@gmail.com";
// const firstName = "Lionel";
// const lastName = "TOTON";

// (async () => {
//     try {
//         const sent = await EmailService.sendWelcomeEmail(to, firstName, lastName);
//         sent ? console.log("Email sent") : console.log("Failed to send email");
//     } catch (error) {
//         console.log("Failed to send email:", error);
//     }
// })();
