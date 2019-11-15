import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, forkJoin } from 'rxjs';
import { map, delay, mergeMap, concatMap, toArray, catchError } from 'rxjs/operators';
@Injectable()
export class SitiosService {
  constructor(private http: HttpClient) {}

  getData = (site: string): Observable<any> => {
    const diasList = ['2019-11-15', '2019-11-14', '2019-11-13', '2019-11-12'];

    return from(diasList).pipe(
      toArray(),
      mergeMap((dias: any) => forkJoin(dias.map((dia: string) => this.request(site, dia)))),
      map(siteData => ({
        site,
        dias: siteData
      }))
    );
  };

  private request = (site: string, dia: string) => {
    return this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `https://${site}/wp-json/wp/v2/posts?status=publish&orderby=date&per_page=100&after=${dia}T00:00:00Z&before=${dia}T23:59:59Z`
      )
      .pipe(
        map((resp: any[]) => ({
          dia,
          post: resp,
          totalPost: resp.length
        })),
        catchError(error => of(error))
      );
  };
}
