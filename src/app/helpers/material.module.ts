import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, } from '@angular/material';
import {MatInputModule, MatRadioModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


@NgModule({
// tslint:disable-next-line: max-line-length
imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSidenavModule, MatIconModule],

// tslint:disable-next-line: max-line-length
exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSidenavModule, MatIconModule],

providers: [

  ]
})

export  class  MyMaterialModule {

}
