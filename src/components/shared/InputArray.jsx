import { FieldArray } from 'formik'
import TextInput from './TextInput'
import Button from './Button'

const InputArray = ({ label, array, ...props }) => {
  return (
    <>
      <label className="body-md capitalize text-mediumGrey dark:text-white mt-6 block">
        {label}
      </label>
      <FieldArray
        name={label}
        render={(arrayHelpers) => (
          <div>
            {array.map((_, i) => (
              <div key={i} className="flex">
                <TextInput
                  name={`${label}[${i}].title`}
                  type="text"
                  placeholder="e.g. Take a break"
                />
                <Button
                  onClick={() => arrayHelpers.remove(i)}
                  className="text-mediumGrey hover:text-mainRed ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </Button>
              </div>
            ))}
            <Button
              onClick={() => arrayHelpers.push({ title: '' })}
              className="w-full bg-mainPurple bg-opacity-10 text-mainPurple bold rounded-full capitalize p-2 pt-3 mt-3 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white">
              + add new subtask
            </Button>
          </div>
        )}
      />
    </>
  )
}

export default InputArray
