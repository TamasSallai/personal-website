import "./input-group.css"

interface Props {
  label: string
  name: string
  type: "text" | "email" | "textarea"
  placeholder?: string
  required?: boolean
}

const InputGroup = ({ label, name, type, placeholder, required }: Props) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {label} {required && " *"}
      </label>

      {(type === "text" || type === "email") && (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required
        />
      )}

      {type === "textarea" && (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required
          rows={4}
        />
      )}
    </div>
  )
}

export default InputGroup
