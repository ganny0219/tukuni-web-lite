import { Dayjs } from "dayjs";

export type IconProps = {
  size?: number;
  color?: string;
};

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type DateRangeValue = {
  counter: 0 | 1;
  firstDate: Dayjs;
  secondDate: Dayjs;
};

export type SelectColorItem = {
  value: string;
  bgColor?: string;
  textColor?: string;
};

// export type TimeType = "PM" | "AM";

export type TimeKey = "hour" | "minute" | "type";

export type Time = {
  hour: string;
  minute: string;
  type: string;
};
