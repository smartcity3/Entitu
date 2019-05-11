import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './authentication.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthenticationService]
})
export class CoreModule {
}
