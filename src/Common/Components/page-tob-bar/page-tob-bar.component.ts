import { Component, Input, OnInit,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';

@Component({
  selector: 'app-page-tob-bar',
  standalone: true,
  imports: [BreadcrumbModule,MatIcon,MatButtonModule,RouterLink],
  templateUrl: './page-tob-bar.component.html',
  styleUrl: './page-tob-bar.component.css'
})
export class PageTobBarComponent implements OnInit {

  @Input() ShowNew: boolean=false;
  @Input() NewRouterLinkUrl: string='';

  ngOnInit(): void {

  }

 

}

