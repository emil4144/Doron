import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import {GetDataService} from '../services/get-data.service';
import {PagerService} from '../services/pager.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private totalItems:any;
  private pager:any = {};
  private allData:any;
  private pagedItems:any
  sorting="ASC";
  sortable="ID";

   ID = new FormControl('');
   Instagram = new FormControl('');
   Facebook = new FormControl('');
   Twitter = new FormControl('');
   Blog = new FormControl('');
   Youtube = new FormControl('');
   Pinterest = new FormControl('');

 
  constructor(private getDataService:GetDataService, 
    private pagerService:PagerService,
    private router:Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.FilterData() 
    
  }
  async ChangeUrl(Pag:number){
  
   await this.router.navigate(["/"+Pag])
    this.FilterData() 
  }

  SetPage(page:number){   
   
    this.router.navigate(["/"+page])
    this.pager=this.pagerService.getPager(this.totalItems, page)
   

  }

  FilterData(){ 
    let address=this.router.url
    let b;
    if( isNaN(parseInt(address.replace("/",""))) || parseInt(address.replace("/",""))==0){
      b=1
    }
    else{
      b=parseInt(address.replace("/",""))
    }
    let fd={
      id:this.ID.value,
      instagram:this.Instagram.value,
      facebook:this.Facebook.value,
      twitter:this.Twitter.value,
      blog:this.Blog.value,
      youtube:this.Youtube.value,
      pinterest:this.Pinterest.value,
      nid:b,
      srttype:this.sorting,
      sortcol:this.sortable
    }
    this.getDataService.Filter(fd).subscribe(
      (data:any)=>{
        console.log(data)
        this.totalItems= data.dat.Quantity[0].TOTAL;      
        this.allData=data.dat.tdata
        this.SetPage(b);
      }
    )
  }

  SortData(a){
    this.sortable=a;
    if(this.sorting=="ASC")
      {this.sorting="DESC"}
    else{this.sorting="ASC"} 
    this.FilterData()
  } 

    convertk(n) {
    if (n / 1000 >= 1) {
      return (Math.floor(n/100)/10 + 'k');
    } else if (n === 0) {
      return '---';
    } else {
      return n;
    }
  }
}
