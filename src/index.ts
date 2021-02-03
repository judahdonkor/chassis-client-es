import { AxiosStatic } from 'axios';
import { Creation } from './creation';
import { Exchange } from './exchange';
import { Repository } from './repository';
import { HierarchicalRepository } from './hierarchical-repository'

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
  hierRepos: HierarchicalRepository;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
    this.repos = new Repository(axios);
    this.xchg = new Exchange(axios);
    this.creation = new Creation(axios);
    this.hierRepos = new HierarchicalRepository(axios);
  }
  async enum(cls: string): Promise<Enum[]> {
    return (await this.axios.get(`enum/${cls}`)).data;
  }
}

export type { Enum };
export { Repository, Chassis, Exchange };

