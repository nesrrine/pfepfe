import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbRatingModule, NgbAccordionModule,NgbModule  } from '@ng-bootstrap/ng-bootstrap';

// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Scrollto
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Load Icon
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ReactiveFormsModule } from '@angular/forms';

// Component pages
import { AsvanceUiRoutingModule } from './advance-ui-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SweetalertsComponent } from './sweetalerts/sweetalerts.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { TourComponent } from './tour/tour.component';
import { SwipersComponent } from './swiper/swiper.component';
import { RatingsComponent } from './ratings/ratings.component';
import { HighlightComponent } from './highlight/highlight.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { IdentificationComponent } from "./identification/identification.component";
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { LeafletComponent } from '../maps/leaflet/leaflet.component';

@NgModule({
  declarations: [
    SweetalertsComponent,
    ScrollbarComponent,
    TourComponent,
    SwipersComponent,
    RatingsComponent,
    HighlightComponent,
    ScrollspyComponent,
    IdentificationComponent,
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule, // Assurez-vous que ReactiveFormsModule est importé

    NgbDropdownModule,
    NgbAccordionModule,
    NgbRatingModule,
    SimplebarAngularModule,
    AsvanceUiRoutingModule,
    SlickCarouselModule,
    SharedModule,
    ScrollToModule.forRoot(),
    LeafletModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvanceUiModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
