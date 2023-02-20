import * as React from 'react';
import styled from "styled-components";

const Checkbox = React.forwardRef((props,ref) => {

  return(
    <CheckboxContainer>
      <input className={'checkbox-type-'+props.type} value={props.value? props.value : ''} name={props.name} type="checkbox" id={props.id ? props.id : "checkFor"} onChange={(e) => props.onChange(e)} checked={props.isChecked}/>
      <label htmlFor={props.id ? props.id : "checkFor"}><i/><span>{props.label}</span></label>
    </CheckboxContainer>
  )
})

export default Checkbox

const CheckboxContainer = styled.div`
  & label {
    display: flex;
    align-items: center;
  }
`