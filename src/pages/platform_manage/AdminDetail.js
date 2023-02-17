import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1, ColSpan2, ColSpan3, ColSpan4, ColTitle, Input, RelativeDiv,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useState} from "react";

function PlatformAdminDetail(){
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>기본 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>아이디</Span4></ColTitle>
                <RelativeDiv>
                  <Input/>
                </RelativeDiv>
              </ColSpan3>
              <ColSpan1>
                <DuplicateButton>중복 확인</DuplicateButton>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호</Span4></ColTitle>
                <RelativeDiv>
                  <Input type={showPassword? 'text' : 'password'}/>
                </RelativeDiv>
              </ColSpan3>
              <ColSpan1>
                <div onClick={handleShowPassword}>
                <span style={{
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  backgroundImage: `url(/assets/images/common/checkbox_${showPassword ? 'on' : 'off'}_B.png)`
                }}/>
                  <span>{showPassword ? '가리기' : '보기'}</span>
                </div>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호 확인</Span4></ColTitle>
                <RelativeDiv>
                  <Input type={showPassword? 'text' : 'password'}/>
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>

        <Board>
          <BoardHeader>담당자 정보</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <RelativeDiv>
                  <Input/>
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <RelativeDiv>
                  <Input/>
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <RelativeDiv>
                  <Input/>
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>

        <Board>
          <BoardHeader>담당자 권한</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan1>
                <ColTitle><Span4>권한 설정</Span4></ColTitle>
                <RelativeDiv>
                  <Select/>
                </RelativeDiv>
              </ColSpan1>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>

        <Board>
          <BoardHeader>사용 여부</BoardHeader>
          <BoardSearchDetail>
            <RowSpan>
              <ColSpan2>
                <ColTitle><Span4>사용 여부</Span4></ColTitle>
                <div style={{display:'flex',gap: 10}}>
                  <input type={'radio'}
                         id={'use'}
                         name={'isUse'}
                  />
                  <label htmlFor={'use'}>사용</label>
                  <input type={'radio'}
                         id={'unUse'}
                         name={'isUse'}
                  />
                  <label htmlFor={'unUse'}>미사용</label>
                </div>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <VerticalRule style={{marginTop:20,backgroundColor:"#eeeeee"}}/>
        </Board>
        <SubmitContainer>
          <CancelButton>취소</CancelButton>
          <SubmitButton>정보 수정</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdminDetail

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
