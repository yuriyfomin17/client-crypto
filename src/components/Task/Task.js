import React from 'react';


function Task({value}) {
    return (
        <div>
            <th className="text-center p-2 font-weight-light">
                {value}
            </th>
        </div>
    );
}

export default Task;
