import { HttpService } from '@nestjs/axios';
import { IAxios } from '../interfaces';
import { WORLD_TIME_API } from '../../apis';

export const getDateTimeByCountry = async (
  continent: string,
  city: string,
  httpService: HttpService,
): Promise<string> => {
  const url = `${WORLD_TIME_API}/timezone/${continent}/${city}`;
  const timeZoneObject: IAxios = await httpService.axiosRef(url);
  const currentDate = new Date(timeZoneObject.data.datetime);

  const timezone_offset_min = currentDate.getTimezoneOffset();
  const timezone_offset_ms = timezone_offset_min * -60 * 1000;
  currentDate.setTime(currentDate.getTime() + timezone_offset_ms);

  return currentDate.toISOString();
};
