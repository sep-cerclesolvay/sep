import environment from 'environment';
import { BaseEditableObject } from 'types/BaseEditableObject';
import { Id } from 'types/Id';

export class ReadApi<ReadDataType> {
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

export class CRUDApi<ReadDataType, SaveDataType extends BaseEditableObject> extends ReadApi<ReadDataType> {
  private _saveSerializer?: (data: SaveDataType) => string;

  constructor(slug: string, saveSerializer?: (data: SaveDataType) => string) {
    super(slug);
    this._saveSerializer = saveSerializer;
  }

  save = async (data?: SaveDataType, preferPatch = false): Promise<ReadDataType | undefined> => {
    if (!data) return;

    const create: boolean = typeof data.id !== 'number';

    const method = create ? 'POST' : preferPatch ? 'PATCH' : 'PUT';

    const response = await fetch(`${environment.API_URL}/${this.slug}/${create ? '' : `${data.id}/`}`, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: this._saveSerializer ? this._saveSerializer(data) : JSON.stringify(data),
    });
    return await response.json();
  };
}
