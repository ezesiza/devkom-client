import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  // private userName: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.autoAuthUser();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    console.log(this.getCurrentUser());
  }

  onLogout() {
    this.authService.logout();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
