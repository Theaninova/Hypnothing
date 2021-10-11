import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'map',
  pure: true,
})
export class MapPipe implements PipeTransform {
  transform<T>(map: Record<string, T>): {key: string; value: T}[] {
    return Object.entries(map).map(([key, value]) => ({
      key,
      value,
    }));
  }
}

@Pipe({
  name: 'values',
  pure: true,
})
export class ValuesPipe implements PipeTransform {
  transform<T>(value: Record<string | number | symbol, T>): T[] {
    return Object.values(value);
  }
}

@Pipe({
  name: 'keys',
  pure: true,
})
export class KeysPipe implements PipeTransform {
  transform(value: Record<string, unknown>): string[] {
    return Object.keys(value);
  }
}
