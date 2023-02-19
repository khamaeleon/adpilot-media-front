export const mediaType=[
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "MEDIA", label: "직매체"},
  {id: "3", value: "AGENCY", label: "대행사"},
]
export const selectAccountUseInfo=[
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "IN_USE", label: "사용중"},
  {id: "3", value: "UNUSED", label: "미사용"},
]

export const adminAllType =[
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "SUPER_ADMIN", label: "최고관리자"},
  {id: "3", value: "ADMIN", label: "관리자"},
]

export const searchAccountInfo = {
  selectMediaType:{id: "1", value: "ALL", label: "전체"},
  selectAdminType:{id: "1", value: "ALL", label: "전체"},
  selectSearchName:'',
  selectSearchAdminName:'',
  selectAccountUseYn:{id: "1", value: "ALL", label: "전체"}
}

export const adminInfo ={
  memberId: '',
  password: '',
  confirmPassword:'',
  adminName:'',
  adminPhone: '',
  adminEmail: '',
  adminType: {id: "2", value: "SUPER_ADMIN", label: "최고관리자"},
  accountUseYn:'IN_USE'
}

export const adminInfoList =[
  {
    adminTypeLabel: "최고관리자",
    memberId: '123',
    adminName:'조규홍',
    adminPhone: '01073050616',
    adminEmail: 'chocto@findinglab.co.kr',
    accountUseYn:'IN_USE',
    resistDate:'2022.07.01'
  },
  {
    adminTypeLabel: "관리자",
    memberId: '321',
    adminName:'한란민',
    adminPhone: '01012345678',
    adminEmail: 'ranminhan@findinglab.co.kr',
    accountUseYn:'UNUSED',
    resistDate:'2022.07.04'
  }
]

