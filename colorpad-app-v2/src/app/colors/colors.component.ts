import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.sass']
})
export class ColorsComponent implements OnInit {


  colors:string[] = []
  
  @Output() selectedColor:EventEmitter<string> =new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.colors = ["orange", "green", "red", "blue", "purple"]
    // this.subs.unsubscribe();
  }

  colorSelected(color:string){
    console.log("Color Selected: " + color)
    this.selectedColor.emit(color)
  }
}
