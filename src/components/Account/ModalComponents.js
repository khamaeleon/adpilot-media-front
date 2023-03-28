import {useAtom, useSetAtom} from "jotai";
import {AdminInfo} from "../../pages/layout";
import React, {useEffect, useState} from "react";
import {
  accountHistoryDataAtom,
  accountUpdateInvoiceStatus,
  searchAccountParams
} from "../../pages/account_manage/entity";
import {accountHistoryTableData, accountUpdateInvoiceRecord} from "../../services/AccountAdminAxios";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {DefaultButton} from "../../assets/GlobalStyles";
import styled from "styled-components";

/*
 매체 전환 모달 컴포넌트
 */
export function ConvertedMediaComponent(props){
  const{data, setModal} = props
  const [adminInfoState] = useAtom(AdminInfo) //매체 전환 계정 정보
  const [searchAccountHistoryParamsState] = useState(searchAccountParams)
  const setAccountHistoryDataState = useSetAtom(accountHistoryDataAtom)
  const [etcUpdateInvoice, setEtcUpdateInvoice] = useState(accountUpdateInvoiceStatus)
  useEffect(() => {
    setEtcUpdateInvoice({
      ...etcUpdateInvoice,
      invoiceIdList: [data.id],
      invoiceStatus: data.status.value,
      etc : data.etc
    })
  }, [])

  const handleChange = (text) => {
    setEtcUpdateInvoice({
      ...etcUpdateInvoice,
      etc : text
    })
  }
  const updateInvoice = () => {
    accountUpdateInvoiceRecord(etcUpdateInvoice).then(response => {
      response && accountHistoryTableData(adminInfoState.convertedUser, searchAccountHistoryParamsState).then(response => {
        response !== null && setAccountHistoryDataState(response)
        setModal({isShow: false})

      })
    })
  }
  return(
    <div>
      <ModalHeader title={'비고'}/>
      <ModalBody>
        <Textarea rows={4}
                  placeholder={'내용을 입력해주세요.'}
                  value={etcUpdateInvoice.etc}
                  onChange={ e => handleChange(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <DefaultButton onClick={updateInvoice}>수정</DefaultButton>
      </ModalFooter>
    </div>
  )
}

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border-color: #ccc;
  border-radius: 5px;
`