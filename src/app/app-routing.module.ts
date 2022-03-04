import { NgModule } from '@angular/core';
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

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [{path: '', loadChildren: () =>
import('./features/auth/auth.module').then((m) => m.AuthModule)},
{path: 'register',component: RegisterComponent, ...canActivate(redirectToHome)},
{path: 'info',component: InfoComponent},{path: 'about',component: AboutComponent},
{path:'forgot-password',component:ForgotPasswordComponent},
{path:'login',component:LoginComponent,...canActivate(redirectToHome)},
{path:'home',component:HomeComponent, ...canActivate(redirectToLogin)},
{path:'createQuiz',component:CreateQuizComponent, ...canActivate(redirectToLogin)},
{path:'createQuestions',component:CreateQuestionComponent,...canActivate(redirectToLogin)},
{path:'profile',component:ProfileComponent,...canActivate(redirectToLogin)},
{path:'modal',component:ModalComponent},
{path: '**',redirectTo: '',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
