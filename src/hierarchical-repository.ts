import { AxiosStatic } from 'axios';
import { Entity } from './repository';

const path = 'hier-repos';

class HierarchicalRepository {
  private axios: AxiosStatic;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }
  async descendants(mdl: string, id: unknown): Promise<Entity[]> {
    return (await this.axios.get(`${path}/desc/${mdl}/${id}`)).data;
  }
  async children(mdl: string, id: unknown): Promise<Entity[]> {
    return (await this.axios.get(`${path}/chldn/${mdl}/${id}`)).data;
  }
}

export {
  HierarchicalRepository
};
