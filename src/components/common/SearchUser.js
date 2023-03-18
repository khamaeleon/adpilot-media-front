import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalHeader} from "../modal/Modal";
import styled from "styled-components";
import {selKeywordUser} from "../../services/ManageUserAxios";
import {modalController} from "../../store";
import Switch from "./Switch";

export function SearchUser(props) {
  const {title, onSubmit, btnStyle} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 600,
      modalComponent: () => {
        return <SearchModal onSubmit={onSubmit}/>
      }
    })
  }

switch (btnStyle){
  case 'AccountButton' : return <AccountButton style={{marginBottom: 15, backgroundColor: '#fff'}} onClick={handleModalComponent}>{title}<span>></span></AccountButton>;
  case 'SwitchUserButton' : return <SwitchUserButton onClick={handleModalComponent}>{title}</SwitchUserButton>;
  default : return <Button type={'button'} onClick={handleModalComponent}>{title}</Button>;
  }
}


function SearchModal (props) {

  const [, setModal] = useAtom(modalController)
  const [mediaSearchInfo, setMediaSearchInfo] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [searchKeyword, setSearchKeyword] = useState()

  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  const handleSubmit = () => {
    setModal({
      isShow: false,
      modalComponent: null
    })
    props.onSubmit(selectedItem)
  }

  const handleOnSearchKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearch = (e) => {
    selKeywordUser(searchKeyword).then(response => {
      setMediaSearchInfo(response)
    })
  }
  return (
      <div>
        <ModalHeader title={"매체 검색"}/>
        <ModalBody>
          <MediaSearchColumn>
            <div>매체명</div>
            <div>
              <InputGroup>
                <input type={'text'}
                       placeholder={"매체명을 입력해주세요."}
                       autoFocus={true}
                       value={searchKeyword}
                       onChange={e => handleOnSearchKeyword(e)}
                       onKeyDown={event => (event.code === 'Enter') && handleSearch() }
                />
                <button type={'button'} onClick={handleSearch}>검색</button>
              </InputGroup>
            </div>
          </MediaSearchColumn>
          <MediaSearchResult>
            {mediaSearchInfo.length !== 0 &&
                <>
                  <table>
                    <thead>
                    <tr>
                      <th>매체명</th>
                      <th>아이디</th>
                      <th>담당자명</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mediaSearchInfo.map((item, key) => {
                      return (
                          <tr key={key}
                              onClick={() => handleSelect(item)}
                              style={selectedItem.siteName === item.siteName ? {
                                backgroundColor: "#f5811f",
                                color: '#fff'
                              } : null}>
                            <td>{item.siteName}</td>
                            <td>{item.username}</td>
                            <td>{item.staffName}</td>
                          </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </>
            }
            <MediaSelectedButton onClick={handleSubmit} >선택 완료</MediaSelectedButton>
          </MediaSearchResult>
        </ModalBody>
      </div>
  )
}

const MediaSearchColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #f9f9f9;

  & > div:first-child {
    min-width: 70px;
  }

  & > div:last-child {
    width: 100%;
  }
`

const MediaSelectedButton = styled.button`
  display: block;
  margin: 15px auto 0;
  padding: 13px 0;
  width: 200px;
  background-color: #535353;
  color: #fff;
`


const MediaSearchResult = styled.div`
  font-size: 13px;

  & table {
    margin-top: 18px;
    width: 100%;

    & th {
      padding: 12px;
      background-color: #fafafa;
      color: #b2b2b2;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
`

const InputGroup = styled.div`
  display: flex;

  & input[type='text'] {
    padding: 0 20px;
    width: 80%;
    border: 1px solid #e5e5e5;
    height: 45px;
    border-radius: 10px 0 0 10px;
  }

  & button {
    width: 20%;
    border-radius: 0 10px 10px 0;
    background-color: #777;
    color: #fff;
  }
`

const Button = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: #777777;
  color: #fff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #535353;
  }
`

const AccountButton = styled.button`
  width: 175px; 
  height: 40px;
  border-radius: 5px;
  border: solid 1px #ddd;
  background-color: #f3f3f3;
  font-size: 15px;
  > span {
    padding-left: 10px;
  }
`

const SwitchUserButton = styled.button`
  background-color: #fff;
  padding: 13px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
`