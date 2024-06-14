import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
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
      { status: 400 },
    )
  }

  console.log(request.url)

  return new Response(
    JSON.stringify({
      message: "Message sent",
    }),
  )
}
