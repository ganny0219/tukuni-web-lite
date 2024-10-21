import UseSWR, { SWRConfiguration } from "swr";
import qs from "qs";
import { apiAxios } from "@/utils/axios";

export const apiSWR = <T>(
  url: string,
  query?: object,
  conf?: SWRConfiguration
) => {
  let querySearch = { ...query };

  return UseSWR(
    `${url}?${qs.stringify(querySearch, { encode: false })}`,
    (key: string) => apiAxios.get<T>(key).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
      ...conf,
    }
  );
};
