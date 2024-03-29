import { Component, OnInit } from '@angular/core'
import { UserService } from '../core/user/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content?: string

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
