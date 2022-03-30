import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreateQuestionComponent } from './components/create-quiz/create-questions.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import { AboutComponent } from './components/about/about.component';
import { InfoComponent } from './components/info/info.component';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProfileComponent } from './components/profile/profile.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { QuizSolveComponent } from './components/quiz-solve-welcome/quiz-solve.component';
import { ModalComponent } from './components/modal/modal.component';
import {MatTreeModule} from '@angular/material/tree';
import { JavaDataVariablesComponent } from './components/programmingInformation/Java/java-data-variables/java-data-variables.component';
import { JavaOperatorsStatementsComponent } from './components/programmingInformation/Java/java-operators-statements/java-operators-statements.component';
import { JavaConditionsIfStatementsComponent } from './components/programmingInformation/Java/java-conditions-if-statements/java-conditions-if-statements.component';
import { JavaCyclesComponent } from './components/programmingInformation/Java/java-cycles/java-cycles.component';
import { JavaArrayComponent } from './components/programmingInformation/Java/java-array/java-array.component';
import { EasyCalculationsComponent } from './components/programmingInformation/JavaScript/easy-calculations/easy-calculations.component';
import { ComplicatedConditionsComponent } from './components/programmingInformation/JavaScript/complicated-conditions/complicated-conditions.component';
import { JavaScriptCyclesComponent } from './components/programmingInformation/JavaScript/java-script-cycles/java-script-cycles.component';
import { JavascriptFunctionsComponent } from './components/programmingInformation/JavaScript/javascript-functions/javascript-functions.component';
import { QuizSolveQuestionsComponent } from './components/quiz-solve-questions/quiz-solve-questions.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeBgDirective } from './change-bg.directive';
import { FooterComponent } from './components/footer/footer.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { PasswordConfirmComponent } from './components/password-confirm/password-confirm.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import {MatTableModule} from '@angular/material/table';
import { FormsTestComponent } from './components/forms-test/forms-test.component';
import { FormsContactComponent } from './components/forms-test/forms-contact/forms-contact.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PopUpDialogComponent } from './components/pop-up-dialog/pop-up-dialog.component';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BackgroundImageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    HomeComponent,
    LandingComponent,
    CreateQuizComponent,
    SidenavComponent,
    AboutComponent,
    InfoComponent,
    ProfileComponent,
    CreateQuestionComponent,
    QuizSolveComponent,
    ModalComponent,
    JavaDataVariablesComponent,
    JavaOperatorsStatementsComponent,
    JavaConditionsIfStatementsComponent,
    JavaCyclesComponent,
    JavaArrayComponent,
    EasyCalculationsComponent,
    ComplicatedConditionsComponent,
    JavaScriptCyclesComponent,
    JavascriptFunctionsComponent,
    QuizSolveQuestionsComponent,
    ChangeBgDirective,
    FooterComponent,
    EmailVerifyComponent,
    PasswordConfirmComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent,
    ScrollToTopComponent,
    FormsTestComponent,
    FormsContactComponent,
    MainNavComponent,
    ConfirmDialogComponent,
    PopUpDialogComponent











  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTreeModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTableModule,
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    LayoutModule,
    MatDialogModule,






  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
