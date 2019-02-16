import React from 'react'
import Autosuggest from 'react-autosuggest';
import './MonsterSelect.css';

const buildGetSuggestionsFunction = (listItems) => {
    // how to find matches based on input value
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        //Return all if nothing entered otherwise just look for a contains.
        return inputLength === 0 ? listItems : listItems.filter(item => {
            return item.toLowerCase().indexOf(inputValue) !== -1
        });
    };
    return getSuggestions;
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const match = suggestion.toLowerCase().indexOf(query.toLowerCase());
    if (match < 0) return <div>{suggestion}</div>;

    const firstPart = suggestion.substring(0, match);
    const secondPart = suggestion.substring(firstPart.length, firstPart.length + query.length);
    const lastPart = suggestion.substring((firstPart.length + secondPart.length));
    return <div>{firstPart}<span className='highlightMatch'>{secondPart}</span>{lastPart}</div>
};

class MonsterSelect extends React.Component {
  constructor(props) {
    super(props);

    const { listItems } = this.props;
    const getSuggestions = buildGetSuggestionsFunction(listItems);
    this.getSuggestions = getSuggestions;
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      allListItems: listItems,
      value: '',
      suggestions: listItems
    };
  }

  onClick = (event) => {
      console.log('input focused')
      console.log(this.state)
    this.setState({
        value: '',
        suggestions: this.state.allListItems
      });
  }

  onChange = (event, obj) => {
      console.log(obj)
    const { newValue } = obj;
    this.setState({
      value: newValue
    });
  };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Choose or Filter',
      value,
      onChange: this.onChange,
      onClick: this.onClick
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.props.onSelect}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        shouldRenderSuggestions={() => true}
        focusInputOnSuggestionClick={false}
        highlightFirstSuggestion={true}
      />
    );
  }
}

export default MonsterSelect