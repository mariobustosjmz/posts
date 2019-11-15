import { Component, OnInit } from '@angular/core';
import { of, from, forkJoin, Observable } from 'rxjs';
import { map, delay, mergeMap, concatMap, toArray, finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { SitiosService } from './sitios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  sitios$: Observable<any>;

  constructor(private sitiosService: SitiosService) {}

  ngOnInit() {
    this.isLoading = true;
    const sites = [
      'horizonte.site',
      'miradatransparente.com',
      'larayaenelagua.website',
      'ultimasnoticiasdelsur.com',
      'elfinancierodesantacruz.com',
      'elnortedeuruguay.com',
      'elcambiodebuenosaires.xyz',
      'nuestrorumbo.me',
      'loscirculosrojos.com',
      'losfaro.me',
      'tendiendopuente.site',
      'yopiensodistinto.website',
      '40segundos.com',
      'opiniondeoruro.com',
      'informat.com.mx',
      'pulsonorte.com',
      'elvergatario.com',
      'lasinternacionales.com',
      'hagamosloviral.com',
      'indignados.com.mx',
      'eleconomistadebolivia.com',
      'laestrellaroja.net',
      'reportered.net',
      'porsiestabasconelpendiente.com',
      'contrareplica.co',
      'diosesdigital.com',
      'dominiocuba.net',
      'corazondeamerica.info'
    ];

    this.sitios$ = from(sites).pipe(
      toArray(),
      mergeMap(sites => forkJoin(sites.map(site => this.sitiosService.getData(site)))),
      finalize(() => (this.isLoading = false))
    );

    /*
const data = from(sites).pipe(
mergeMap(param => forkJoin(sitiosService.getData(param)))
);
console.log('data',data);
data.subscribe(r=> console.log('result',r));

sitiosService.getData(sites[1]).subscribe((data:any)=> {
   console.log('getData',data);
});
 */
  }
}
