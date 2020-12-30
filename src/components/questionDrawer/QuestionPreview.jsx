import React, { Component } from 'react'; 
import { Button, Collapse } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class QuestionPreview extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            expanded: false,
            expandedID: null,
        }
    }

    toggleExpand(id) {
        this.setState({ expanded: true }, () => console.log(id))
    }

    render() {
        const { questionAnswerPair } = this.props; 
        const { expanded, expandedID } = this.state; 
        return questionAnswerPair.map(({ id, question, options }, index) => 
        <div key={id} style={{ marginLeft: '10%'}}>
            <div style={{ display: 'flex'}}>
                <h3 style={{marginRight: '1rem', minWidth: '3rem'}}>Q {index + 1}.</h3>
                <h3 className="questionOptions" style={{ marginBottom: 0 }}>{question}</h3>
            </div>
            <IconButton
                aria-label="show more"
                style={expandedID === id ? { backgroundColor: 'black', color: 'white' }: null }
            >
            <ExpandMoreIcon 
                onClick={() => this.setState({ expanded: !expanded, expandedID: id })} 
                style={(id === expandedID) ? {transform: 'rotate(0deg)' }: {transform: 'rotate(180deg)' }} 
            />
            </IconButton>
            {console.log(expandedID, id)}
            <Collapse in={expandedID === id} timeout="auto" unmountOnExit>
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
