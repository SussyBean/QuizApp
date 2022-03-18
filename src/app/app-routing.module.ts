import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { InfoComponent } from './components/info/info.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateQuestionComponent } from './components/create-quiz/create-questions.component';
import { ModalComponent } from './components/modal/modal.component';
import { QuizSolveComponent } from './components/quiz-solve-welcome/quiz-solve.component';
import { JavaOperatorsStatementsComponent } from './components/programmingInformation/Java/java-operators-statements/java-operators-statements.component';
import { JavaDataVariablesComponent } from './components/programmingInformation/Java/java-data-variables/java-data-variables.component';
import { JavaCyclesComponent } from './components/programmingInformation/Java/java-cycles/java-cycles.component';
import { JavaArrayComponent } from './components/programmingInformation/Java/java-array/java-array.component';
import { JavaConditionsIfStatementsComponent } from './components/programmingInformation/Java/java-conditions-if-statements/java-conditions-if-statements.component';
import { EasyCalculationsComponent } from './components/programmingInformation/JavaScript/easy-calculations/easy-calculations.component';
import { ComplicatedConditionsComponent } from './components/programmingInformation/JavaScript/complicated-conditions/complicated-conditions.component';
import { JavaScriptCyclesComponent } from './components/programmingInformation/JavaScript/java-script-cycles/java-script-cycles.component';
import { JavascriptFunctionsComponent } from './components/programmingInformation/JavaScript/javascript-functions/javascript-functions.component';
import { QuizSolveQuestionsComponent } from './components/quiz-solve-questions/quiz-solve-questions.component';
import { PasswordConfirmComponent } from './components/password-confirm/password-confirm.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LandingComponent } from './components/landing/landing.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [{path: '', loadChildren: () =>
import('./features/auth/auth.module').then((m) => m.AuthModule)},
{path: 'register',component: RegisterComponent, ...canActivate(redirectToHome)},
{path: 'info',component: InfoComponent},{path: 'about',component: AboutComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'confirm-password',component:PasswordConfirmComponent},
{path:'verify-email',component:EmailVerifyComponent},
{path:'reset-password',component:ResetPasswordComponent},
{path:'email/action',component:EmailConfirmationComponent},

// Java-path
{path:'java-operators-statements',component:JavaOperatorsStatementsComponent},
{path:'java-types-variables',component:JavaDataVariablesComponent},
{path:'java-if',component:JavaConditionsIfStatementsComponent},
{path:'java-cycles',component:JavaCyclesComponent},
{path:'java-array',component:JavaArrayComponent},


// JavaScript-path
{path:'javascript-easy-calculations',component:EasyCalculationsComponent},
{path:'javascript-complicated-conditions',component:ComplicatedConditionsComponent},
{path:'javascript-loops',component:JavaScriptCyclesComponent},
{path:'javascript-functions',component:JavascriptFunctionsComponent},

{path:'landing',component:LandingComponent,...canActivate(redirectToHome)},
{path:'login',component:LoginComponent,...canActivate(redirectToHome)},
{path:'home',component:HomeComponent, ...canActivate(redirectToLogin)},
{path:'createQuiz',component:CreateQuizComponent, ...canActivate(redirectToLogin)},
{path:'createQuestions',component:CreateQuestionComponent,...canActivate(redirectToLogin)},
{path:'quizes',component:QuizSolveComponent,...canActivate(redirectToLogin)},
{path:'quizes/:id',component:QuizSolveQuestionsComponent,...canActivate(redirectToLogin)},
{path:'profile',component:ProfileComponent,...canActivate(redirectToLogin)},
{path:'modal',component:ModalComponent},
{path: '**',redirectTo: '/landing',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
 }
