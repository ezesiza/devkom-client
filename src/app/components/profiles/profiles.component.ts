import { Component, OnInit } from "@angular/core";
import { Profile } from '../profile/edit-profile/profile.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  templateUrl: "profiles.component.html",
  styleUrls: ["./profiles.component.css"],
})
export class ProfilesComponent implements OnInit {
  loading: true;
  profiles: Profile[] = [];
  constructor(private profileService:ProfileService) {}

  ngOnInit() {
    this.profileService.getAllProfiles().subscribe((profile: Profile[]) => {
      console.log(profile);
      this.profiles = [...profile['foundProfile']]
    })
  }
}
