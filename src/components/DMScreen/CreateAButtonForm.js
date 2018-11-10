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
                    <button name="crButton" type="submit" className="purpleAwesome" onClick={handleSubmit(values => 
                        this.props.onSubmit({ 
                            ...values,
                            type: 'crButton'
                        }))}>Add Monster by CR Button</button>
                </section>
                <section>
                    <span className="customDieField"><Field name="numOfMonstersRange" component="input" type="number" min={1}/>
                    CR<Field name="crStart" component="input" type="number" min={0} max={30}/>-<Field name="crEnd" component="input" type="number" min={0} max={30}/>Monsters</span>
                    <button name="crRangeButton" type="submit" className="purpleAwesome" onClick={handleSubmit(values => 
                        this.props.onSubmit({ 
                            ...values,
                            type: 'crRangeButton'
                        }))}>Add Monster by CR Range Button</button>
                </section>
                <section>
                    <button type="button" className="purpleAwesome" onClick={() => toggleFormFunc(false)}>Hide Custom Button Section</button>
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
    numOfMonsters: 2,
    cr: 10,
    numOfMonstersRange: 6,
    crStart: 9,
    crEnd: 11,
  }
})(CreateAButtonFormComponent)

const selector = formValueSelector('createAButton') // <-- same as form name
const CreateAButtonFormConnected = connect(
  state => {
    return {
        diceButtonNumOfDice : selector(state, 'diceButtonNumOfDice'),
        diceButtonNumOfSides : selector(state, 'diceButtonNumOfSides'),
        cr : selector(state, 'cr'),
        crStart : selector(state, 'crStart'),
        crEnd : selector(state, 'crEnd'),
        numOfMonsters: selector(state, 'numOfMonsters'),
        numOfMonstersRange: selector(state, 'numOfMonstersRange'),
    }
  }
)(CreateAButtonForm)

export default CreateAButtonFormConnected