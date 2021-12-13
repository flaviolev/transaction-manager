import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from '@app/shared';

import { AuthModule } from '../auth/auth.module';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

const EXPORTED_DECLARATIONS: Array<Type<any> | any[]> = [
  // Declarations (Components / Directives) which can be used outside the Module
  WelcomeComponent,
];
const INTERNAL_DECLARATIONS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS,
  // Declarations (Components / Directives) which can be used inside the Module
];
const EXPORTS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS,
  // Components/Directives (or even Modules) to export (available for other modules)
];

@NgModule({
  declarations: INTERNAL_DECLARATIONS,
  imports: [WelcomeRoutingModule, SharedModule, AuthModule, MatSliderModule],
  exports: EXPORTS,
  providers: [],
})
export class WelcomeModule {
  static forRoot(config?: {}): ModuleWithProviders<WelcomeModule> {
    return {
      ngModule: WelcomeModule,
      providers: [],
    };
  }
}
