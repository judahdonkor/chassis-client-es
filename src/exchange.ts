import { AxiosStatic } from 'axios';

type Credentials = Record<'email' | 'phone' | 'password' | 'token' | 'disc', string>;

const path = 'xchg';

class Exchange {
  private axios: AxiosStatic;
  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }
  async appuser() {
    return (await this.axios.get(`${path}/appuser`)).data;
  }
  async signOut() {
    await this.axios.get(`${path}/sign-out`);
    delete this.axios.defaults.headers.common['Authorization'];
  }
  async signIn(
    credentials:
      | Pick<Credentials, 'email' | 'password'>
      | Pick<Credentials, 'email' | 'token'>
      | Pick<Credentials, 'phone' | 'password'>
      | Pick<Credentials, 'phone' | 'token'>
      | Pick<Credentials, 'disc' | 'password'>
  ): Promise<string> {
    const tk = (await this.axios.post(`${path}/sign-in`, credentials)).data;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${tk}`;
    return tk;
  }
  async otp(username: string): Promise<string> {
    return (await this.axios.get(`${path}/otp/${username}`)).data;
  }
  async resetPassword(password: string): Promise<string> {
    return (await this.axios.put(`${path}/reset-password`, password)).data;
  }
}

export { Exchange };
export type { Credentials };
