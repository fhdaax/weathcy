import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatListModule,
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule {}
