export interface IAxios {
  data: IWorldTime;
}

interface IWorldTime {
  datetime: string;
  utc_datetime: string;
  unixtime: string;
}
