import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor(private router:Router) { }


   getPager(totalItems: number, currentPage: number, pageSize: number=10 ) {
        let totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < 1) { 
            currentPage = 1; 
            this.router.navigate(["/"+currentPage])
        } else if (currentPage > totalPages) { 
            currentPage = totalPages;
            this.router.navigate(["/"+currentPage]) 
        }
         
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
