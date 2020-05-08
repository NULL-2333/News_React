import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import './SelectInput.css';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

class SelectInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [],
            input_value: ""
        }
    }
    
    handleChange = (selectedOption) => {
        console.log('Handle Change')
        this.setState({
            input_value: selectedOption.value
        });
        const { history } = this.props;
        if(history){
            history.push({
                pathname: "/search",
                search: "?q=" + selectedOption.value
            });
        }
    };

    handleInputChange = (value) => {
        this.setState({
            input_value: value
        })
    }

    getAutosuggest = (input, callback) => {
        try {
            fetch(
                "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=" + input,
                {
                    headers: {
                      "Ocp-Apim-Subscription-Key": "200f1c67ba3746ec99b1f8b184485852"
                    }
                }
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const resultsRaw = data.suggestionGroups[0].searchSuggestions;
                const results = resultsRaw.map(
                    result => (
                        { value: result.displayText, label: result.displayText }
                    )
                );
                var options = [{ value: input, label: input }];
                for(var each in results){
                    if(results[each].value !== input)
                        options.push(results[each]);
                }
                console.log(options);
                callback(options)
            });
        } catch (error) {
            console.log('Error fetching search ' + input + ' with error ' + error);
            callback([])
        }
    }

    loadOptions = (input, callback) => {
        this.getAutosuggest(input, callback);
    }

    render() {
        let return_element = 
            <div className="Select_Input">
                <AsyncSelect
                    value={null}
                    placeholder="Enter keyword .."
                    loadOptions={_.debounce(this.loadOptions, 1000)}
                    onChange={this.handleChange}
                    noOptionsMessage={()=>"No Match"}
                />
            </div>;
        if(this.props.location.pathname === '/search'){
            return_element = 
                <div className="Select_Input">
                    <AsyncSelect
                        value={{value: this.state.input_value, label: this.state.input_value}}
                        placeholder="Enter keyword .."
                        loadOptions={_.debounce(this.loadOptions, 1000)}
                        onChange={this.handleChange}
                        noOptionsMessage={()=>"No Match"}
                    />
                </div>;
        }
        return (
            return_element
        );
    }
}
export default withRouter(SelectInput);