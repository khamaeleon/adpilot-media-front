/* 리스트 기본값 */
export const defaultCondition = {
  productType: [{key: "0", value: null, label: '전체'}, {key: "1", value: 'BANNER', label: '배너'}, {
    key: "2",
    value: 'POP_UNDER',
    label: '팝 언더'
  }],
  eventType: [{key: "0", value: null, label: '전체'}, {key: "1", value: 'SAW_THE_PRODUCT', label: '본상품'}, {
    key: "2",
    value: "CART_THE_PRODUCT",
    label: "장바구니"
  }, {key: "3", value: 'DOMAIN_MATCHING', label: '리턴매칭'}],
  isAdExchange: [{key: "0", value: null, label: '전체'}, {key: "1", value: "ALL", label: "전체"}, {
    key: "2",
    value: "IN_COMING",
    label: "수신"
  }, {key: "3", value: "OUT_GOING", label: "송출"}, {key: "4", value: "EXCEPTION", label: ""}],
  deviceType: [{key: "0", value: null, label: '전체'}, {key: "1", value: "PC", label: "PC"}, {
    key: "2",
    value: "MOBILE",
    label: "모바일"
  }, {key: "3", value: "RESPONSIVE_WEB", label: "반응형웹"}],
  agentType: [{key: "1", value: "WEB", label: "PC 웹"}, {key: "2", value: "WEB_APP", label: "PC 어플리케이션"}, {
    key: "3",
    value: "MOBILE_WEB",
    label: "모바일 웹"
  }, {key: "4", value: "MOBILE_NATIVE_APP", label: "모바일 어플리케이션"}],
  sortType: null
}