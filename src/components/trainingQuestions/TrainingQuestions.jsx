import React, { Component } from 'react';
import { IoAddCircle } from 'react-icons/io5';

import './TrainingQuestions.css'; 

import QuestionInput from '../questionDrawer';  

class TrainingQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false, 
        }
    }

    render() {
        const { isAdding } = this.state;

        return (
            <div className="logoContainer">
                <h3>Add Questions...</h3>
                <IoAddCircle 
                    style={ this.state.isAdding ? { color: 'red' } : null} 
                    className="logo" 
                    onClick={() => this.setState({ isAdding: true })} 
                />
                <QuestionInput open={isAdding}/>
            </div>
        )
    }
}

export default TrainingQuestions;
