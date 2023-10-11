import * as Yup from 'yup'
import { Formik, Form, FieldArray } from 'formik'
import { useBoards } from '@/context'
import { useState } from 'react'
import TextInput from '../shared/TextInput'
import Button from '../shared/Button'
import { v4 as uuidv4 } from 'uuid'

const UpdatingBoardModal = ({ onConfirm }) => {
  const { updateBoard, currentBoard } = useBoards()
  const [columns, setColumns] = useState(
    currentBoard.columns.map((name) => ({ name, slug: '', tasks: [] }))
  )
  const validate = Yup.object({
    name: Yup.string().required('cannot keep empty'),
    columns: Yup.array().of(
      Yup.object({
        name: Yup.string().required('cannot keep empty'),
      })
    ),
  })
  return (
    <Formik
      initialValues={{
        name: currentBoard.name,
        columns: columns,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        updateBoard(values)
        onConfirm()
      }}>
      {(formik) => (
        <div>
          <h1>add new board</h1>
          <Form>
            <TextInput
              label="Board Name"
              name="name"
              type="text"
              placeholder="learning pyhton"
            />
            <label>board columns</label>
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.columns.map((_, i) => (
                    <div key={i}>
                      <TextInput
                        name={`columns[${i}].name`}
                        type="text"
                        placeholder="archived"
                      />
                      <Button onClick={() => arrayHelpers.remove(i)}>
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
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        id: uuidv4(),
                        name: '',
                        slug: '',
                        tasks: [],
                      })
                    }>
                    + add new column
                  </Button>
                  <Button type="submit"> save changes</Button>
                </div>
              )}
            />
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdatingBoardModal
