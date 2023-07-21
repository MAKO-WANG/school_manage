const tansToTen = (data: number) => {
  return data < 10 ? '0' + data : data;
};

export const timestampToTime = (timestamp: number, hideHMS?: boolean) => {
  const date = new Date(timestamp * 1000);
  const Y = date.getFullYear();
  const M = tansToTen(date.getMonth() + 1);
  const D = tansToTen(date.getDate());
  const h = tansToTen(date.getHours());
  const m = tansToTen(date.getMinutes());
  const s = tansToTen(date.getSeconds());
  if (hideHMS) {
    return `${Y}-${M}-${D}`;
  }
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};
