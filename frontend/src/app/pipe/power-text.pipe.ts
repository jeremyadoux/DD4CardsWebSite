import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerText'
})
export class PowerTextPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    let str = value.replace(/\n/g, '<br />');

    const regex = /#(.*?)#/gm;
    let m;

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      str = str.replace(m[0], '<b>' + m[1] + '</b>');
    }

    return str;
  }
}
