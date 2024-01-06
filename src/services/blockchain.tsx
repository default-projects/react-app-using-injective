import { BigNumberInBase } from "@injectivelabs/utils"

const bigNumToNumber = (amount: string | number, d: number = 18) => {
  return new BigNumberInBase(amount).toWei(-1 * d).toNumber();
}

export { bigNumToNumber }