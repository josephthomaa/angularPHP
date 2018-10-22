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
  language= new Language('','',0);
  //Create new language
  addLanguage(f) {
    this.error = '';
    this.success = '';

    this.languageService.store(this.language)
      .subscribe(
        (res: Language[]) => {
          // Update the list of cars
          this.languages = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
}
  //get language list-Retrive
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
  //Updata
  updateLanguage(name, details, id) {
    this.success = '';
    this.error = '';

    this.languageService.update({ name: name.value, details: details.value, id: +id })
      .subscribe(
        (res) => {
          this.languages    = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }
  //delete
  deleteLanguage(id) {
    this.success = '';
    this.error   = '';
    
    this.languageService.delete(+id)
      .subscribe(
        (res: Language[]) => {
          this.languages = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
}
}
