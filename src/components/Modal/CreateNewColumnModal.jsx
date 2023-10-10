import { useBoards } from '@/context'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '../shared/TextInput'
import Button from '../shared/Button'

const CreateNewColumnModal = ({ onClose }) => {
  const { createColumn } = useBoards()
  const validate = Yup.object({
    name: Yup.string().required('cannot keep empty'),
  })
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        createColumn(values)
        onClose()
      }}>
      {(formik) => (
        <div>
          <h1>add new column</h1>
          <Form>
            <TextInput
              label="Name"
              name="Name"
              type="text"
              placeholder="e.g. archived anta"
            />
            <Button type="submit">add new column</Button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default CreateNewColumnModal
