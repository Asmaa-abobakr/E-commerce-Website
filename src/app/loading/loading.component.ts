import { LoadingService } from './../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loader: any;
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loadingValueGlobal.subscribe((val)=> this.loader = val);
  }
}
