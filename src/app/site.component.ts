import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
})
export class SiteComponent {
  title = 'qpilot-delivery-date-angular';
  siteId: number | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.route.paramMap.subscribe((params) => {
      this.siteId = +params.get('id')!;
    });
    console.log(this.siteId);
  }
}
