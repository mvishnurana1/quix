import { Button, 
    InputAdornment,
    SwipeableDrawer, 
    TextField } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import React, { Component } from 'react';
import { GoQuestion } from "react-icons/go";
import { IoAddCircle, IoEllipseSharp } from "react-icons/io5";
import uuid from 'react-uuid'; 

import './QuestionDrawer.css'; 

import QuestionPreview from './QuestionPreview';

class QuestionDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingQuestion: false,
            addingOption: false,
            answer: "",
            optionOne: "",
            optionTwo: "",
            optionThree: "", 
            optionFour: "", 
            question: "", 
            questionAnswerPair: [{
                id: uuid(), 
                question: 'Is this question 1 ?',
                answer: 'abc', 
                options: ['a', 'b', 'c' , 'd']
            }, {
                id: uuid(), 
                question: 'Is this question 2 ?',
                answer: 'sdvsdgvwer', 
                options: ['option', 'option', 'option' , 'option']
            }], 
            quizSubmitted: false, 
            verified: false, 
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }); 
    }

    validateField(input) {
        const { question, verified } = this.state; 
        let field = input.trim(); 
        
        if (field.length === 0) {

            return true; 
        }
        return false; 
    }

    async onFormSubmit(event) {
        const {
            answer, 
            optionOne, 
            optionTwo, 
            optionThree, 
            optionFour, 
            question, 
        } = this.state; 

        const optionsList = []; 
        const questionAnswerSet = []; 

        // verify state variables if they're valid

        optionsList.push(optionOne);
        optionsList.push(optionTwo);
        optionsList.push(optionThree);
        optionsList.push(optionFour);

        const qAndAObject = {}; 
        qAndAObject.id = uuid(); 
        qAndAObject.question = question; 
        qAndAObject.options = optionsList; 
        qAndAObject.answer = answer; 

        questionAnswerSet.push(qAndAObject); 
        
        await new Promise (resolve => 
            this.setState({ questionAnswerPair: [ ...this.state.questionAnswerPair, qAndAObject] }, 
            resolve)
        ); 

        console.log('Q And A list: ', this.state.questionAnswerPair); 

        this.setState({
            addingQuestion: false, 
            answer: '',
            optionOne: '',
            optionTwo: '', 
            optionThree: '', 
            optionFour: '',
            question: ''
        });

        event.preventDefault();
    }

    renderQuestionTextfield() {
        const {  addingQuestion, question } = this.state;

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
            return <div style={{display: 'flex', padding: '1rem 10% 3rem 10%', justifyContent: 'space-between' }}>
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
                    value={this.state.optionOne}
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
                    value={this.state.optionTwo}
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
                    value={this.state.optionThree}
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
                    value={this.state.optionFour}
                />
            </div>
            {
                this.state.verified ? 
                <>
                <div>
                    <Button 
                        color="primary" 
                        variant="outlined"
                        onClick={(event) => this.onFormSubmit(event)}
                    >
                        Add
                    </Button>
                </div>
                <div>
                    <Button 
                        color="primary" 
                        variant="outlined"
                        onClick={() => this.setState({ addingQuestion: false })}
                    >
                        Cancel
                    </Button>
                </div>
                </>
                : <>
                <div>
                    <Button 
                        color="primary" 
                        disabled
                        variant="outlined"
                        onClick={(event) => this.onFormSubmit(event)}
                    >
                        Add
                    </Button>
                </div>
                <div>
                    <Button 
                        color="primary" 
                        variant="outlined"
                        onClick={() => this.setState({ addingQuestion: false })}
                    >
                        Cancel
                    </Button>
                </div>
                </>
            }

        </div>
        }
    }

    render() {
        const { addingQuestion, questionAnswerPair } = this.state; 
        return (
            <SwipeableDrawer 
                anchor='bottom'
                open={this.props.open} 
                onClose={() => null}
                onOpen={() => null}
            >   
                <QuestionPreview questionAnswerPair={questionAnswerPair} />
                {!addingQuestion && 
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-evenly'}}>
                <div className="logoContainer">
                    <h3> Add Question </h3>
                    <IoAddCircle className="logo" onClick={() => this.setState({ addingQuestion: true }) }  />
                </div>
                {(questionAnswerPair.length >= 1) 
                    ? <div className="submitQuizButton">
                        <h3> Submit Quiz </h3>
                        <CheckCircleRoundedIcon className="logo" onClick={() => this.setState({ quizSubmitted: true }) }  />
                    </div>
                    : null
                }
                </div>
                } 
                {this.renderQuestionTextfield()}
                {this.renderOptionsTextFields()}
            </SwipeableDrawer>
        )
    }
}

export default QuestionDrawer;
