import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RealtyListComponent} from "./realty-list.component";
import {SharedModule} from "../shared/shared.module";
import {RealtyRoutingModule} from "./realty-routing.module";
import {MatProgressSpinnerModule} from "@angular/material";
import {RealtyDetailsComponent} from "./realty-details/realty-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxGalleryModule} from 'ngx-gallery';
import {FileDropModule} from 'ngx-file-drop';
import { RealtyEditComponent } from './realty-edit/realty-edit.component';
import {RealtyFormComponent} from './realty-form/realty-form.component';
import {RealtyAddComponent} from './realty-add/realty-add.component';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBuilding} from '@fortawesome/free-solid-svg-icons/faBuilding';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faRedditAlien} from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import {faTumblr} from '@fortawesome/free-brands-svg-icons/faTumblr';
import {faPinterestP} from '@fortawesome/free-brands-svg-icons/faPinterestP';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faVk} from '@fortawesome/free-brands-svg-icons/faVk';
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import {faMix} from '@fortawesome/free-brands-svg-icons/faMix';
import {faXing} from '@fortawesome/free-brands-svg-icons/faXing';
import {faLine} from '@fortawesome/free-brands-svg-icons/faLine';

import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import {faLink} from '@fortawesome/free-solid-svg-icons/faLink';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {faFilter, fas, faSort} from '@fortawesome/free-solid-svg-icons';
import {RealtyFilterComponent} from './realty-filter/realty-filter.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RealtyFilterDialogComponent} from './realty-filter-dialog/realty-filter-dialog.component';
import {RealtyComponent} from '../shared/realty/realty.component';
import {RealtyFavoriteListComponent} from './realty-favorite-list/realty-favorite-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedRealtyDetailsComponent} from './shared-realty-details/shared-realty-details.component';

const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
  faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faMix, faXing, faCommentAlt,
  faEnvelope, faCheck, faPrint, faExclamation, faLink, faEllipsisH, faMinus, faLine
];
library.add(fas, faHome, faBuilding, faSort, faFilter, ...icons);

@NgModule({
  declarations: [
    RealtyListComponent,
    RealtyDetailsComponent,
    RealtyEditComponent,
    RealtyFormComponent,
    RealtyAddComponent,
    RealtyFilterComponent,
    RealtyFilterDialogComponent,
    RealtyFavoriteListComponent,
    SharedRealtyDetailsComponent
  ],
  imports: [
    RealtyRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule,
    NgxGalleryModule,
    FileDropModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    TranslateModule.forChild(),
    ShareButtonsModule.withConfig({
      windowWidth: 150
    })
  ],
  entryComponents: [RealtyFilterComponent, RealtyFilterDialogComponent]
})
export class RealtyModule { }
