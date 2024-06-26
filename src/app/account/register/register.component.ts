import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  successmsg = false;
  error = '';
  year: number = new Date().getFullYear();
  formData = { firstName:  '', email: '', password: '' };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialisez tout ce qui doit être fait au moment de l'initialisation du composant
  }

  register() {
    this.authService.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error("Erreur lors de l'inscription :", error); // Afficher l'erreur complète
        this.error = "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."; // Afficher un message d'erreur
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
