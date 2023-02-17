import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader, BoardSearchDetail, CancelButton, ColSpan1, ColSpan2,
  ColSpan3, ColSpan4,
  ColTitle, Input, inputStyle, RelativeDiv,
  RowSpan, Span2, SubmitButton, SubmitContainer,
  TitleContainer, ValidationScript
} from "../../assets/GlobalStyles";
import {Controller, useForm} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import {useState} from "react";

function MediaListDetail(){
  const {register ,control, handleSubmit, formState: { errors }} = useForm()
  const [deviceType, setDeviceType] = useState('PC')
  const onError = (error) => console.log(error)
  const onSubmit = (data) => {
    console.log(data)
    return null
  }
  const handleDeviceType = (deviceType) => {
    setDeviceType(deviceType)
  }
  return(
    <main>
      <form onSubmit={handleSubmit(onSubmit,onError)}>
        <BoardContainer>
          <TitleContainer>
            <h1>지면 관리</h1>
            <Navigator/>
          </TitleContainer>

          {/*지면 정보*/}
          <Board>
            <BoardHeader>지면 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>심사 상태</Span2></ColTitle>
                  <RelativeDiv>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'심사 중'},{key:1,value:'value1',label:'심사 완료'}]}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.name && <ValidationScript>{errors.name?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>매체 설정</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`인사이트`}
                           {...register('name2',{
                             required:true
                           })}
                    />
                    {errors.name2 && <ValidationScript>{errors.name2?.message}</ValidationScript>}
                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면명</Span2></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`인사이트_콘텐츠 플로팅 400*400`}
                           {...register('name3',{
                             required:true
                           })}
                    />
                    {errors.name3 && <ValidationScript>{errors.name3?.message}</ValidationScript>}
                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span2>지면 카테고리</Span2></ColTitle>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'카테고리1'},{key:1,value:'value1',label:'카테고리2'}]}
                                placeholder={'카테고리 선택'}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.select1 && <ValidationScript>{errors.select1?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan1>
                  <div>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "선택해주세요"
                        }
                      }}
                      render={({ field }) =>(
                        <Select options={[{key:0,value:'value',label:'하위 카테고리 1'},{key:1,value:'value1',label:'하위 카테고리 2'}]}
                                placeholder={'하위 카테고리 선택'}
                                styles={inputStyle}
                                {...field}
                                components={{IndicatorSeparator: () => null}}
                        />
                      )}
                    />
                    {errors.select1 && <ValidationScript>{errors.select1?.message}</ValidationScript>}
                  </div>
                </ColSpan1>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>디바이스 유형</Span2></ColTitle>
                  <div>
                    <CustomRadio type={'radio'}
                                 id={'pc'}
                                 name={'device-type'}
                                 defaultChecked={true}
                                 onChange={() => handleDeviceType('PC')}
                    />
                    <label htmlFor={'pc'}>PC</label>
                    <CustomRadio type={'radio'}
                                 id={'mobile'}
                                 name={'device-type'}
                                 onChange={() => handleDeviceType('MOBILE')}
                    />
                    <label htmlFor={'mobile'}>MOBILE</label>
                  </div>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span2>에이전트 유형</Span2></ColTitle>
                  <div>
                    {deviceType === 'PC' &&
                      <>
                        <input type={'radio'}
                               id={'web'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'web'}>PC 웹</label>
                        <input type={'radio'}
                               id={'application'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'application'}>PC 어플리케이션</label>
                        <input type={'radio'}
                               id={'responsive'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'responsive'}>반응형 웹</label>
                      </>
                    }
                    {deviceType === 'MOBILE' &&
                      <>
                        <input type={'radio'}
                               id={'mobileWeb'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'mobileWeb'}>MOBILE 웹</label>
                        <input type={'radio'}
                               id={'app'}
                               name={'agent-type'}
                        />
                        <label htmlFor={'app'}>앱(APP)</label>
                      </>
                    }
                  </div>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan4>
                  <ColTitle><Span2>지면 url</Span2><br/><small>(APP market url)</small></ColTitle>
                  <div>
                    <Input type={'text'}
                           defaultValue={`https://mcorpor.com/`}
                           {...register('name4',{
                             required:true
                           })}
                    />
                    {errors.name4 && <ValidationScript>{errors.name4?.message}</ValidationScript>}
                  </div>
                </ColSpan4>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*광고 상품 정보*/}
          <Board>
            <BoardHeader>광고 상품 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>광고 상품</Span2></ColTitle>
                  <div>

                  </div>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>이벤트 설정</Span2></ColTitle>
                  <div>

                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>이벤트 단가 관리</Span2></ColTitle>
                  <div>

                  </div>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan1>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>

                  </div>
                </ColSpan1>
                <ColSpan1>
                  <div>

                  </div>
                </ColSpan1>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 유형</Span2></ColTitle>
                  <div>

                  </div>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*매체 정산 정보*/}
          <Board>
            <BoardHeader>매체 정산 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>계약 기간</Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>대행사 정산 여부</Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>계약기간</Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
            </BoardSearchDetail>
          </Board>

          {/*추가 정보 입력*/}
          <Board>
            <BoardHeader>추가 정보 입력</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>지면 상세 설명</Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan2/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2>광고 미송출 대체 설정</Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span2></Span2></ColTitle>
                  <RelativeDiv>

                  </RelativeDiv>
                </ColSpan2>
                <ColSpan3/>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <CancelButton>취소</CancelButton>
            <SubmitButton type={'submit'}>정보 수정</SubmitButton>
          </SubmitContainer>
        </BoardContainer>
      </form>
    </main>
  )
}

export default MediaListDetail

const CustomRadio = styled('input')`
  display: none;
  &[type='radio'] + label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #ccc;
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
    background-color: #f5811f;
    color: #fff;
  }
`