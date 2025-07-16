import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  settingsOpen = false;
  darkMode = false;

  constructor() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  openSettings() {
    this.settingsOpen = true;
  }

  closeSettings() {
    this.settingsOpen = false;
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  ionViewWillEnter() {
    this.settingsOpen = false;
  }

  ngOnInit() {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
} 