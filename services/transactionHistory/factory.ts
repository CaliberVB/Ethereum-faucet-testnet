import { Redis } from "ioredis";
import { IpTransactionHistory } from "./implementations/ip";
import { ITransactionHistoryService } from "./interfaces";
import { getAppConfig } from "../../config";
import { AddressTransactionHistory } from "./implementations/address";

export function getTransactionHistoryService(type: string) : ITransactionHistoryService {
  const {redisUrl, redisOptions} = getAppConfig();
  console.log("redis", redisUrl);
  const redis = new Redis(redisUrl, redisOptions);

  switch (type) {
    case "ip":
      return new IpTransactionHistory(redis);
    default:
      return new AddressTransactionHistory(redis);

  }
}