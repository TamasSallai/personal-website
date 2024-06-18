import type { APIRoute } from "astro"
import axios from "axios"

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData()
    const name = data.get("name")
    const email = data.get("email")
    const phone = data.get("phone")
    const company = data.get("company")
    const message = data.get("message")

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const html = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: System UI, sans-serif;">
        <div>
          <h1 style="font-size: 1.6rem">New Contact Message</h1>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </body>
    </html>`

    const payload = {
      personalizations: [
        {
          to: [{ email: import.meta.env.SENDGRID_EMAIL_TO }],
          subject: `New contact message from ${name}`,
        },
      ],
      from: { email: import.meta.env.SENDGRID_EMAIL_FROM },
      content: [{ type: "text/html", value: html }],
    }

    await axios.post("https://api.sendgrid.com/v3/mail/send", payload, {
      headers: {
        Authorization: `Bearer ${import.meta.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    return new Response(
      JSON.stringify({
        message: "Message sent",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
