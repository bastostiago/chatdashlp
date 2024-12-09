import { NextRequest, NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {

    const body = await request.text();
    const payload = JSON.parse(body);

    try {
        const email = {
            to: process.env.NEXT_PUBLIC_SEND_EMAIL_TO, // Your email where you'll receive emails
            from: process.env.NEXT_PUBLIC_SEND_EMAIL_TO,
            subject: `ChatDash - Contato do Site: ${payload.subject}`,
            html: `<div>Recebido de: ${payload.name} (${payload.email})</div><div>${payload.message}</div>`,    
            text: `Recebido de: ${payload.name} (${payload.email})\n${payload.message}`        
          };
        await sendgrid.send(email);
        return NextResponse.json({success: true}, { status: 200 });
      } catch (error) {
        // console.log(error);
        return NextResponse.json({success: false, message: error.message}, { status: 500 });
      }
  
}
