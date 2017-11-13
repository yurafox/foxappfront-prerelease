import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, args: string) : string {
    const limit = args ? parseInt(args, 10) : -1;
    const trail = '...';
    return limit === -1 ? value : value.substring(0, limit) + trail;
  }
}
