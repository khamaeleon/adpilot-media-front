const typeCase = {
  historyDate:"DATE",
  siteName:"SITE_NAME",
  inventoryId:"INVENTORY_ID",
  inventoryName:"INVENTORY_NAME",
  userId:"USERNAME",
  requestCount:"REQUEST_COUNT",
  responseCount:"RESPONSE_COUNT",
  exposureCount:"EXPOSURE_COUNT",
  clickCount:"CLICK_COUNT",
  validClickCount:"VALID_CLICK_COUNT",
  costAmount:"COST_AMOUNT",
  revenueAmount:"REVENUE_AMOUNT",
  requestCountOfPlatform:"REQUEST_COUNT_BY_OTHER",
  exposureCountOfPlatform:"EXPOSURE_COUNT_BY_OTHER",
  clickCountOfPlatform:"CLICK_COUNT_BY_OTHER",
  costAmountOfPlatform:"COST_AMOUNT_BY_OTHER",
  revenueAmountOfPlatform:"REVENUE_AMOUNT_BY_OTHER",
}

function ascToDesc(num) {
  return num > 0 ? 'ASC' : 'DESC'
}
export function sort(defaultType,type) {
  let value
  console.log(defaultType,type)
  if(type !== null && type !== undefined) {
    value = `${typeCase[type.name]}_${ascToDesc(type.dir)}`
  } else {
    value = defaultType
  }
  return value
}