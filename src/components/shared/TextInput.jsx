import { ErrorMessage, useField } from 'formik'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      {label && (
        <label className="" htmlFor={field.name}>
          {label}
        </label>
      )}
      <div>
        <input
          className={`${
            meta.touched && meta.error && 'border-opacity-100 border-mainRed'
          }`}
          {...field}
          {...props}
          autoComplete="off"
        />
        <ErrorMessage
          component="div"
          name={field.name}
          className="text-mainRed body-lg absolute right-4 top-1/2 -translate-y-1/2 "
        />
      </div>
    </div>
  )
}

export default TextInput
