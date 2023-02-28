import styled from "styled-components";
import {useState} from "react";

function SelectBox(props){
  const [select, setSelect] = useState(props.default)
  const handleChange = (e) => {
    setSelect(e.target.value)
    console.log(e.target.value)
  }
  const list = props.options.map((item, key) => {
    return(
      <option key={key} value={item.value}>{item.label}</option>
    )
  })
  return(
    <SelectContainer value={select} multiple={false} onChange={handleChange}>{list}</SelectContainer>
  )
}

export default SelectBox

const SelectContainer = styled('select')`
  padding: 10px;
  height: 40px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
`