interface ReducerObject {
  type: string
  payload: any
}

interface InitStateObject {
  loading: boolean

  balance: number
  injectiveAddress: string
  walletStatus: number
}