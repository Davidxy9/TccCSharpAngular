import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  idClient!: string | null;
  menuNavbar = [
    {
      route: '/clientes',
      label: 'Clientes',
      class: 'nav-link',
      style: {},
    },
    {
      route: '/cadastro',
      label: 'Cadastro',
      class: 'nav-link',
      style: {},
    },
  ];

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.activeRouter();
    // this.idClient = id;
  }

  activeRouter() {
    setTimeout(() => {
      const url = this.location.path();
      this.menuNavbar = this.menuNavbar.map((menu) => {
        if (menu.route === url) {
          return {
            label: menu.label,
            route: menu.route,
            class: `${menu.class} active`,
            style: { color: '#fff' },
          };
        } else {
          return menu;
        }
      });
    }, 500)
  }
}
