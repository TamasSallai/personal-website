import axios from "axios"
import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { getLangFromUrl, useTranslations } from "@/i18n/utils"
import showToast from "@/scripts/showToast"
import InputGroup from "@/components/InputGroup/InputGroup"
import "./contact-form.css"

const currentURL = new URL(window.location.href)
const lang = getLangFromUrl(currentURL)
const t = useTranslations(lang)

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRecaptchaCompleted, setIsReCaptchaCompleted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    try {
      await axios.post("/api/contact", formData)
      showToast(true, `${t("form.toast.success")} 👍`)
    } catch (error) {
      showToast(false, `${t("form.toast.error")} 😰`)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        label={t("form.name.label")}
        name="name"
        type="text"
        required
        placeholder={t("form.name.placeholder")}
      />

      <div className="form-row">
        <InputGroup
          label={t("form.email.label")}
          name="email"
          type="email"
          required
          placeholder={t("form.email.placeholder")}
        />
        <InputGroup
          label={t("form.phone.label")}
          name="phone"
          type="text"
          placeholder={t("form.phone.placeholder")}
        />
      </div>

      <InputGroup
        label={t("form.company.label")}
        name="company"
        type="text"
        placeholder={t("form.company.placeholder")}
      />

      <InputGroup
        label={t("form.message.label")}
        name="message"
        type="textarea"
        required
        placeholder={t("form.message.placeholder")}
      />

      <div className="captcha-container">
        <ReCAPTCHA
          sitekey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={() => setIsReCaptchaCompleted(true)}
          hl={lang}
        />
      </div>

      <button
        className="button-primary self-start"
        disabled={isLoading || !isRecaptchaCompleted}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            {t("form.submit")} <SendIcon />
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
