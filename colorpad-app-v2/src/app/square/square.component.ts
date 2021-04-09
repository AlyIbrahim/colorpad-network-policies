import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.sass']
})
export class SquareComponent implements OnInit {

  @Input() buttonColor:string = "blue";
  @Input() value:string = this.buttonColor
  constructor() { }

  ngOnInit(): void {
  }
}
