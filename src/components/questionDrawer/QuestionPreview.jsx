import React, { Component } from 'react'; 
import { Collapse } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

class QuestionPreview extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            edit: false,
            editID: null, 
            expanded: false,
            exapandedID: null,
            expandedList: [],
        }
    } 

    toggleEditQuestion() {

    }

    toggleOptions() {
        const { expandedID, expandedList } = this.state; 
        const index = expandedList.indexOf(expandedID); 

        if (index === -1) {
            this.setState({ expandedList: [ ...expandedList, expandedID] }); 
        }
        else {
            const list = expandedList; 
            list.splice(index, 1);

            if (expandedList.length === 0) {
                this.setState({ expanded: false }); 
            }
            this.setState({ expandedList: list }); 
        }
    }

    render() {
        const { questionAnswerPair } = this.props; 
        const { edit, editID, expanded, expandedList } = this.state; 

        return questionAnswerPair.map(({ id, question, options }, index) => 
        <div key={id} style={{ margin: '0 10%'}}>
            <div style={{ display: 'flex'}}>
                <h3 style={{marginRight: '1rem', minWidth: '3rem'}}>Q {index + 1}.</h3>
                <h3 className="questionOptions" style={{ marginBottom: 0 }}>{question}</h3>
            </div>
            <IconButton
                aria-label="show more"
                onClick={() => this.setState({ 
                    expanded: true,
                    expandedID: id, 
                }, () => this.toggleOptions())}
                style={(expandedList.includes(id)) ? { backgroundColor: 'black', color: 'white' }: null }
            >
                <ExpandMoreIcon 
                    style={(expandedList.includes(id)) ? {transform: 'rotate(0deg)' }: {transform: 'rotate(180deg)' }} 
                />
            </IconButton>
            
            <IconButton>
                <CreateIcon onClick={() => this.setState({ edit: !edit, editID: id, expanded: false })} />
            </IconButton>
            {(edit && (editID === id)) ? <input>{this.props.question}</input>
                    : null 
            }

            <IconButton>
                <ClearIcon />
            </IconButton>
            <Collapse in={(expandedList.includes(id) && expanded)}>
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
