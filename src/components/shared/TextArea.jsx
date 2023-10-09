import { ErrorMessage, useField } from 'formik'

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className="body-md text-mediumGrey" htmlFor={field.name}>
        {label}
      </label>
      <textarea
        className={`bg-white dark:bg-darkGrey ${
          meta.touched && meta.error && 'border-mainRed'
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500"
      />
    </div>
  )
}

export default TextArea
