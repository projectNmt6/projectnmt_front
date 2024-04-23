import React from 'react';

function SelectTeam({teamList}) {
    teamList = []; 
    return (
        <div>
            {teamList.map(team => {
                return(
                    <>
                        <div>
                            
                        </div>
                    </>
                )
            })}
        </div>
    );
}

export default SelectTeam;