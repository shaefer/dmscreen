import React from 'react'
import { Field, reduxForm } from 'redux-form'

let MonsterSearchForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="crOperator" component="select">
            <option>&gt;</option>
            <option>&gt;=</option>
            <option>&lt;</option>
            <option>&lt;=</option>
            <option>=</option>
        </Field>
        <label htmlFor="cr">CR</label>
        <Field name="cr" component="input" type="text" />
      </div>
      <div>
        <Field name="strOperator" component="select">
            <option>&gt;</option>
            <option>&gt;=</option>
            <option>&lt;</option>
            <option>&lt;=</option>
            <option>=</option>
        </Field>
        <label htmlFor="str">Str</label>
        <Field name="str" component="input" type="text" />
      </div>
      <div>
        <Field name="acOperator" component="select">
            <option>&gt;</option>
            <option>&gt;=</option>
            <option>&lt;</option>
            <option>&lt;=</option>
            <option>=</option>
        </Field>
        <label htmlFor="ac">AC</label>
        <Field name="ac" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

MonsterSearchForm = reduxForm({
  // a unique name for the form
  form: 'monstersearch',
  initialValues: {
      crOperator: "<=",
      cr: 10,
      strOperator: ">=",
      str: 30,
      acOperator: ">="
    }
})(MonsterSearchForm)

export default MonsterSearchForm