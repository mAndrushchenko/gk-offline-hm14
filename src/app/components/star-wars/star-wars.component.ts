import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../../services/star-wars.service';
import { TStarShip } from '../../model/star-wars';

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.scss']
})
export class StarWarsComponent implements OnInit {
  filterValue = '';
  filterParam = '';
  filterAction = false;

  rawList: TStarShip[] = [];
  starShipList: TStarShip[] = [];

  constructor(private sw: StarWarsService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.starShipList = [];
    this.sw.getSWData().subscribe((data: any) => {
      data.results.forEach((ship: any) => {

        const newStarShip: TStarShip = {
          cargo_capacity: this.stringToNumber(ship.cargo_capacity, 10 ** 3),
          consumables: this.getConsumablesAmount(ship.consumables),
          cost_in_credits: this.stringToNumber(ship.cost_in_credits, 10 ** 6),
          crew: this.stringToNumber(ship.crew),
          length: this.stringToNumber(ship.length),
          max_atmosphering_speed: this.stringToNumber(ship.max_atmosphering_speed),
          name: ship.name,
          passengers: this.stringToNumber(ship.passengers)
        };

        this.rawList.push(newStarShip);
      });
      this.starShipList = [...this.rawList];
    });
  }

  priceToNumber(price: string): number | 'unknown' {
    const priceInNumber = Number(price);
    if (!isNaN(priceInNumber)) {
      return priceInNumber;
    } else {
      return 'unknown';
    }
  }

  stringToNumber(crewAmount: any, divideParam?: number): number | 'unknown' {
    crewAmount = crewAmount.split('').map((el: any) => {
      el = parseInt(el, 10);
      if (!isNaN(el)) {
        return el;
      }
    }).join('');
    if (!crewAmount.length) {
      return 'unknown';
    }
    return divideParam ? Number(crewAmount) / divideParam : Number(crewAmount);
  }

  getConsumablesAmount(consumables: string): [string, number] | ['unknown', 'unknown'] {
    const consArr = consumables.split(' ');
    const calcDays = (days: string, frame: number) => Number(days) * frame;

    if (/^days?$/.test(consArr[1])) {
      return [consumables, calcDays(consArr[0], 1)];
    } else if (/^weeks?$/.test(consArr[1])) {
      return [consumables, calcDays(consArr[0], 7)];
    } else if (/^months?$/.test(consArr[1])) {
      return [consumables, calcDays(consArr[0], 30)];
    } else if (/^years?$/.test(consArr[1])) {
      return [consumables, calcDays(consArr[0], 365)];
    } else {
      return ['unknown', 'unknown'];
    }
  }

  toggleFilter(active: boolean): void {
    this.filterAction = active;

    if (active && this.filterParam && this.filterValue) {
      this.useFilter(this.filterValue, this.filterParam);
    } else if (!active) {
      this.starShipList = [...this.rawList];
    }
  }

  onSelectValue(filterValue: string): void {
    this.filterValue = filterValue;
    this.onSelect();
  }

  onSelectFilter(filterParam: string): void {
    this.filterParam = filterParam;
    this.onSelect();
  }

  onSelect(): void {
    if (this.filterAction && this.filterParam && this.filterValue) {
      this.useFilter(this.filterValue, this.filterParam);
    }
  }

  sortParams(filterValue: keyof TStarShip, filterParam: string): void {
    this.starShipList.sort((a, b): number => {
      let prevValue;
      let nextValue;
      let param = 0;

      if (filterValue === 'consumables') {
        prevValue = a[filterValue][1] === 'unknown' ? 0 : a[filterValue][1];
        nextValue = b[filterValue][1] === 'unknown' ? 0 : b[filterValue][1];
      } else {
        prevValue = a[filterValue] === 'unknown' ? 0 : a[filterValue];
        nextValue = b[filterValue] === 'unknown' ? 0 : b[filterValue];
      }

      if (filterParam === 'from_top' && filterValue === 'name') {
        param = 1;
      } else if (filterParam === 'from_bottom' && filterValue === 'name') {
        param = -1;
      } else if (filterParam === 'from_top') {
        param = -1;
      } else if (filterParam === 'from_bottom') {
        param = 1;
      }

      if (prevValue > nextValue) {
        return param;
      } else if (prevValue < nextValue) {
        return -1 * param;
      } else {
        return 0;
      }
    });
  }

  useFilter(value: string, param: string): void {
    switch (value) {
      case 'name':
        this.sortParams(value, param);
        break;
      case 'cost_in_credits':
        this.sortParams(value, param);
        break;
      case 'max_atmosphering_speed':
        this.sortParams(value, param);
        break;
      case 'crew':
        this.sortParams(value, param);
        break;
      case 'passengers':
        this.sortParams(value, param);
        break;
      case 'length':
        this.sortParams(value, param);
        break;
      case 'cargo_capacity':
        this.sortParams(value, param);
        break;
      case 'consumables':
        this.sortParams(value, param);
        break;
    }
  }
}
