import { format } from 'date-fns';

// format date
export default function todoDateFormat(date) {
  let formattedDate = date;
  if (date !== '') {
    formattedDate = date.split('-');
    formattedDate = format(new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2]), 'MMM d, yyyy');
  }
  return formattedDate;
}
