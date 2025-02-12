import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {account} from '../../../appwrite';
import {Router} from '@angular/router';
import {FuncsService} from '../../services/funcs.service';
import {convertBrowserOptions} from '@angular-devkit/build-angular/src/builders/browser-esbuild';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private router: Router;

  constructor(private _router: Router, private funcs: FuncsService) {
    this.router = _router;
    funcs.getLoggedInUser().then(
      res => {
        if (res != null)
        this.router.navigate(['/home'])
      }
    );
  }

  async login(email: string, pass: string): Promise<void> {
    const p = document.getElementById("error");

    await account.createEmailPasswordSession(email, pass).then(
      res => {
        account.get().then(
          user => {
            this.router.navigate(['/home'])
          }
        );
      },
      error => {
        if (p != null)
          p.innerText = error.message
      }
    );
  }

  /*
  async register(name: string, email: string, pass: string): Promise<void> {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", pass);

    const p = document.getElementById("error");

    await account.create(ID.unique(), email, pass, name).then(
      (res) => console.log(res),
      (error: AppwriteException) => {
        console.log(error)
        if (p != null)
          p.innerText = error.message
      });
  }
  */
}
