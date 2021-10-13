import {Injectable} from '@angular/core';
import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {find, flatMap, filter, every, tail, flattenDeep} from 'lodash-es';
import {MOCK_DATABASE} from './mock-database/mock-database';
import {
  HypnosisThing,
  HypnosisTypeEnumerator,
  SpecificHypnosisType,
} from '@wulkanat/hypnothing-core/lib/hypnosis';

/**
 * Wait for specified amount of time
 */
async function wait(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export interface SearchParameters {
  query?: string;
  filters?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
/**
 * Navigate to a path
 */
function esNavigate<T>(object: unknown, path: string[]): T[] {
  const nav = (object as Record<string, unknown>)[path[0]];

  return flatMap(Array.isArray(nav) ? flattenDeep(nav) : [nav], it =>
    path.length > 1 ? esNavigate<T>(it, tail(path)) : flattenDeep([it]),
  );
}

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  async search(parameters: SearchParameters): Promise<HypnosisThing[]> {
    await wait(500);
    console.log(parameters);

    return flatMap(MOCK_DATABASE, (database, type) =>
      !parameters.filters?.type || parameters.filters.type === type
        ? filter(database, item =>
            every(parameters.filters, (value, field) =>
              esNavigate(item, field.split('.')).includes(value),
            ),
          )
        : [],
    );
  }

  async list<T extends HypnosisTypeEnumerator>(
    type: T,
  ): Promise<SpecificHypnosisType<T>[]> {
    return Object.values(MOCK_DATABASE[type]!) as SpecificHypnosisType<T>[];
  }

  async get<T extends HypnosisThing>(uuid: Uuid): Promise<T | undefined> {
    await wait(500);

    return find(MOCK_DATABASE, it => typeof it[uuid] !== 'undefined')?.[
      uuid
    ] as T | undefined;
  }
}
