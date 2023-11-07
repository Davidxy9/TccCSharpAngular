import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardClientComponent } from './components/card-client/card-client.component';
import { HomeComponent } from './page/Home/home.component';
import { DetailsComponent } from './page/Details/details.component';
import { RegistrationComponent } from './page/Registration/registration.component';
import { CardFieldComponent } from './components/card-field/card-field.component';
import { CardAvatarComponent } from './components/card-avatar/card-avatar.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { EmptyContentComponent } from './components/empty-content/empty-content.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationItemComponent } from './components/pagination-item/pagination-item.component';
import { PaginationSelectComponent } from './components/pagination-select/pagination-select.component';
import { CardRegistrationComponent } from './components/card-registration/card-registration.component';
import { InputComponent } from './components/Forms/input/input.component';
import { InputFileComponent } from './components/Forms/input-file/input-file.component';
import { AdvanceFooterComponent } from './components/advance-footer/advance-footer.component';
import { GeneralDataInputsComponent } from './components/general-data-inputs/general-data-inputs.component';
import { PreviewAvatarAndUsernameComponent } from './components/preview-avatar-and-username/preview-avatar-and-username.component';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormContactsComponent } from './components/form-contacts/form-contacts.component';
import { DataReviewComponent } from './components/data-review/data-review.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { TextComponent } from './components/text/text.component';
import { TextWithIconComponent } from './components/text-with-icon/text-with-icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    RegistrationComponent,
    NavbarComponent,
    CardClientComponent,
    CardFieldComponent,
    CardAvatarComponent,
    InputSearchComponent,
    EmptyContentComponent,
    PaginationComponent,
    PaginationItemComponent,
    PaginationSelectComponent,
    CardRegistrationComponent,
    InputComponent,
    InputFileComponent,
    AdvanceFooterComponent,
    GeneralDataInputsComponent,
    PreviewAvatarAndUsernameComponent,
    FormAddressComponent,
    FormContactsComponent,
    DataReviewComponent,
    CustomerInformationComponent,
    CardDetailsComponent,
    TextComponent,
    TextWithIconComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
