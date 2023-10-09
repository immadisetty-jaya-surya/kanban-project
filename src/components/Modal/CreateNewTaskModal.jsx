import * as Yup from 'yup'
import { useBoards } from '@/context'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import TextInput from '../shared/TextInput'
import TextArea from '../shared/TextArea'
import InputArray from '../shared/InputArray'
import StatusDropdown from '../shared/StatusDropdown'
import Button from '../shared/Button'

const CreateNewTaskModal = ({ onclose }) => {
  const { columns, createTask } = useBoards()
  const [status, setStatus] = useState(columns[0].name)
  const validate = Yup.object({
    title: Yup.string().required('cannot be empty'),
    subtasks: Yup.array().of(
      Yup.object({
        title: Yup.string().required("can't be empty"),
      })
    ),
  })
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        subtasks: ['', ''],
        status: status,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log('testing')
        values.status = status
        createTask(values)
        onclose()
      }}>
      {(formik) => (
        <div>
          <h1>add new task</h1>
          <Form>
            <TextInput
              label="Title"
              name="Title"
              type="text"
              placeholder="e.g. take a break and drink coffee"
            />
            <TextArea
              label="description"
              name="title"
              type="text"
              placeholder="e.g. It`s always good to take a break. This 15 minute break will refresh your brain"
            />
            <InputArray label="subtasks" array={formik.values.subtasks} />
            <StatusDropdown status={status} setStatus={setStatus} />
            <Button type="submit">+ add new task </Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default CreateNewTaskModal
