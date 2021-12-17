import { NgModule } from '@angular/core'
import { MatCardModule} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class MaterialModule {}
 