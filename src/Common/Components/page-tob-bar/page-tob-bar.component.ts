import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-page-tob-bar',
  standalone: true,
  imports: [BreadcrumbModule,MatIcon,MatButtonModule],
  templateUrl: './page-tob-bar.component.html',
  styleUrl: './page-tob-bar.component.css'
})
export class PageTobBarComponent implements OnInit {


  ngOnInit(): void {

  }

 

}

