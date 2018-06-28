import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import './CreateAButtonForm.css'

class CreateAButtonFormComponent extends Component {
    render() {
        const { handleSubmit, showForm, toggleFormFunc } = this.props
        console.log("RENDER CREATE BUTTON FORM COMP", this.props, this.props.diceButtonNumOfDice, this.props.diceButtonNumOfSides, showForm);
        const visibleForm = (toggleFormFunc) => {
            return (
            <section>
                <div className="customDieField">Number of Dice  <Field name="diceButtonNumOfDice" component="input" type="number"/></div>
                <div className="customDieField">Number of Sides <Field name="diceButtonNumOfSides" component="input" type="number"/></div>
                <button type="submit">Create Button</button><button type="button" onClick={() => toggleFormFunc(false)}>Hide Form</button>
            </section>
            );
        }
        const notVisibleForm = (toggleFormFunc) => {
            return (
                <section>
                    <button type="button" onClick={() => toggleFormFunc(true)}>Show Form</button>
                </section>
            );
        }
        return (
          <form onSubmit={handleSubmit} className="createAButton">
            {(showForm) 
                ? visibleForm(toggleFormFunc)
                : notVisibleForm(toggleFormFunc)
            }
          </form>
        )
    }
}

const CreateAButtonForm = reduxForm({
  form: 'createAButton',
  initialValues: {
    showForm: true,
    diceButtonNumOfDice: 3,
    diceButtonNumOfSides: 6
  }
})(CreateAButtonFormComponent)

const selector = formValueSelector('createAButton') // <-- same as form name
const CreateAButtonFormConnected = connect(
  state => {
    return {
        diceButtonNumOfDice : selector(state, 'diceButtonNumOfDice'),
        diceButtonNumOfSides : selector(state, 'diceButtonNumOfSides')
    }
  }
)(CreateAButtonForm)

export default CreateAButtonFormConnected