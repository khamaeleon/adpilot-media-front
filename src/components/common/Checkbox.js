function Checkbox(props){
  const handleChange = (e) => {
    props.onMethod(e)
  }
  return(
    <div>
      <input className={'checkbox-type-'+props.type} type="checkbox" id="checkFor" onChange={handleChange} checked={props.isChecked}/>
      <label htmlFor="checkFor"><i/>{props.title}</label>
    </div>
  )
}

export default Checkbox