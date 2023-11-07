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
        <div className="w-full mx-auto text-blue-950 rounded-md p-6 bg-purple-200 dark:bg-darkGrey md:p-8">
          {/* w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8 */}
          <h1 className="heading-lg mb-6 capitalize text-center font-bold">
            add new board
          </h1>
          <Form>
            <TextInput
              label="Board Name"
              name="name"
              type="text"
              placeholder="learning pyhton"
            />
            <label className="body-md capitalize text-blue-950 font-bold dark:text-white mt-6 block">
              board columns
            </label>
            {/* body-md capitalize text-mediumGrey dark:text-white mt-6 block */}
            <FieldArray
              name="columns"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.columns.map((_, i) => (
                    <div key={i} className="flex">
                      <TextInput
                        name={`columns[${i}].name`}
                        type="text"
                        placeholder="archived"
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
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        id: uuidv4(),
                        name: '',
                        slug: '',
                        tasks: [],
                      })
                    }
                    className="w-full bg-blue-950 bg-opacity-50 text-white font-bold rounded-full p-2 pt-3 mt-3 capitalize transition duration-200 hover:bg-opacity-75 dark:bg-opacity-100 dark:bg-white">
                    {/* w-full bg-mainPurple bg-opacity-10 text-mainPurple bold rounded-full p-2 pt-3 mt-3 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white */}
                    + add new column
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-blue-950 bg-opacity-50 text-white font-bold rounded-full p-2 pt-3 mt-3 capitalize transition duration-200 hover:bg-opacity-75 dark:bg-opacity-100 dark:bg-white">
                    save changes
                  </Button>
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
