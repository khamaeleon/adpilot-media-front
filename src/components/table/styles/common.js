import styled from "styled-components";

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 68px;
  height: 30px;
  background: #ddd;
  border-radius: 68px;
  position: relative;
  transition: background-color .2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  & > label {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }
`

export const On = styled.span`
  display: inline-block;
  width: 50%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`
export const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`

export const GuideContainer = styled.div`
  border: 1px solid #e5e5e5;
`
export const GuideHeader = styled.div`
  padding: 18px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
  color: #f5811f;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`
export const GuideBody = styled.div`
  display: flex;
  padding: 20px;
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
export const TotalCount = styled.div`
  vertical-align: middle;
  display: flex;
  align-items: center;
  gap: 5px;
  & > span:first-child {
    display: inline-block;
    width: 3px;
    height: 10px;
    background-color: #222;
  }
  & > span:last-child {
    margin: 0;
    color: #f5811f;
  }
`

export const Small = styled.small`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding: 10px;
`