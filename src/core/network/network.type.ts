export type Network = {
  id: number
  instance_id: string
  private_ip: string
  mac_address: string
  public_ip?: string
}

export type GetNetworkParams = {
  id?: Network['id']
  instance_id?: Network['instance_id']
}
