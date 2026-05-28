import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dwsc-dashboard',

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './dwsc-dashboard.html',
  styleUrl: './dwsc-dashboard.css'
})

export class DwscDashboard {
}