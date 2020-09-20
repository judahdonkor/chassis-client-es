import { Repository } from './repository';
import { Exchange } from './exchange';
import { AxiosStatic } from 'axios';

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
  constructor(axios: AxiosStatic) {
    this.axios = axios;
    this.repos = new Repository(axios);
    this.xchg = new Exchange(axios);
  }
  async enumerate(cls: string): Promise<Enum[]> {
    return (await this.axios.get(`enum/${cls}`)).data;
  }
}

export { Repository, Chassis, Exchange };
