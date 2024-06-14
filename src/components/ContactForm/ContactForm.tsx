import React, { useState } from "react"
import axios from "axios"
import showToast from "@/scripts/showToast"
import InputGroup from "@/components/InputGroup/InputGroup"
import "./contact-form.css"

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    try {
      await axios.post("/api/contact", formData)
      showToast(true, "Message sent")
    } catch (error) {
      showToast(false, "Something went wrong")
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        label="Full Name"
        name="name"
        type="text"
        required
        placeholder="Your name"
      />
      <InputGroup
        label="E-mail Address"
        name="email"
        type="email"
        required
        placeholder="example@gmail.com"
      />
      <InputGroup
        label="Phone Number"
        name="phone"
        type="text"
        placeholder="+36 30 123 456"
      />
      <InputGroup
        label="Message"
        name="message"
        type="textarea"
        required
        placeholder="Tell me how can i help you..."
      />

      <button className="btn-primary" disabled={isLoading}>
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            Send <SendIcon />
          </>
        )}
      </button>
    </form>
  )
}

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
    </svg>
  )
}

export default ContactForm
