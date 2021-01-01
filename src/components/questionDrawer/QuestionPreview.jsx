import React, { Component } from 'react'; 
import { Button, Collapse } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class QuestionPreview extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            expanded: true,
            exapandedID: null,
            expandedList: [],
        }
    } 

    toggleExpanded() {
        const { exapandedID, expandedList } = this.state; 

        this.setState({ exapandedList: [ ...expandedList, exapandedID]  })
    }

    render() {
        const { questionAnswerPair } = this.props; 
        const { expanded, expandedID, expandedList } = this.state; 

        return questionAnswerPair.map(({ id, question, options }, index) => 
        <div key={id} style={{ margin: '0 10%'}}>
            <div style={{ display: 'flex'}}>
                <h3 style={{marginRight: '1rem', minWidth: '3rem'}}>Q {index + 1}.</h3>
                <h3 className="questionOptions" style={{ marginBottom: 0 }}>{question}</h3>
            </div>
            <IconButton
                aria-label="show more"
                onClick={() => this.setState({ expandedID: id, expandedList: [ ...expandedList, id] })} 
                style={expandedID === id ? { backgroundColor: 'black', color: 'white' }: null }
            >
                <ExpandMoreIcon 
                    style={(expandedList.includes(id)) ? {transform: 'rotate(0deg)' }: {transform: 'rotate(180deg)' }} 
                />
            </IconButton>
            <Collapse in={(expandedList.includes(id))}>
                {options.map((option) => <div>
                        {option}
                    </div>
                )} 
            </Collapse>
        </div>
        )
    }
}

export default QuestionPreview; 
