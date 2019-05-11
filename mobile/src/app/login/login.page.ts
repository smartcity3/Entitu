import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication.service';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private _auth: AuthenticationService, private _loading: LoadingController,
              private _toast: ToastController, public _navCtrl: NavController) {
  }

  ngOnInit() {
  }

  async login() {
    const {form} = this;
    if (form.valid) {
      const email = form.get('email').value;
      const passw = form.get('password').value;
      const loader = await this._loading.create({message: 'Please wait...'});
      await loader.present();
      await this._auth.login(email, passw)
        .catch(async err => {
          console.error(err);
          const toast = await this._toast.create({
            message: 'Something went wrong!',
            duration: 3000
          });
          toast.present();
        });
      await loader.dismiss();
      this._navCtrl.navigateForward('/home');
    }
  }

}
