import { Component, Input, OnInit } from '@angular/core';
import { ColorService } from '../color.service'
import { interval, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  @Input() selectedColor:string = ""

  row = 5
  col = 5
  board: number[][] = [];
  randomSpeed = [60, 125, 250, 500, 1000, 2000, 4000]
  randomIndex = 3
  colors = ["orange", "green", "red", "blue", "purple"]
  squares: string[] = Array(this.row * this.col).fill("yellow");

  interval = interval(this.randomSpeed[this.randomIndex]);
  subs: Subscription = new Subscription;

  // static boardCount:number = 0;
  private boardId:string = ""
  
  constructor(private colorService:ColorService) {
  }

  ngOnInit(): void {

    this.reset()
    this.boardId = uuidv4()
    // this.boardId = BoardComponent.boardCount
    // BoardComponent.boardCount +=1
    // console.log(this.boardId, BoardComponent.boardCount)

  }

  reset(){
    this.squares = Array(this.row * this.col).fill("white")
  }

  changeColor(i:number, color:string){
    // console.log("changeColor")
    // console.log(this.selectedColor)
    // console.log(i, color)
    this.colorService.color(this.boardId, i, color).subscribe(
      (data) => {
        console.log(data.status)
        if (data.status == 200){
          this.squares[i] = color
        }
      },
      (error) => {
        this.squares[i] = "black"
      }
    )
  }

  randomize(){
    console.log("Randomize Clicked")
    this.interval = interval(this.randomSpeed[this.randomIndex])

    this.subs = this.interval.subscribe((val: any) => {
      let index = Math.floor(Math.random() * 25)
      let color = this.colors[Math.floor(Math.random() * 5)]
      this.changeColor(index,color)
      // console.log(index, color)
    });
  }

  resetRandom(){
    this.subs.unsubscribe()
    }

  speedUp(){
    
    if (this.randomIndex>0){
      this.randomIndex--
      console.log(this.randomSpeed[this.randomIndex])
      this.resetRandom()
      this.randomize()
    }

  }

  speedDown(){
    if (this.randomIndex<this.randomSpeed.length){
      this.randomIndex++
      console.log(this.randomSpeed[this.randomIndex])
      this.resetRandom()
      this.randomize()
    }
  }

}
