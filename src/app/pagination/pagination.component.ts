import {Component, OnInit, EventEmitter, Output, Input, style} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent {



  @Input()
  total: number = 0;

  @Input()
  page: number = 0;

  @Output()
  goTo: EventEmitter<number> = new EventEmitter<number>();

  from: number = 1;
  to: number;

  constructor() { }

  totalPages() {  // 페이지 수
    return Math.ceil(this.total / 10);
  }

  prevPage() {
    return Math.max(1, this.page-9 ); // 페이지 이전으로 //10페이지씩
    // return Math.max(1, this.page ); // 페이지 이전으로
  }

  pageFirst() {
    return Math.max(1, -1); // 페이지 처음으로 (0페이지 부터 시작 -> 화면은 1로 ...-1해야함)
  }


  pageLast() {
    return Math.min(this.totalPages(),this.totalPages()); //페이지 마지막으로
  }


  nextPage() {  //10페이지씩 페이지 다음

    return Math.min(this.totalPages(),this.page + 11);
    // return Math.min(this.totalPages(),this.page + 2);

  }

  pageClicked(page: number) {
    this.goTo.next(page);
  }

  pagesRange() {

    if (this.totalPages() <= 10) {  // 10페이지 보다 작을 경우, 다 보이도록
      return this.range(this.from, this.totalPages() + 1);
    } else {
      // more than 10 total pages so calculate start and end pages
      if ( this.page <= 6) {
        this.from = 1;
        this.to = 10;
        return this.range(this.from, this.to);
      } else if (this.page + 4 >= this.totalPages() + 1) {
        this.from = this.totalPages() - 9;
        this.to = this.totalPages() + 1;
        return this.range(this.from, this.to);
      } else {
        this.from = this.page - 5;
        this.to = this.page + 4;
        return this.range(this.from, this.to);
      }
    }

  }

  range(start, stop, step=1){

    if (!stop) {
      start=0;
      stop = start;
    }
    return Array.from(new Array(Number((stop-start)/step)), (x,i) => start+ i*step)
  }

  }
