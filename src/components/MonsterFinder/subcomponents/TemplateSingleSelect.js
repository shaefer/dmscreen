import React from 'react'
import SimpleSelect from 'react-simple-styleable-select'

class TemplateSingleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.reset = this.reset.bind(this);
        this.simpleSelectRef = React.createRef();
        this.state = {
            template: '',
            options: (props.options) ? props.options : [{value:'Fiendish', label: 'Fiendish'}]
        };
        this.id = Math.random();
    }

    reset() {
        this.setState({
            template: '',
            options: (this.props.options) ? this.props.options : [{value:'Fiendish', label: 'Fiendish'}]
        });
        //this points to why we have an explicit reset method on simpleSelect, but also some problems with how we've blended props and state.
        this.simpleSelectRef.current.setState({
            ...this.simpleSelectRef.current.state,
            currentOptionSelected: {value: '', label: ''},
            currentOptionIndex: null
        })
    }

    selectTemplate(val) {
        this.setState({
            ...this.state,
            template: val
        });
        this.props.onChange(val);
    }

    //not sure why the simple select bleeds right a few percent. Would like it just to work at 100%.
    render() {
        //props vs state setting of initial vals...I think a props change should probably override current state. This might just be again the mistake of mixing props driven component vs. state driven.
        return (
            <SimpleSelect 
                id={`template_select_${this.id}`}
                options={this.state.options} 
                onChange={(e, val, fullOption) => this.selectTemplate(val)}
                legendLabel={'Templates'}
                defaultValue={this.props.defaultTemplate}
                width="97%"
                ref={this.simpleSelectRef}
            />
        );
    }
}

export default TemplateSingleSelect;