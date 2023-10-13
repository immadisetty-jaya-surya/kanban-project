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
        <div>
          <h1>edit task</h1>
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
            <Button type="submit">save changes</Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default UpdatingTaskModal
