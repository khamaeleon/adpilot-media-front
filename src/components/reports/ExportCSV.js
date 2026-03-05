import moment from "moment";

const downloadBlob = (blob, fileName) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  const file = (fileName !== undefined ? fileName : '보고서') + `_${moment().format('YYYYMMDDHHmmss')}.csv`
  link.setAttribute('href', url);
  link.setAttribute('download', file);
  link.style.position = 'absolute';
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
export const exportCSV = (gridRef, fileName) => {
  if(gridRef === '' || gridRef === null || gridRef === undefined) return;
  const columns = gridRef.current.visibleColumns;
  const header = columns.map((c) => typeof c.header === 'string' ? c.header : '').join(',');
  const getCellValueForCsv = (row, col) => {
    // 제외 컬럼
    if (col.id === 'conversionId') return '';

    // ---- (A) 컬럼 자체가 eCPM 칼럼인 경우 ----
    if (col.id === 'E-CPM' || col.id === 'ecpm') {
      const cost = Number(row.revenueAmount ?? row.revenueAmount ?? 0);
      const imp = Number(row.exposureCount ?? row.exposureCount ?? 0);

      // eCPM = (cost / impressions) * 1000
      const ecpm = imp > 0 ? (cost / imp) * 1000 : 0;

      // 소수점 자리수는 원하는대로
      return ecpm.toFixed(1);
    }

    // ---- (B) 어떤 컬럼의 값이 "E-CPM"인 경우(예: metricType 같은 값) ----
    // 예: col.id === 'metricValue' 인데 row.metricType이 'E-CPM'이면 조합값으로 출력
    if (row.metricType === 'E-CPM' && col.id === 'metricValue') {
      const cost = Number(row.revenueAmount ?? 0);
      const imp = Number(row.exposureCount ?? 0);
      return (imp > 0 ? (cost / imp) * 1000 : 0).toFixed(2);
    }

    // 기본
    return row?.[col.id] ?? '';
  };

  const rows = (gridRef.current.data ?? []).map((row) =>
      columns
      .map((c) => getCellValueForCsv(row, c))
      .join(',')
  );

  const uFEFF = "\uFEFF"

  // Office 2007 이전에는 ANSI 1252 인코딩을 기본 값, BOM을 추가하면 Office 2007 이후 버전
  // 하여 해결책으로 제시하는 바는
  // 1. csv 파일의 포맷을 컴퓨터에서 바꾼다 (매번 변경해줘야하는 번거로움이 생김)
  // 2. 거의 모든 엑셀은 utf든 ansi든 표시할 기능을 갖추고 있음. 엑셀 기본 인코딩 설정을 변경 (뷰어에서 설정을 바꿀수있지만 컴퓨터에 능숙하지 않은 사람에게 교육시키는 일이 어려움)
  // 3. csv를 ANSI로 작성한다 (디코딩 기본값이 utf8인 엑셀을 사용한다면 오히려 ansi로 작성한 파일을 열었을때 깨질수 있음)
  // 4. 구글시트, 폴라리스, 넘버스 등은 자동으로 파일의 인코딩을 잘 알아내는데 반하여 엑셀일부는
  // 가끔 인코딩을 식별하지 못하기 때문에 엑셀에서도 인식할 수 있도록 csv에 인코딩을 표시해준다.
  // (문서의 맨 앞에 /ufeff 문자열을 추가 하면 해당 내용이 어떤 문자열로 인코딩 되었는지 표현하는 식별자.
  // 이것을 맨 앞에 적어 놓으면 엑셀 프로그램은 파일의 인코딩을 이해하고 그에 맞게 출력한다.)

  const contents = [header].concat(rows).join('\n');
  const blob = new Blob([uFEFF+contents], { encoding: 'UTF-8', type: 'text/csv;charset=utf-8;' });

  downloadBlob(blob, fileName);
};