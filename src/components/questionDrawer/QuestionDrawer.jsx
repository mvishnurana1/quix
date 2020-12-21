import { Button, 
    InputAdornment,
    SwipeableDrawer, 
    TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { GoQuestion } from "react-icons/go";
import { IoAddCircle, IoEllipseSharp } from "react-icons/io5";
import { uuid } from 'react-uuid'; 

import './QuestionDrawer.css'; 

class QuestionDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingQuestion: false,
            addingOption: false,
            answer: null,
            optionOne: null,
            optionTwo: null,
            optionThree: null, 
            optionFour: null, 
            question: null, 
            questionAnswerPair: []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }

    async onFormSubmit(event) {
        const {
            answer, 
            optionOne, 
            optionTwo, 
            optionThree, 
            optionFour, 
        } = this.state; 

        const optionsList = []; 
        const questionAnswerSet = []; 

        optionsList.push(optionOne);
        optionsList.push(optionTwo);
        optionsList.push(optionThree);
        optionsList.push(optionFour);

        const qAndAObject = {}; 
        qAndAObject.id = uuid(); 
        qAndAObject.options = optionsList; 
        qAndAObject.answer = answer; 

        console.log(qAndAObject); 

        questionAnswerSet.push(qAndAObject); 
        
        await new Promise (resolve => 
            this.setState({ questionAnswerPair: [ ...this.state.questionAnswerPair, questionAnswerSet] }, 
            resolve)
        ); 

        console.log(this.state.questionAnswerPair); 

        event.preventDefault();
    }

    renderQuestionTextfield() {
        const { addingQuestion, question } = this.state;
        
        if (addingQuestion) {
            return <div className="questionTextfield">
                    <TextField 
                        autoFocus
                        fullWidth
                        multiline
                        name="question"
                        label="new question" 
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <GoQuestion />
                            </InputAdornment>
                            ),
                        }}
                        onChange={(event) => this.handleChange(event)}
                        size='medium'
                        variant="outlined" 
                        value={question}
                    />
                </div>
        }
    }

    renderOptionsTextFields() {
        const { addingQuestion, answer } = this.state; 
        if (addingQuestion) {
            return <div style={{display: 'flex', padding: '0 10% 3rem 10%', justifyContent: 'space-between' }}>
            <div  className="optionsTextField">
                <TextField  
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IoEllipseSharp 
                                onClick={() => this.setState({ answer: 'optionOne' })} 
                                style={ answer === 'optionOne' ?  { color: 'red' } : null }    
                            />
                        </InputAdornment>
                        ),
                    }}    
                    label="option One"  
                    multiline 
                    name="optionOne"
                    onChange={(event) => this.handleChange(event)}
                    size="small" 
                    variant="outlined" 
                    value={this.state.value}
                />
                <TextField  
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IoEllipseSharp 
                                onClick={() => this.setState({ answer: 'optionTwo' })} 
                                style={ answer === 'optionTwo' ?  { color: 'red' } : null }    
                            />
                        </InputAdornment>
                        ),
                    }}    
                    label="option Two" 
                    multiline 
                    name="optionTwo"
                    onChange={(event) => this.handleChange(event)}
                    size="small" 
                    variant="outlined" 
                    value={this.state.value}
                />
                <TextField  
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IoEllipseSharp  
                                onClick={() => this.setState({ answer: 'optionThree' })} 
                                style={ answer === 'optionThree' ?  { color: 'red' } : null }        
                            />
                        </InputAdornment>
                        ),
                    }}    
                    label="option Three" 
                    multiline 
                    name="optionThree"
                    onChange={(event) => this.handleChange(event)}
                    size="small" 
                    variant="outlined" 
                    value={this.state.value}
                />
                <TextField  
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IoEllipseSharp 
                                onClick={() => this.setState({ answer: 'optionFour' })} 
                                style={ answer === 'optionFour' ?  { color: 'red' } : null }  
                            />
                        </InputAdornment>
                        ),
                    }}    
                    label="option Four" 
                    multiline 
                    name="optionFour"
                    onChange={(event) => this.handleChange(event)}
                    size="small" 
                    variant="outlined" 
                    value={this.state.value}
                />
            </div>
            <div>
                <Button 
                    color="primary" 
                    variant="outlined"
                    onClick={(event) => this.onFormSubmit(event)}
                >
                    Add
                </Button>
            </div>
        </div>
        }
    }

    render() {
        const { addingQuestion } = this.state; 
        return (
            <SwipeableDrawer 
                anchor='bottom'
                open={this.props.open} 
                onClose={() => null}
                onOpen={() => null}
            >
                {!addingQuestion && <div className="logoContainer">
                    <h3> Add more Questions </h3>
                    <IoAddCircle className="logo" onClick={() => this.setState({ addingQuestion: true }) }  />
                </div>} 
                {this.renderQuestionTextfield()}
                {this.renderOptionsTextFields()}
            </SwipeableDrawer>
        )
    }
}

export default QuestionDrawer;
