import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

const selectOperatorField = (prefix, refs) => {

    const name =  `${prefix}Operator`;
    return (<Field name={name} component="select">
    <option>&gt;</option>
    <option>&gt;=</option>
    <option>&lt;</option>
    <option>&lt;=</option>
    <option>=</option>
    <option value="btw">Between</option>
    </Field>);
}

const searchFieldSection = (prefix, displayLabel, type="text", operatorVal) => {
    const throughFieldClass = (operatorVal === 'btw') ? "" : "hidden"
    const throughField = (
        <span className={throughFieldClass}>-<Field name={prefix + "End"} component="input" type={type}/></span>
    );
    
    return (
    <div className="searchField">
        {selectOperatorField(prefix)}
        <label htmlFor={prefix}>{displayLabel}</label>
        <Field name={prefix} component="input" type={type} />
        {throughField}
    </div>);
}

class MonsterSearchFormComponent extends Component {
    render() {
        console.log("RENDER FORM COMP", this.props, this.props.crOperator)
        const { handleSubmit } = this.props
        return (
          <form onSubmit={handleSubmit} className="monsterSearch">
            {searchFieldSection("cr", "CR", "number", this.props["crOperator"])}
            {searchFieldSection("str", "Str", "number", this.props["strOperator"])}
            {searchFieldSection("ac", "AC", "number", this.props["acOperator"])}
            <button type="submit">Submit</button>
          </form>
        )
    }
}

const MonsterSearchForm = reduxForm({
  form: 'monstersearch',
  initialValues: {
      crOperator: "<=",
      cr: 10,
      strOperator: ">=",
      str: 30,
      acOperator: ">="
    }
})(MonsterSearchFormComponent)

const selector = formValueSelector('monstersearch') // <-- same as form name
const MonsterSearchFormConnected = connect(
  state => {
    return {
        crOperator : selector(state, 'crOperator'),
        strOperator : selector(state, 'strOperator'),
        acOperator : selector(state, 'acOperator')
    }
  }
)(MonsterSearchForm)



export default MonsterSearchFormConnected