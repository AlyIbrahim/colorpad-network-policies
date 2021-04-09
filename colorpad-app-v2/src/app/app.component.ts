import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ships';
  currentColor="black"

  updateColor(color:string){
    this.currentColor = color
    console.log("Parent captured selected color:" + this.currentColor)
  }

}
