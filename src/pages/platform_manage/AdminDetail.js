import styled from "styled-components";
import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CancelButton, ColSpan1, ColSpan2, ColSpan3, ColSpan4, ColTitle,
  RowSpan, Span4, SubmitButton, SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";

function PlatformAdminDetail(){

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
                <div>
                  <Input/>
                </div>
              </ColSpan3>
              <ColSpan1>
                <button>중복 확인</button>
              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호</Span4></ColTitle>
                <div>
                  <Input/>
                </div>
              </ColSpan3>
              <ColSpan1>

              </ColSpan1>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>비밀번호 확인</Span4></ColTitle>
                <div>
                  <Input/>
                </div>
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
                <div>
                  <Input/>
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 연락처</Span4></ColTitle>
                <div>
                  <Input/>
                </div>
              </ColSpan3>
            </RowSpan>
            <RowSpan>
              <ColSpan3>
                <ColTitle><Span4>담당자 이메일</Span4></ColTitle>
                <div>
                  <Input/>
                </div>
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
                <ColTitle><Span4>담당자명</Span4></ColTitle>
                <div>
                  <Select/>
                </div>
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
                <div style={{display:'flex',gap: 20}}>
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

const Input = styled.input`
  padding:0 20px;
  width: 100%;
  border: 1px solid #e5e5e5;
  height: 45px;
  border-radius: 10px;
  background-color: #f9fafb;
`
