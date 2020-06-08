/**
 **datestr:形如‘2020-06-12’的字符串
 **return Date 对象
 **/
function getDate(datestr) {
  const temp = datestr.split("-");
  if (temp[1] === "01") {
    temp[0] = parseInt(temp[0], 10) - 1;
    temp[1] = "12";
  } else {
    temp[1] = parseInt(temp[1], 10) - 1;
  }
  //new Date()的月份入参实际都是当前值-1
  const date = new Date(temp[0], temp[1], temp[2]);
  return date;
}
/**
 ***获取两个日期间的所有日期
 ***默认start<end
 **/
export const getDiffDate = (start, end) => {
  const startTime = getDate(start);
  const endTime = getDate(end);
  const dateArr = [];
  while (endTime.getTime() - startTime.getTime() > 0) {
    const year = startTime.getFullYear();
    const month =
      (startTime.getMonth() + 1).toString().length === 1
        ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1)
        : startTime.getMonth() + 1;
    const day =
      startTime.getDate().toString().length === 1
        ? "0" + startTime.getDate()
        : startTime.getDate();
    dateArr.push(year + "-" + month + "-" + day);
    startTime.setDate(startTime.getDate() + 1);
  }
  return dateArr;
};
