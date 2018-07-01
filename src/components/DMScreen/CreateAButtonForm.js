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
            <main className="customDice">
                <section>
                    <span className="customDieField"><Field name="diceButtonNumOfDice" component="input" type="number" min={1} max={1000}/>
                    <span>D</span><Field name="diceButtonNumOfSides" component="input" type="number" min={1} max={10000}/></span>
                    <button type="submit" className="purpleAwesome" onClick={handleSubmit(values =>
                    this.props.onSubmit({ 
                        ...values,
                        type: 'diceButton'
                    }))}>Add Dice Button</button>
                </section>
                <section>
                    <span className="customDieField"><Field name="numOfMonsters" component="input" type="number" min={1}/>
                    CR<Field name="cr" component="input" type="number" min={0} max={30}/>Monsters</span>
                    <button name="monsterButton" type="submit" className="purpleAwesome" onClick={handleSubmit(values => 
                        this.props.onSubmit({ 
                            ...values,
                            type: 'monsterButton'
                        }))}>Add Monster Button</button>
                    <br/><button type="button" className="purpleAwesome" onClick={() => toggleFormFunc(false)}>Hide Custom Button Section</button>
                </section>
            </main>
            );
        }
        const notVisibleForm = (toggleFormFunc) => {
            return (
                <section>
                    <button type="button" className="purpleAwesome" onClick={() => toggleFormFunc(true)}>Create Custom Button</button>
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