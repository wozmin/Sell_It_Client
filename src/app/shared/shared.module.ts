import {NgModule} from "@angular/core";
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
      NgxSpinnerModule,
      CommonModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FlexLayoutModule,
      MatSelectModule,
    MatSliderModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports: [
      NgxSpinnerModule,
      CommonModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      FlexLayoutModule,
      MatSelectModule,
    MatSliderModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class SharedModule{}
