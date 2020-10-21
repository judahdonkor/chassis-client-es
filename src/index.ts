import { AxiosStatic } from 'axios';
import { Creation } from './creation';
import { Exchange } from './exchange';
import { Repository } from './repository';

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
  creation: Creation;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
    this.repos = new Repository(axios);
    this.xchg = new Exchange(axios);
    this.creation = new Creation(axios);
  }
  async enum(cls: string): Promise<Enum[]> {
    return (await this.axios.get(`enum/${cls}`)).data;
  }
}

export type { Enum };
export { Repository, Chassis, Exchange };

