import React from 'react';

const SelectStudy = ({onselect}) => {
    
    return(        
    <div>
        <p>
             What idea do you have for improving your sleep?
          </p>
          <select required onChange={onselect}>
            <option value="">--Select--</option>
            <option value="HighFibre">Eat more Vegetables</option>
          </select>
    </div>
    )   

}

export default SelectStudy;