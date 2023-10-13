import { useBoards } from '@/context'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextInput from '../shared/TextInput'
import Button from '../shared/Button'

const CreateNewBoardModal = ({ onClose }) => {
  const { createBoard } = useBoards()

  const validationSchema = Yup.object({
    name: Yup.string().required('Cannot be empty'),
    columns: Yup.array().of(Yup.string().required('Cannot be empty')),
  })
  const initialValueForm = {
    name: '',
    columns: ['todo', 'doing'],
  }

  return (
    <Formik
      initialValues={initialValueForm}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values)
        createBoard(values)
        onClose()
      }}>
      {(formik) => (
        <div>
          <h1>Add New Board</h1>
          <Form>
            <TextInput
              label="Board Name"
              name="name"
              type="text"
              placeholder="learning python "
            />
            <label>board columns</label>
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.columns.map((_, i) => (
                    <div key={i} className="flex">
                      <TextInput
                        name={`columns[${i}]`}
                        type="text"
                        placeholder="e.g. archived"
                      />
                      <Button
                        onClick={() => arrayHelpers.remove(i)}
                        className="text-mediumGrey hover:text-mainRed ml-4">
                        <svg
                          width="15"
                          height="15"
                          xmlns="http://www.w3.org/2000/svg">
                          <g fill="currentColor" fillRule="evenodd">
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                          </g>
                        </svg>
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => arrayHelpers.push('')}>
                    + add new column
                  </Button>
                </div>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default CreateNewBoardModal
