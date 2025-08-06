import styled, {css} from "styled-components";

const mainColor = css`${props => props.theme.color.mainColor}`
export const EventSet = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
`

export const CostManageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f9fafb;

  & div {
    display: flex;
    align-items: center;
    
  }
  & div:last-child {
    width: auto;
  }

  & input {
    width: 90%;
    color: ${mainColor};
  }
`

export const CalculationManageContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #f9fafb;
  & > div {
    padding: 5px 0;
  }
  & > div:first-child{
    background-color: #fff;
  }
  & > div:last-child{
    padding-bottom: 25px;
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
`

export const InputWiden = styled('input')`
  margin-right: 15px;
  padding: 0 20px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  vertical-align: bottom;
  outline: none;
  &:read-only {
    background-color: #f9fafb;
  }
`

export const CustomRadio = styled.input`
  display: none;

  &[type='radio'] + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    color: #222;
    cursor: pointer;
  }

  &[type='radio']:checked + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: ${mainColor};
    color: #fff;
  }
`

export const ProductSet = styled.div`
  display: flex;
  margin-right: 10px;
  & > div {
    margin-right: 10px;
    align-items: center;
    display: flex;
  }
  & div > input[type='radio'] {
    margin: 0 15px 0 0px;
  }
`

export const SelectBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 248px;
    height: 120px;
    padding: 5px;
    border-radius: 2px;
    background-color: #f9f9f9;
    color: #777;
    font-size: 14px;
  }
`

export const Box = styled.div`
  background-color: #ddd;
`

export const Preview = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 33px;
  background-color: ${mainColor};
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`


export const GuideButton = styled.button`
  margin-left: auto;
  padding: 15px 27px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition-duration: 0.5s;

  &:hover {
    color: ${mainColor}
  }
`

export const GuideContainer = styled.div`
  border: 1px solid #e5e5e5;
`
export const GuideHeader = styled.div`
  padding: 18px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
  color: ${mainColor};
  font-size: 16px;
`
export const GuideSubject = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
`
export const GuideBody = styled.div`
  display: flex;
  padding: 20px;
`

export const PreviewTab = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;

  & div {
    padding: 14px 29px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      border: 1px solid ${mainColor};
      color: ${mainColor}
    }
  }
`

export const PreviewBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  min-height: 160px;
  max-height: 360px;
  background-color: #eeeeee;
  border: 1px solid #e5e5e5;
  overflow: auto;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border: 1px dashed;
    border-color: ${mainColor};

    &:before {
      content: "배너 사이즈"
    }
  }
`

export const PreviewSubmit = styled.button`
  padding: 18px 20px;
  width: 200px;
  background-color: #525252;
  color: #fff;
`

export const ScriptSubject = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;

  & div:last-child {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
  }
`
