import * as Yup from 'yup'
import { Formik, Form, FieldArray } from 'formik'
import { useBoards } from '@/context'
import { useState } from 'react'
import TextInput from '../shared/TextInput'
import Button from '../shared/Button'
import { v4 as uuidv4 } from 'uuid'

const UpdatingBoardModal = ({ onConfirm }) => {
  const { updateBoard, currentBoard } = useBoards()
  const [columns, setColumns] = useState(currentBoard.columns)
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
                        name={`columns[${i}]`}
                        type="text"
                        placeholder="archivedd"
                      />
                      <Button onClick={() => arrayHelpers.remove(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512">
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
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
                    + add new column{' '}
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
