import { Component, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  private platform = inject(Platform);
  private storage = inject(Storage);

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready!');
      // Tema ayarını uygula
      const darkMode = localStorage.getItem('darkMode') === 'true';
      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      this.storage.create().then(() => {
        console.log('Storage created!');
      }).catch(err => {
        console.error('Storage create error:', err);
      });
    }).catch(err => {
      console.error('Platform ready error:', err);
    });
  }
}
