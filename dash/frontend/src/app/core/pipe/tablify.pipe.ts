import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablify'
})
export class TablifyPipe implements PipeTransform {

  transform(value: any): string {
    return '<div class=\'table-format\'>' + this.tablify(value) + '</div>';
  }

  escapeHtml(unsafe)
  {
    if (typeof(unsafe) === 'string') {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    } else {
      return unsafe;
    }
  }

  tablify(obj, depth = 0, maxdepth = 10) {
    if (depth >= maxdepth) {
      return 'max depth reached'; // too deep
    }

    const type = typeof(obj);
    if (Array.isArray(obj)) {
      return '<table>' + obj.map(o => '<tr><td>' + this.tablify(o, depth + 1, maxdepth) + '</td></tr>').join('') + '</table>';
    }

    switch (type) {
      case 'object':
        return '<table>' +
          Object.entries(obj).map(o => '<tr><td>' + this.tablify(o[0], depth + 1, maxdepth) + '</td><td>' + this.tablify(o[1], depth + 1, maxdepth) + '</td></tr>').join('') +
          '</table>';
      case null:
        return 'null';
      case undefined:
        return 'undefined';
    }

    // anything else, just return it
    return this.escapeHtml(obj);
  }

}
