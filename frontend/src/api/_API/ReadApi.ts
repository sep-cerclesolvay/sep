import environment from 'environment';
import { BaseObject } from 'types/BaseObject';
import { Id } from 'types/Id';

export class ReadApi<ReadDataType extends BaseObject> {
  private _slug: string;

  constructor(slug: string) {
    this._slug = slug;
  }

  get slug(): string {
    return this._slug;
  }

  fetchAll = async (): Promise<ReadDataType[] | undefined> => {
    const resp = await fetch(`${environment.API_URL}/${this.slug}/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
    if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
    return await resp.json();
  };

  fetchById = async (id: Id): Promise<ReadDataType | undefined> => {
    const resp = await fetch(`${environment.API_URL}/${this.slug}/${id}/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
    if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
    return await resp.json();
  };
}
