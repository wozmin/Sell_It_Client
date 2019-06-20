import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  imports:[
    HttpClientModule
  ],
  providers:[AuthGuard]
})
export class CoreModule {

}
