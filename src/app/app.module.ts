import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FriendsComponent } from './components/friends/friends.component';
import { FriendComponent } from './components/friend/friend.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './components/home/home.component';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'friends/:name', component: FriendDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FriendsComponent,
    FriendComponent,
    FiltersComponent,
    ModalComponent,
    HomeComponent,
    FriendDetailsComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
