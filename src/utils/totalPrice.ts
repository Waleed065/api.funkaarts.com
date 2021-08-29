interface schema {
  startDate: Date;
  endDate: Date;
  price: number;
}
export default function totalPrice({ startDate, endDate, price }: schema):number {

  const Difference_In_Time = endDate.getTime() - startDate.getTime();

  const Difference_In_Days =
    Math.ceil(Difference_In_Time / (1000 * 3600 * 24)) || 1;

  return price * Difference_In_Days;
}
