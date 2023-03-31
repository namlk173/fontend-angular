import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() status: string = ""
  @Input() message: string = ""
  constructor() { }
  ngOnInit(): void { }
}
