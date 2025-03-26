import { Component, OnInit } from '@angular/core';
import { MainComponent } from './layouts/main/main.component';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'project-name';
  ngOnInit(): void {
    initFlowbite();
  }
}
