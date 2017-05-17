import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'home-view',
	template: `<h3>{{subs | async}}</h3>
  <form [formGroup]="form">
  <md-input-container> 
      <input mdInput formControlName="name" [placeholder]="nameLabel">
  </md-input-container>
  </form>    
  
  `
})
export class HomeView implements OnInit {
  form: FormGroup;
  public subs: Observable<string>;

  constructor(private fb: FormBuilder, private http: TransferHttp) {
    this.form = fb.group({
      name: 'Johnny!'
    });
  }

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/data').map(data => {
      return `${data.greeting} ${data.name}`;
    });
  }
}
