import styled from "styled-components";

function Checkbox(props){
  const handleChange = (e) => {
    props.onMethod(e)
  }
  return(
    <CheckboxContainer>
      <input className={'checkbox-type-'+props.type} type="checkbox" id={props.id ? props.id : "checkFor"} onChange={handleChange} checked={props.isChecked}/>
      <label htmlFor={props.id ? props.id : "checkFor"}><i/><span>{props.title}</span></label>
    </CheckboxContainer>
  )
}

export default Checkbox

const CheckboxContainer = styled.div`
  & label {
    display: flex;
    align-items: center;
  }
`