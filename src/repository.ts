import { AxiosStatic } from 'axios';

type Pagination = Record<'page' | 'size', number>;

interface Entity {
  id?: number;
  display?: string;
  [key: string]: any;
}

type PredicateType =
  | 'EQUAL'
  | 'LIKE'
  | 'OR'
  | 'AND'
  | 'IS_NULL'
  | 'IS_NOT_NULL';

interface Predicate {
  type: PredicateType;
  params?: { [key: string]: any };
  restrictions?: Predicate[];
}

interface Sorting {
  column: string;
  desc: boolean;
}

interface ListParams {
  pageNumber?: number;
  pageSize?: number;
  where?: Predicate[];
  orderBy?: Sorting[];
}

type Links = Record<'self' | 'first' | 'prev' | 'next' | 'last', string>;

type Meta = Record<
  'pageNumber' | 'pageSize' | 'lastPageNumber' | 'totalCount',
  number
>;

interface PagedResponse<T extends {} = { [key: string]: any }> {
  data: T[];
  links: Links;
  meta: Meta;
}

const path = 'repos';

class Repository {
  private axios: AxiosStatic;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }
  async merge(mdl: string, entity: Entity): Promise<Entity> {
    return (await this.axios.patch(`${path}/${mdl}`, entity)).data;
  }
  async delete(mdl: string, id: number) {
    await this.axios.delete(`${path}/${mdl}/${id}`);
  }
  async find(mdl: string, ...where: Predicate[]): Promise<Entity> {
    return (await this.axios.post(`${path}/${mdl}/find`, where)).data;
  }
  async findById(mdl: string, id: unknown): Promise<Entity> {
    return this.find(mdl, {
      type: 'EQUAL',
      params: {
        x: 'id',
        y: id
      }
    });
  }
  async list(mdl: string, params: ListParams): Promise<PagedResponse<Entity>> {
    return (await this.axios.post(`${path}/${mdl}/list`, params)).data;
  }
  async activate(mdl: string, id: number, act: boolean = true): Promise<void> {
    await this.axios.get(`${path}/act/${mdl}/${id}/${act ? '' : 'deactivate'}`);
  }
}

export {
  Repository
};
export type {
  Pagination,
  Entity,
  PredicateType,
  Predicate,
  Sorting,
  Links,
  Meta,
  PagedResponse,
  ListParams
};
