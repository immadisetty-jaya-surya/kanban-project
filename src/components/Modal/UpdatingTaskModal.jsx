import { useBoards } from '@/context'
import { Formik, Form } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import TextInput from '../shared/TextInput'
import TextArea from '../shared/TextArea'
import InputArray from '../shared/InputArray'
import StatusDropdown from '../shared/StatusDropdown'
import Button from '../shared/Button'

const UpdatingTaskModal = ({ data, close }) => {
  const { updateTask } = useBoards()
  const [status, setStatus] = useState(data.status)
  const [subtasks, setSubtasks] = useState(data.subtasks)
  const validate = Yup.object({
    title: Yup.string().required('cannot keep empty'),
    description: Yup.string().required('cannot keep empty'),
    subtasks: Yup.array().of(
      Yup.object({
        title: Yup.string().required('cannot keep empty'),
      })
    ),
    status: Yup.string().required('cannot keep empty broh'),
  })
  return (
    <Formik
      initialValues={{ ...data, status: status }}
      validationSchema={validate}
      onSubmit={(values) => {
        values.status = status
        updateTask(values)
        close()
      }}>
      {(formik) => (
        <div className="w-full capitalize mx-auto rounded-md p-6 bg-purple-200 dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6 capitalize">edit task</h1>
          <Form>
            <TextInput
              label="title"
              name="title"
              type="text"
              placeholder="e.g. take a break and drink coffee"
            />
            <TextArea
              label="description"
              name="description"
              type="text"
              placeholder="e.g. It`s always good to take a break. This 15 minute break will refresh your brain"
            />
            <InputArray label="subtasks" array={formik.values.subtasks} />
            <StatusDropdown status={status} setStatus={setStatus} />
            <Button
              type="submit"
              className="mt-6 w-full bg-blue-950 capitalize font-semibold text-white text-base p-2 rounded-full bg-opacity-50 transition duration-200 hover:bg-opacity-75">
              save changes
            </Button>
            {/* mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover */}
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdatingTaskModal
