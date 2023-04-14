import styled from "styled-components";

export const BoardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
`
export const BoardInfoItem = styled.div`
  padding: 15px 0 15px 30px;
  width: 100%;
  & > div {
    padding: 8px 0;
  }
`
export const Square = styled.div`
  display: inline-block;
  margin-right: 10px;
  width: 8px;
  height: 8px;
  background-color: #ccc;
`
export const SortableContainer = styled.div`
  padding: 30px 0;
`
export const SortListContainer = styled.div`
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  height: 100%;
  & > div:last-child {
    width: 100%;
  }
`
export const SortHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 17px 30px;
  border-bottom: 1px solid #ddd;
`
export const SortBody = styled.div`
  padding: 0 30px;
  width: 100%;
  background-color: #fafafa;
  overflow: hidden;
  transition-duration: 0.5s;
  & > div {
    width:100%;
    display: flex;
    margin: 15px 0;
    align-items: center;
  }
  & > div > button {
    width: 10%;
    margin-left:15px ;
    height: 45px;
  }
  & > div > div {
    margin-top: 0;
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
  }
 
`
export const ColSpan = styled.div`
  display: flex;
  align-items: center;
`
export const Handled = styled.div`
  width: 50px;
  border-right: 1px solid #ddd;
  background-image: url("/assets/images/common/btn_tausch_off.png");
  background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_off.png") 1x, url("/assets/images/common/btn_tausch_off@2x.png") 2x, url("/assets/images/common/btn_tausch_off@3x.png") 3x);
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-image: url("/assets/images/common/btn_tausch_on.png");
    background-image: -webkit-image-set(url("/assets/images/common/btn_tausch_on.png") 1x, url("/assets/images/common/btn_tausch_on@2x.png") 2x, url("/assets/images/common/btn_tausch_on@3x.png") 3x);
  }
`