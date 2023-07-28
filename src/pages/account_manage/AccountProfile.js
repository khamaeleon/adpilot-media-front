import styled from "styled-components";
import Select from "react-select";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  DeleteButton,
  Input,
  InputLabel,
  inputStyle,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import {VerticalRule} from "../../components/common/Common";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useAtom, useAtomValue} from "jotai";
import {accountProfile, refundRequestData} from "./entity";
import {
  accountFileUpload,
  accountInsertInvoiceProfile,
  accountUserProfile,
} from "../../services/account/AccountAdminAxios";
import {removeStr} from "../../common/StringUtils";
import {toast, ToastContainer} from "react-toastify";
import ImageUploading from "react-images-uploading";
import {tokenResultAtom} from "../login/entity";
import {AdminInfo, UserInfo} from "../layout";
import {selUserInfo} from "../../services/platform/ManageUserAxios";

function AccountProfile() {
  const [tokenResultInfo] = useAtom(tokenResultAtom)
  const [accountProfileState,] = useAtom(accountProfile)
  const [invoiceProfileState, setInvoiceProfileState] = useState(accountProfile)
  const [adminInfoState] = useAtom(AdminInfo)
  const userInfoState = useAtomValue(UserInfo)
  const {register, control, handleSubmit, setValue, setError, clearErrors, reset ,formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: accountProfileState
  })

  useEffect(() => {
    if(adminInfoState.convertedUser !== ''){
      accountUserProfile(adminInfoState.convertedUser).then(response => {
        if(response !== null) {
          setInvoiceProfileState({
            ...response,
            username: adminInfoState.convertedUser,
          })
        } else {
          selUserInfo(userInfoState?.id).then(response => {
            setInvoiceProfileState({
              ...invoiceProfileState,
              username: adminInfoState.convertedUser,
              mediaType: response?.mediaType,
              grossCalculate: 0
            })
          })
        }
        reset(
          response
        )
      })
    } else setInvoiceProfileState(null)
  }, [accountProfileState,adminInfoState.convertedUser])

  /**
   * 담당자명 입력
   * @param event
   */
  const handleManagerName = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerName: event.target.value
    })
  }
  /**
   * 담당자 연락처 입력
   * @param event
   */
  const handleManagerPhone = (event) => {
    let num = event.target.value
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerPhone: num
    })
  }
  /**
   * 담당자 이메일 입력
   * @param event
   */
  const handleManagerEmail = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      managerEmail: event.target.value
    })
  }
  const handleBusinessName = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      businessName: event.target.value,
    })
  }
  const handleBusinessNumber = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      businessNumber: event.target.value,
    })
  }
  const handleBusinessCeoName = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      ceoName: event.target.value,
    })
  }
  const handleBusiness = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      business: event.target.value
    })
  }

  const handleBusinessType = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      businessType: event.target.value
    })
  }

  const handleAddress = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      address: event.target.value
    })
  }

  const handleBankNumber = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      bankAccountNumber: event.target.value
    })
  }

  const handleAccountHolder = (event) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      accountHolder: event.target.value
    })
  }

  const handleBusinessLicense = async (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length-1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      await accountFileUpload(adminInfoState.convertedUser, data,'LICENCE').then(response => {
        if(response !== false) {
          setInvoiceProfileState({
            ...invoiceProfileState,
            businessLicenseCopy: response,
            businessLicenseCopyName: pictureFiles[imagesLastIndex].file.name
          })
          setValue('businessLicenseCopyName', pictureFiles[imagesLastIndex].file.name)
          setError('businessLicenseCopyName', '')
        }else{
          console.log('maxSize 입니다.')
        }
      })
    }
  }

  const handlePassbook = (pictureFiles) => {
    if(pictureFiles.length !== 0){
      const data = new FormData()
      const imagesLastIndex = pictureFiles.length -1;
      data.append('file', pictureFiles[imagesLastIndex].file, pictureFiles[imagesLastIndex].file.name)
      accountFileUpload(adminInfoState.convertedUser, data,'PASSBOOK').then(response => {
        if(response) {
          setInvoiceProfileState({
            ...invoiceProfileState,
            passbookCopy: response,
            passbookCopyName: pictureFiles[imagesLastIndex].file.name,
          })
          setValue('passbookCopyName', pictureFiles[imagesLastIndex].file.name)
          setError('passbookCopyName', '')
        }
      })
    }
  }

  const onImageError = (errors) => {
    if (errors.maxFileSize) {
      setError('businessLicenseCopyName',{ type: 'maxFileSize', message: '저장 가능한 이미지 사이즈는 1MB 입니다.'})
    } else if (errors.maxNumber) {
      setError('businessLicenseCopyName',{ type: 'maxNumber', message: '이미지는 1개만 등록 가능합니다.'})
    } else if (errors.acceptType) {
      setError('businessLicenseCopyName',{ type: 'acceptType', message: '"jpg", "gif", "png"의 형식만 등록 가능합니다.'})
    }
  }

  const imageDel = (resourceType) => {
    if(resourceType !== 'LICENCE') {
      setInvoiceProfileState({
        ...invoiceProfileState,
        passbookCopy: '',
        passbookCopyName: '',
      })
      setValue('passbookCopyName', '')
    } else {
      setInvoiceProfileState({
        ...invoiceProfileState,
        businessLicenseCopy: '',
        businessLicenseCopyName: '',
      })
      setValue('businessLicenseCopyName', '')
    }
  }

  const taxType = (value) => {
    setInvoiceProfileState({
      ...invoiceProfileState,
      taxYn: value
    })
  }

  const handleGrossCalculate = (value) => {
    let num = removeStr(value)
    let grossCalculate = value !== '' ? parseInt(num) : 0
    if (grossCalculate <= 100) {
      setInvoiceProfileState({
        ...invoiceProfileState,
        grossCalculate: grossCalculate
      })
      clearErrors('grossCalculate')
    } else {
      setError('grossCalculate', { type: 'required', message: '100이하로 입력해주세요.'})
    }
  }
  const handleChangeIsBank = (event) => { // 은행 선택
    setInvoiceProfileState({
      ...invoiceProfileState,
      bankType: event.value
    })
  }
  const onSubmit = () => {
    accountInsertInvoiceProfile(invoiceProfileState).then(response => {
      response && toast.success('정산 프로필 정보가 수정되었습니다.',{autoClose:100, delay:0})
    })
  }

  const onError = (error) => toast.warning(error)
  return (
    <>
      {
        tokenResultInfo.id !== null && invoiceProfileState !== null &&
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Board>
            <BoardHeader>사업자 정보 </BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan3>
                  <ColTitle><Span4>매체구분</Span4></ColTitle>
                  <div>{(invoiceProfileState.mediaType !== 'AGENCY') ? '매체사' :'대행사'}</div>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>담당자</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'담당자 명을 입력해주세요'}
                      {...register("managerName", {
                        required: "담당자 명을 입력해주세요",
                        onChange:(e) => handleManagerName(e)
                      })}
                      value={invoiceProfileState.managerName || ""}
                    />
                    {errors.managerName && <ValidationScript>{errors.managerName?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>이메일</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'이메일을 입력해주세요.'}
                      {...register("managerEmail", {
                        required: "담당자 이메일을 입력해주세요.",
                        pattern: {
                          value: /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/i,
                          message: "이메일 형식을 확인해주세요"
                        },
                        onChange: (e) => handleManagerEmail(e)
                      })}
                      value={invoiceProfileState.managerEmail || ""}

                    />
                    {errors.managerEmail && <ValidationScript>{errors.managerEmail?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>연락처</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'연락처를 입력해주세요.'}
                      {...register("managerPhone", {
                        required: "담당자 연락처를 입력해주세요.",
                        pattern: {
                          // value: /0([1-9][0-9]?){1,2}[.-]?([0-9]{3,4})[.-]?([0-9]{4})/g,
                          value: /^[0-9-]+$/g,
                          message: "연락처 정보를 확인해주세요"
                        },
                        onChange : (e) => handleManagerPhone(e)
                      })}
                      value={invoiceProfileState.managerPhone || ""}
                      maxLength={11}
                    />
                    {errors.managerPhone && <ValidationScript>{errors.managerPhone?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>회사명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'회사명'}
                      {...register("businessName", {
                        required: "회사명을 입력 해주세요",
                        onChange:(e) => handleBusinessName(e)
                      })}
                      value={invoiceProfileState.businessName || ""}
                    />
                    {errors.businessName && <ValidationScript>{errors.businessName?.message}</ValidationScript>}

                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>사업자 등록 번호</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'사업자 등록 번호'}
                      {...register("businessNumber", {
                        required: "사업자 등록 번호를 입력 해주세요",
                        onChange:(e) => handleBusinessNumber(e)
                      })}
                      value={invoiceProfileState.businessNumber || ""}
                    />
                    {errors.businessNumber && <ValidationScript>{errors.businessNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>업태</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'업태'}
                      {...register("business", {
                        required: "업태를 입력해주세요",
                        onChange:(e) => handleBusiness(e)
                      })}
                      value={invoiceProfileState.business || ""}
                    />
                    {errors.business && <ValidationScript>{errors.business?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>종목</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'종목'}
                      {...register("businessType", {
                        required: "종목을 입력해주세요",
                        onChange:(e) => handleBusinessType(e)
                      })}
                      value={invoiceProfileState.businessType || ""}
                    />
                    {errors.businessType && <ValidationScript>{errors.businessType?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>대표자 성명</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'대표자 성명'}
                      {...register("ceoName", {
                        required: "회사명을 입력 해주세요",
                        onChange:(e) => handleBusinessCeoName(e)
                      })}
                      value={invoiceProfileState.ceoName || ""}
                    />
                    {errors.ceoName && <ValidationScript>{errors.ceoName?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>사업장 주소</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'사업장 주소'}
                      {...register("address", {
                        required: "주소를 입력해주세요",
                        onChange:(e) => handleAddress(e)
                      })}
                      value={invoiceProfileState.address || ""}
                    />
                    {errors.address && <ValidationScript>{errors.address?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>사업자 등록증</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      style={{paddingRight: 35}}
                      type={'text'}
                      placeholder={'사업자 등록증'}
                      {...register("businessLicenseCopyName", {
                        required: "사업자 등록증을 등록해주세요",
                      })}
                      value={invoiceProfileState.businessLicenseCopyName || ""}
                      readOnly={true}
                    />
                    {errors.businessLicenseCopyName && <ValidationScript>{errors.businessLicenseCopyName?.message}</ValidationScript>}
                    <DeleteButton type={'button'} onClick={()=> imageDel('LICENCE')} />
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                    <ImageUploading
                      acceptType={["jpg", "gif", "png"]}
                      onChange={handleBusinessLicense}
                      maxFileSize={1048576}
                      maxNumber={1}
                      onError={(e)=> onImageError(e)}
                    >
                      {({onImageUpload}) => (
                        <DuplicateButton
                          type={'button'}
                          onClick={onImageUpload}
                        >파일 첨부</DuplicateButton>
                      )}
                    </ImageUploading>
                </ColSpan1>
              </RowSpan>
            </BoardSearchDetail>
            <VerticalRule style={{marginTop: 20, backgroundColor: "#eeeeee"}}/>
          </Board>
          <Board>
            <BoardHeader>정산 정보</BoardHeader>
            <BoardSearchDetail>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>은행 선택</Span4></ColTitle>
                  <RelativeDiv>
                    <ColSpan2>
                      <Controller
                        name="bankType"
                        control={control}
                        rules={{
                          required: {
                            value: invoiceProfileState?.bankType === undefined,
                            message: "은행을 선택해주세요."
                          }
                        }}
                        render={({ field }) =>(
                          <Select options={refundRequestData.bankType !== null && refundRequestData.bankType}
                                  placeholder={'은행 선택'}
                                  {...field}
                                  value={invoiceProfileState?.bankType !== undefined ? refundRequestData.bankType.find(type => type.value === invoiceProfileState?.bankType) : ''}
                                  onChange={(e)=>handleChangeIsBank(e)}
                                  styles={inputStyle}
                          />
                        )}
                      />
                    </ColSpan2>
                    {errors.bankType && <ValidationScript>{errors.bankType?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>계좌 번호</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'계좌 번호'}
                      {...register("bankAccountNumber", {
                        required: "계좌 번호를 입력해주세요",
                        onChange:(e) => handleBankNumber(e)
                      })}
                      value={invoiceProfileState.bankAccountNumber || ""}
                    />
                    {errors.bankAccountNumber && <ValidationScript>{errors.bankAccountNumber?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>예금주</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      type={'text'}
                      placeholder={'예금주'}
                      {...register("accountHolder", {
                        required: "예금주를 입력해주세요",
                        onChange:(e) => handleAccountHolder(e)
                      })}
                      value={invoiceProfileState.accountHolder || ""}
                    />
                    {errors.accountHolder && <ValidationScript>{errors.accountHolder?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan2>
                  <ColTitle><Span4>통장 사본</Span4></ColTitle>
                  <RelativeDiv>
                    <Input
                      style={{paddingRight: 35}}
                      type={'text'}
                      placeholder={'통장 사본'}
                      {...register("passbookCopyName", {
                        required: "통장 사본을 등록해주세요",
                      })}
                      value={invoiceProfileState.passbookCopyName || ""}
                      readOnly={true}
                    />
                    {errors.passbookCopyName && <ValidationScript>{errors.passbookCopyName?.message}</ValidationScript>}
                    <DeleteButton type={'button'} onClick={()=> imageDel('PASSBOOK')}/>
                  </RelativeDiv>
                </ColSpan2>
                <ColSpan1>
                  <ImageUploading
                    acceptType={["jpg", "gif", "png"]}
                    onChange={handlePassbook}
                    maxFileSize={1048576}
                    maxNumber={1}
                    onError={(e)=> onImageError(e)}
                  >
                    {({onImageUpload}) => (
                      <DuplicateButton
                        type={'button'}
                        onClick={onImageUpload}
                      >파일 첨부</DuplicateButton>
                    )}
                  </ImageUploading>
                </ColSpan1>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>과세 여부</Span4></ColTitle>
                  <RelativeDiv>
                    <ColSpan2>
                      <input type={'radio'} id={'taxation'} name={'taxSelect'} checked={invoiceProfileState.taxYn === 'Y'} onChange={() => taxType('Y')}/>
                      <label htmlFor={'taxation'}>과세</label>
                      <input type={'radio'} id={'taxFree'} name={'taxSelect'} checked={invoiceProfileState.taxYn === 'N'} onChange={() => taxType('N')}/>
                      <label htmlFor={'taxFree'}>면세</label>
                    </ColSpan2>
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
              <RowSpan>
                <ColSpan2>
                  <ColTitle><Span4>그로스 정산</Span4></ColTitle>
                  <RelativeDiv>
                    <ColSpan2>
                      <InputLabel label={'%'}>
                        <Input type={'text'}
                               maxLength={3}
                               placeholder={'그로스 정산을 입력해 주세요.'}
                               {...register("grossCalculate", {
                                 required: "그로스 정산을 입력해 주세요.",
                                 pattern:{
                                   value: /^[0-9,]+$/,
                                   message: "숫자만 입력 가능합니다."
                                 },
                               })}
                               onChange={(e) => handleGrossCalculate(e.target.value)}
                               value={invoiceProfileState.grossCalculate !== undefined ? invoiceProfileState.grossCalculate : ''}
                        />
                      </InputLabel>
                    </ColSpan2>
                    {errors.grossCalculate && <ValidationScript>{errors.grossCalculate?.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan2>
              </RowSpan>
            </BoardSearchDetail>
          </Board>
          <SubmitContainer>
            <SubmitButton type={"submit"}>수정</SubmitButton>
          </SubmitContainer>
        </form>
      }
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

export default AccountProfile

const DuplicateButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
`
