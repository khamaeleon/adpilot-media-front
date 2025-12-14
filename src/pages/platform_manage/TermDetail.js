import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  CancelButton,
  ColSpan1,
  ColSpan3,
  ColSpan4,
  ColTitle, DelButton,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {
  selMyInfo,
  selPolicyTermsById,
  selUserInfo,
  updateMyInfo, updateTerms,
  updateUser
} from "../../services/platform/ManageUserAxios";
import {toast, ToastContainer} from "react-toastify";
import {modalController} from "../../store";
import styled from "styled-components";
import {accountInfoAtom, adminInfoAtom} from "./entity/common";
import {tokenResultAtom} from "../login/entity";
import {multiAxiosCall} from "../../common/StringUtils";
import {TermsBox} from "../signup/styles";

function PlatformTermDetail() {
  const [termsInfo, setTermsInfo] = useState()
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [, setModal] = useAtom(modalController)
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: termsInfo
  })
  const onError = (error) => console.log(error)
  const navigate = useNavigate()
  const {state} = useLocation();

  useEffect(() => {
    function callbackFunc(response) {
      setTermsInfo(response[0][0]);
    }
    
    multiAxiosCall([selPolicyTermsById(state.id)], callbackFunc);
    return () => {
      setModal({isShow:false});
    }
  }, [])

  const onSubmit = () => {
    function callbackFunc(response) {
      if (response[0]) {
        toast.success("수정 되었습니다.",{onClose: () => tokenResultInfo.role === 'NORMAL' ? navigate('/board/dashboard') : navigate('/board/platformTerm'), autoClose:100, delay:0})
      } else {
        toast.warning("수정이 실패 하였습니다. 관리자한테 문의하세요")
      }
    }
    multiAxiosCall([updateTerms(termsInfo)],  callbackFunc);
  }
  const handleTermsTitle = (event) => {
    setTermsInfo({
      ...termsInfo,
      title: event.target.value
    })
  }
  const handleTermsContent = (event) => {
    setTermsInfo({
      ...termsInfo,
      content: event.target.value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>기본 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span4>약관</Span4></ColTitle>
                <RelativeDiv>
                  <Input
                    type={'text'}
                    placeholder={'아이디를 입력해주세요'}
                    value={termsInfo?.title || ""}
                    onChange={e => handleTermsTitle(e)}
                  />
                </RelativeDiv>

              </ColSpan4>
            </RowSpan>
            <RowSpan>
              <ColSpan4>
                <ColTitle><Span4>약관 내용</Span4></ColTitle>
                <RelativeDiv>
                  {/*<Input*/}
                  <TermsBox>
                    {/*<div dangerouslySetInnerHTML={{__html: termsInfo?.content}}></div>*/}
                    <textarea
                        style={{
                          width: "100%",
                          height: "300px",
                          borderRadius: '5px',
                          border: "none",
                          resize: "vertical"
                        }}
                        value={termsInfo?.content || ""}
                        onChange={e => handleTermsContent(e)}
                    />
                  </TermsBox>
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
        </Board>
        <SubmitContainer>
          <CancelButton type={"button"} onClick={() => navigate('/board/platformTerm')}>취소</CancelButton>
          <SubmitButton type={"submit"}>정보 수정</SubmitButton>
        </SubmitContainer>
      </form>
      <ToastContainer position="top-center"
                      autoClose={1500}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      limit={1}
                      style={{zIndex: 9999999}}/>
    </>
  )
}

export default PlatformTermDetail;

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