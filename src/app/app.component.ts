import { Component, OnInit } from '@angular/core';
import { LanguageService } from './app/language.service';
import { Language } from './app/language';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languages: Language[];
  error = '';
  success = '';
  title = 'Angular';
  example = 'This is a test2';

  constructor(private languageService:LanguageService){

  }
  
  ngOnInit(){
    this.getLanguages();
  }
  getLanguages(): void {
    this.languageService.getAll().subscribe(
      (res: Language[]) => {
        this.languages = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
