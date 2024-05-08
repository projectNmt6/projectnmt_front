import React from 'react';
import {CallGPT} from './gpt.js';

function AdvancedSearch(props) {
    const handleClickAPICall = async() => {
        await CallGPT();
    };
    return (
        <div>
            <button onClick={handleClickAPICall}>GPT Call</button>
        </div>
    );
}

export default AdvancedSearch;