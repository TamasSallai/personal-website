import type { APIRoute } from "astro"
import sg from "@sendgrid/mail"

sg.setApiKey(import.meta.env.SENDGRID_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData()
    const name = data.get("name")
    const email = data.get("email")
    const phone = data.get("phone")
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
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </body>
    </html>

      `

    await sg.send({
      to: import.meta.env.SENDGRID_EMAIL_TO,
      from: import.meta.env.SENDGRID_EMAIL_FROM,
      subject: `New contact message from ${name}`,
      html,
    })

    return new Response(
      JSON.stringify({
        message: "Message sent",
      }),
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
