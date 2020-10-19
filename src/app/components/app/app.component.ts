import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as faker from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'parte20';

  constructor(
    private _http: HttpClient
  ){}

  noticias: Noticia[] = [];

  ngOnInit() {
    this._http.get('https://jsonplaceholder.typicode.com/posts').
    pipe(
      map((data: Noticia[]) => data.slice(0, 10))
    )
    .subscribe((noticias: Noticia[]) => {
      noticias.forEach(noticia => {
        this.noticias.push({
          ...noticia,
          author: faker.name.findName(),
          url: 'https://www.noticiero.com/prueba/prueba'
        })
      })
      console.log(this.noticias)
    });
  }
}
export interface Noticia{
  userId: number;
  id: number;
  title: string;
  body: string;
  author: string;
  url: string;
}
