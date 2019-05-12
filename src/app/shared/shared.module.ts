import {NgModule} from "@angular/core";
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatSelectModule, MatSliderModule,
  MatTabsModule
} from '@angular/material';

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
      MatBadgeModule,
      MatChipsModule,
      FlexLayoutModule,
      MatCardModule,
      MatSelectModule,
      MatSliderModule
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
      MatBadgeModule,
      MatChipsModule,
      FlexLayoutModule,
      MatCardModule,
      MatSelectModule,
      MatSliderModule

  ]
})
export class SharedModule{}
