import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './Budget-planner/login/login.component';
import { DashboardComponent } from './Budget-planner/dashboard/dashboard.component';
import { ExpenseComponent } from './Budget-planner/expense/expense.component';
// import { HistoryComponent } from './Budget-planner/history/history.component';
// import { IncomeComponent } from './income/income.component';
// import { ProfileComponent } from './profile/profile.component';
// import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense', component: ExpenseComponent },
//   { path: 'history', component: HistoryComponent },
//   { path: 'income', component: IncomeComponent },
//   { path: 'profile', component: ProfileComponent },
//   { path: 'todo', component: TodoComponent },
  { path: '**', redirectTo: 'login' },
];

export const appRouting = provideRouter(routes);
