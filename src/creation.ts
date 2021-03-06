import { AxiosStatic } from 'axios';
import { Entity } from './repository';

const path = 'cr8';

class Creation {
  private axios: AxiosStatic;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }
  async find(mdl: string, key: string, context?: {
    'disc-cls': string
    'disc-id': number
  }): Promise<Entity> {
    return (await this.axios.get(`${path}/${mdl}/${key}`, {
      params: context || {}
    })).data;
  }
  // implement when needed
  // async list(params: ): Promise<Entity[]> {
  //   return (await this.axios.post(`${path}/${mdl}/list`, params)).data;
  // }
}

export {
  Creation
};
