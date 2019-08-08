import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, } from '@angular/material';
import {MatInputModule, MatRadioModule, MatListModule } from '@angular/material';
// import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';


@NgModule({
// tslint:disable-next-line: max-line-length
imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule ],

// tslint:disable-next-line: max-line-length
exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule ],

providers: [
   
  ]
})

export  class  MyMaterialModule {

}
