import moment from "moment";

export const convertDate = (timestamp: number) => {
  var currentDate = new Date(timestamp * 1000);
  const convertedDate = moment(currentDate).format("DD/MM");
  return convertedDate.toString();
};