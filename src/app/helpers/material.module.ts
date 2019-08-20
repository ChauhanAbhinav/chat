import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, } from '@angular/material';
import {MatInputModule, MatRadioModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
// tslint:disable-next-line: max-line-length
imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSidenavModule, MatIconModule, MatDividerModule],

// tslint:disable-next-line: max-line-length
exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSidenavModule, MatIconModule, MatDividerModule],

providers: [

  ]
})

export  class  MyMaterialModule {

}
