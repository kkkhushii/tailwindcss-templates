import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Create a transporter object
    let transporter = nodemailer.createTransport({
      service: "Gmail", // you can use different email services
      auth: {
        user: "bhianirav772@gmail.com",
        pass: "niravbhai@4577",
      },
    });

    // Set up email data
    let mailOptions = {
      from: "TailwindcssTemplates",
      to: "niravjoshi87@gmail.com", // the email you want to send to
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
