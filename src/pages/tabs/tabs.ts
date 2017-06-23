import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedule';
import { AssignmentPage } from '../assignment/assignment';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = AssignmentPage;

  constructor() {

  }
}
