import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform<T>(values: T[], key: keyof T, separator = ', '): unknown {
    return values.map(value => value[key]).join(separator);
  }
}
