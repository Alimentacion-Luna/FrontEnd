import {Component} from '@angular/core';
import {account} from '../../../appwrite';
import {Router} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loggedInUser: any = null;

  constructor(private router: Router, private funcs: FuncsService) {
    /*
    funcs.getLoggedInUser().then(
      res => {
        if (res == null)
          this.router.navigate(['/login'])

        this.loggedInUser = res;
      },
    );*/
  }

  async logout(): Promise<void> {
    await account.deleteSession('current');
    this.router.navigate(['/login'])
  }
}
