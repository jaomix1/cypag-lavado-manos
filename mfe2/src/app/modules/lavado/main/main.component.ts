import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../components/base.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { super() }

  ngOnInit(): void {
  }

}
