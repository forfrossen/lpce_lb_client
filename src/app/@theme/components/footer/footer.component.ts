import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `<span class="created-by">Parker Hannifin - LPCE - Nussdorf {{ datum | date: "yyyy" }}</span>`,
})
export class FooterComponent {
	public datum = new Date();
}
 