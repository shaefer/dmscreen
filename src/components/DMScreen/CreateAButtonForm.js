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
            <main>
                <section>
                    <div className="customDieField">Number of Dice  <Field name="diceButtonNumOfDice" component="input" type="number"/></div>
                    <div className="customDieField">Number of Sides <Field name="diceButtonNumOfSides" component="input" type="number"/></div>
                    <button type="submit" onClick={handleSubmit(values =>
                    this.props.onSubmit({ 
                        ...values,
                        type: 'diceButton'
                    }))}>Create Dice Button</button><button type="button" onClick={() => toggleFormFunc(false)}>Close</button>
                </section>
                <section>
                    <div className="customDieField">Number of Monsters  <Field name="numOfMonsters" component="input" type="number"/></div>
                    <div className="customDieField">CR <Field name="cr" component="input" type="number"/></div>
                    <button name="monsterButton" type="submit" onClick={handleSubmit(values => 
                        this.props.onSubmit({ 
                            ...values,
                            type: 'monsterButton'
                        }))}>Create Monster Button</button>
                    <button type="button" onClick={() => toggleFormFunc(false)}>Close</button>
                </section>
            </main>
            );
        }
        const notVisibleForm = (toggleFormFunc) => {
            return (
                <section>
                    <button type="button" onClick={() => toggleFormFunc(true)}>Create Custom Button</button>
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
    diceButtonNumOfSides: 6,
    cr: 10,
    numOfMonsters: 2
  }
})(CreateAButtonFormComponent)

const selector = formValueSelector('createAButton') // <-- same as form name
const CreateAButtonFormConnected = connect(
  state => {
    return {
        diceButtonNumOfDice : selector(state, 'diceButtonNumOfDice'),
        diceButtonNumOfSides : selector(state, 'diceButtonNumOfSides'),
        cr : selector(state, 'cr'),
        numOfMonsters: selector(state, 'numOfMonsters')
    }
  }
)(CreateAButtonForm)

export default CreateAButtonFormConnected