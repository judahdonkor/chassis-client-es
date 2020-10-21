import { Repository } from './repository';
import { Exchange } from './exchange';
import { AxiosStatic } from 'axios';
import { Creation } from './creation'

interface Enum {
  name: string;
  display: string;
  ordinal: number;
  [key: string]: any;
}

class Chassis {
  private axios: AxiosStatic;
  repos: Repository;
  xchg: Exchange;
  cr8: Creation;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
    this.repos = new Repository(axios);
    this.xchg = new Exchange(axios);
    this.cr8 = new Creation(axios);
  }
  async enum(cls: string): Promise<Enum[]> {
    return (await this.axios.get(`enum/${cls}`)).data;
  }
}

export type { Enum }
export { Repository, Chassis, Exchange };
