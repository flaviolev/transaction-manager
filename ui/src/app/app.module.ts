import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { RegisterComponent } from './register/register.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { authInterceptorProviders } from './core/auth/auth.interceptor'
//import { httpErrorInterceptorProviders } from './core/error/http-error.interceptor'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [authInterceptorProviders], //httpErrorInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
