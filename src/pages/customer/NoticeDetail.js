import {
  Board, BoardHeader,
  BoardTableContainer, CancelButton, ColSpan1,
  ColSpan3, ColSpan4,
  Input, RelativeDiv, RowSpan, Span4, SubmitButton, SubmitContainer, TextArea,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
  updateNoticeAdmin,
  updateNoticePublishAdmin
} from "../../services/notice/NoticeAdminAxios";
import {useAtom} from "jotai";
import {useLocation, useNavigate} from "react-router-dom";
import {tokenResultAtom} from "../login/entity";
import {Small} from "../../components/table/styles/common";

export default function NoticeDetail(props) {

  const [tokenUserInfo] = useAtom(tokenResultAtom)

  const { state } = useLocation();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const [notice, setNotice] = useState({title:'', content:''});


  useEffect(() => {
    setNotice(state.data)
  },[]);

  const handleRadio = (boolean) => {
    setNotice({...notice, publishYn: boolean});
  }
  const onError = () => {}
  const onSubmit = () => {
    updateNoticeAdmin(notice)
    .then(()=>
        navigate("/board/notice", {replace: true})
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Board>
          <BoardHeader>
            <ColSpan3>
              <p>공지사항</p>
            </ColSpan3>
            {
              tokenUserInfo.role !== 'NORMAL' &&
                <ColSpan1>
                  <RelativeDiv style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishY'}
                          onChange={() => handleRadio('Y')}
                          checked={notice?.publishYn === 'Y'}
                      />
                      <span style={{marginLeft: '5px'}}>공개</span>
                    </label>
                    <label>
                      <input
                          type={'radio'}
                          name={'notice'}
                          id={'publishN'}
                          onChange={() => handleRadio('N')}
                          checked={notice?.publishYn === 'N'}
                      />
                      <span style={{marginLeft: '5px'}}>비공개</span>
                    </label>
                  </RelativeDiv>
                </ColSpan1>
            }
          </BoardHeader>
          <BoardTableContainer>
            <RowSpan validation>
              <ColSpan4>
                <Span4>제목</Span4>
                <RelativeDiv>
                  <Input type={'text'}
                         style={{backgroundColor: 'transparent', borderWidth: tokenUserInfo.role !== 'NORMAL' ? 1 : 0, padding: '10px', fontWeight: 'bold', cursor: 'default'}}
                         value={notice.title}
                         readOnly={tokenUserInfo.role === 'NORMAL'}
                         onChange={(e) => {
                           setNotice({...notice, title: e.target.value})
                         }}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan validation>
              <ColSpan4 style={{alignItems: 'start'}}>
                <Span4 style={{paddingTop: '10px'}}>내용</Span4>
                <RelativeDiv>
                  <TextArea rows={25}
                            style={{backgroundColor: 'transparent', borderWidth: tokenUserInfo.role !== 'NORMAL' ? 1 : 0, cursor: 'default'}}
                            value={notice.content}
                            readOnly={tokenUserInfo.role === 'NORMAL' }
                            onChange={(e) => {
                              setNotice({...notice, content: e.target.value})
                            }}
                  />
                </RelativeDiv>
              </ColSpan4>
            </RowSpan>
            <RowSpan>

            </RowSpan>
          </BoardTableContainer>
        </Board>
        <SubmitContainer>
          <CancelButton type={"button"} onClick={()=> navigate(-1)}>목록</CancelButton>
          {tokenUserInfo.role !== "NORMAL" &&
            <SubmitButton type={"submit"}>{'수정'}</SubmitButton>
          }
        </SubmitContainer>
      </form>
  )
}