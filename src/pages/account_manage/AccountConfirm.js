import {Board, BoardHeader, BoardTableContainer, ColSpan2} from "../../assets/GlobalStyles";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  accountConfirmColumns,
  accountConfirmSetting,
  accountHistoryDataAtom,
  accountUpdateInvoiceStatus,
  searchAccountParams
} from "./entity";
import {accountHistoryTableData, accountUpdateInvoiceRecord} from "../../services/account/AccountAdminAxios";
import {toast, ToastContainer} from "react-toastify";
import styled from "styled-components";
import {AdminInfo} from "../layout";
import {AccountCondition} from "../../components/Account/Condition";

function AccountConfirm() {
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)

  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)
  const [invoiceStatusSelected, setInvoiceStatusSelected] = useState([])
  const [checkboxAllSelect, setCheckboxAllSelect] = useState(false);

  const handleHistoryTableData = async() => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
    const fetchData = await accountHistoryTableData(userName, searchAccountHistoryParamsState)
    .then(response => {
        const data = response
      if (response !== null) {
        setAccountHistoryDataState(response)
        setInvoiceStatusSelected([])
        setCheckboxAllSelect(false)
      }
      return data
    })
    return fetchData
  }

  useEffect(() => {
    handleHistoryTableData()
  }, [])

  const dataCallback = useCallback( handleHistoryTableData , [accountHistoryDataState])

  const updateInvoice = (params) => {
    params.invoiceIdList.length !== 0 ? confirmAlert({
      title: '알림',
      message: '변경 하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            accountUpdateInvoiceRecord(params).then(response=> response && dataCallback() )
          }
        },{
          label: '취소',
          onClick: () => handleInvoiceStatus('')
        }
      ]
    }) : toast.warning('상태 변경 대상 없음.')
  }

  const handleInvoiceStatus = (event) => {
    updateInvoice(
      {
        invoiceStatus: event,
        invoiceIdList: invoiceStatusSelected
      }
    )
  }

  const disabledArr = ['REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
  const handleInvoiceCheckAll = (event) => { // 상태 변경 전체 체크
    if(event.target.checked){
      let allArr = accountHistoryDataState.filter(obj => !disabledArr.includes(obj.status)).map(data => {return data.id})
      setInvoiceStatusSelected(allArr)
      if(allArr.length !== 0) {
        setCheckboxAllSelect(true)
      } else {
        setCheckboxAllSelect(false)
        toast.warning('상태 변경 불가.')
      }
    } else{
      setInvoiceStatusSelected([])
      setCheckboxAllSelect(false)
    }
  }
  const handleInvoiceStatusCheckbox = (e,cellProps) => { // 테이블 리스트 컬럼 내 체크박스 핸들링
    if(e.currentTarget.checked){
      setInvoiceStatusSelected([...invoiceStatusSelected.concat(cellProps.data.id)])
    } else {
      setInvoiceStatusSelected([...invoiceStatusSelected.filter(id => id !== cellProps.data.id)])
      setCheckboxAllSelect(false)
    }
  }

  const checkboxColumn = { // 테이블 체크박스 커스텀
    renderCheckbox: (checkboxProps, cellProps) => {
      return (
        <div style={{minWidth: 100}}>
          {
            !disabledArr.includes(cellProps.data?.status) &&
              <Checkbox label={''}
                        type={'a'}
                        isChecked={invoiceStatusSelected.includes(cellProps.data.id) ? true : false}
                        onChange={ e => {
                          handleInvoiceStatusCheckbox(e, cellProps)
                        }}/>
          }

        </div>
      );
    }
  }

  return (
    <>
      <Board>
        <BoardHeader>정산 심사</BoardHeader>
        <AccountCondition searchAccount={searchAccountHistoryParamsState} setSearchAccount={setSearchAccountHistoryParamsState} handleHistoryTableData={handleHistoryTableData} />
        <BoardTableContainer>
          <ColSpan2 style={{marginTop: 20, paddingLeft: 0}}>
            <Checkbox label={'전체'}
                      type={'c'}
                      id={'AllSelect'}
                      isChecked={checkboxAllSelect}
                      onChange={(e)=> handleInvoiceCheckAll(e)}
            />
            <InvoiceStatusBtn type={'button'} id={'EXAMINED_COMPLETED'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>심사완료</InvoiceStatusBtn>
            <InvoiceStatusBtn type={'button'} id={'REJECT'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>반려</InvoiceStatusBtn>
            <InvoiceStatusBtn type={'button'} id={'PAYMENT_COMPLETED'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>지급완료</InvoiceStatusBtn>
            <InvoiceStatusBtn type={'button'} id={'WITHHELD_PAYMENT'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>지급보류</InvoiceStatusBtn>
          </ColSpan2>
          <Table columns={accountConfirmColumns}
                 data={accountHistoryDataState}
                 settings={accountConfirmSetting}
                 idProperty="id"
                 checkboxColumn={checkboxColumn} //체크박스 커스텀
                 onSelectionChange={invoiceStatusSelected} // 선택한 체크박스 정보 가져오기
                 emptyText={'정산 심사 내역이 없습니다.'}
                 showHoverRows={false}
                 />
        </BoardTableContainer>
      </Board>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      style={{zIndex: 9999999}}/>
    </>
  )
}

export default AccountConfirm

const InvoiceStatusBtn = styled.button`
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 35px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`