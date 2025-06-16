enum AccountType {

}

export type Account = {
  id: string
  type: AccountType
  name: string
  username: string
  created_at: number
  updated_at: number
  email: string
}

export type CreateAccountParams = Omit<Account, 'id' | 'created_at' | 'updated_at'> & {
  password: string
}

export type PatchAccountParams = Partial<Omit<Account, 'created_at' | 'updated_at'> & {
  password: string
}>
