import React from 'react'
import { Field, reduxForm } from 'redux-form'

const selectOperatorField = (name) => {
    return (<Field name={name} component="select">
    <option>&gt;</option>
    <option>&gt;=</option>
    <option>&lt;</option>
    <option>&lt;=</option>
    <option>=</option>
    </Field>);
}

const searchFieldSection = (prefix, displayLabel, type="text") => {
    return (
    <div className="searchField">
        {selectOperatorField(`${prefix}Operator`)}
        <label htmlFor={prefix}>{displayLabel}</label>
        <Field name={prefix} component="input" type={type} />
    </div>);
}

let MonsterSearchForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className="monsterSearch">
      {searchFieldSection("cr", "CR", "number")}
      {searchFieldSection("str", "Str", "number")}
      {searchFieldSection("ac", "AC", "number")}
      <button type="submit">Submit</button>
    </form>
  )
}

MonsterSearchForm = reduxForm({
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