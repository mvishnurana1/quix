import React, { useState } from 'react'; 
import { Collapse } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const QuestionPreview = ({ questionAnswerPair }) => {
    const [expanded, setExpanded] = useState(false); 

    const handleExapandClick = () => {
        setExpanded(!expanded)
    }

    return questionAnswerPair.map(({ question, options }) => <div style={{ marginLeft: '10%'}}>
        <h3 className="questionOptions" style={{ marginBottom: 0 }}>{question}</h3>
        <IconButton
            aria-expanded={expanded}
            aria-label="show more"
            style={expanded ? { backgroundColor: 'black', color: 'white' }: null }
        >
        <ExpandMoreIcon 
            onClick={handleExapandClick} 
            style={expanded ? {transform: 'rotate(0deg)' }: {transform: 'rotate(180deg)' }} 
        />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            {options.map((option) => <div>
                    {option}
                </div>
            )}
        </Collapse>
    </div>
    )
}

export default QuestionPreview; 
