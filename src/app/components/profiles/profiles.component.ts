import { Component, OnInit } from "@angular/core";
import { ProfileData } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  templateUrl: "profiles.component.html",
  styleUrls: ["./profiles.component.css"],
})
export class ProfilesComponent implements OnInit {
  loading: true;
  profiles: ProfileData[] = [];
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getAllProfiles().subscribe((profile: ProfileData[]) => {
      console.log(profile);
      this.profiles = profile['foundProfile']
    })
  }
}
