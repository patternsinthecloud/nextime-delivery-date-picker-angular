import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

interface ShippingDetails {
  date: string;
  shippingLine: {
    name: string;
    nextOrderDate: string;
    nextShippingDate: string;
    shippingCarrier: number;
    shippingMethod: string;
    total: number;
  };
}

interface CustomEvent extends Event {
  detail: ShippingDetails;
}

interface Address {
  name?: string;
  street: string;
  street2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Item {
  id: number;
  productId: string;
  qty: number;
  regularPrice: number;
  salePrice: number;
}

interface Order {
  OrderId: number;
  shippingAddress: object;
  items: Item[];
  shippingOptionFilters: {
    minDeliveryDate: string;
    maxDeliveryDate: string;
  };
}

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent {
  siteId: number | undefined;
  returnedObject?: ShippingDetails;
  showJson = false;

  products: {
    [number: number]: {
      name: string;
      image: string;
    };
  } = {
    571386: {
      name: 'Ritual Greens',
      image: 'assets/images/image.png',
    },
    840998: {
      name: 'From the Earth',
      image: 'assets/images/image3.png',
    },
    840999: {
      name: 'Revive',
      image: 'assets/images/image4.png',
    },
  };

  addresses: Address[] = [
    {
      name: '5193 Old Post Rd',
      street: '5193 Old Post Rd',
      city: 'Charlestown',
      state: 'RI',
      postalCode: '02813',
      country: 'US',
    },
    {
      name: 'Local Pickup at Farm Fresh Sims Market',
      street: '10 Sims Ave',
      city: 'Providence',
      state: 'RI',
      postalCode: '02909',
      country: 'US',
    },
    {
      name: 'Local Pickup at Wayland Winter Market',
      street: '10 Sims Ave',
      city: 'Providence',
      state: 'RI',
      postalCode: '02909',
      country: 'US',
    },
  ];

  orders: Order[] = [
    {
      OrderId: 1001,
      shippingAddress: {},
      items: [
        {
          id: 571386,
          productId: '461150',
          qty: 1,
          regularPrice: 11.99,
          salePrice: 11.99,
        },
        {
          id: 840998,
          productId: '426480',
          qty: 1,
          regularPrice: 20.0,
          salePrice: 20.0,
        },
        {
          id: 840999,
          productId: '4026',
          qty: 1,
          regularPrice: 10.49,
          salePrice: 10.49,
        },
      ],
      shippingOptionFilters: {
        minDeliveryDate: '2024-02-20',
        maxDeliveryDate: '2024-03-20',
      },
    },
    {
      OrderId: 1002,
      shippingAddress: {},
      items: [
        {
          id: 840999,
          productId: '4026',
          qty: 1,
          regularPrice: 10.49,
          salePrice: 10.49,
        },
      ],
      shippingOptionFilters: {
        minDeliveryDate: '2024-02-20',
        maxDeliveryDate: '2024-03-20',
      },
    },
  ];

  deliveryDates = [
    '2024-02-22',
    '2024-02-25',
    '2024-02-27',
    '2024-02-28',
    '2024-02-29',
  ];

  selectedAddress: Address | undefined;
  selectedOrder: Order | undefined;
  selectedDeliveryDate: string | undefined;
  selectedDeliveryDate2: string | undefined;
  selectedDelivery: string | undefined;
  showOrderDate: string | undefined;

  handleSelectDeliveryChange(evt: Event) {
    console.log((evt.target as HTMLSelectElement).value);
    if (
      this.selectedDeliveryDate2 !== (evt.target as HTMLSelectElement).value
    ) {
      this.selectedDeliveryDate2 = (evt.target as HTMLSelectElement).value;
    }
  }

  getOlderDay(date: string | undefined, olderDay: number) {
    if (!date) return '';
    const newDate = new Date(
      new Date().setDate(new Date(date).getDate() - olderDay)
    );
    return newDate;
  }

  handleDateUpdate(evt: CustomEvent | Event) {
    if (evt instanceof CustomEvent) {
      this.returnedObject = evt.detail;

      if (evt.detail.shippingLine?.nextOrderDate) {
        const nextDate = evt.detail.shippingLine.nextOrderDate;
        const newDateFormated = moment(nextDate).format('YYYY-MM-DD');

        if (!this.deliveryDates.includes(newDateFormated.toString())) {
          this.deliveryDates.push(newDateFormated);
        }

        this.selectedDeliveryDate = moment(evt.detail.date).format(
          'YYYY-MM-DD'
        );
        this.showOrderDate = this.selectedDeliveryDate;
      }
      this.selectedDelivery = evt.detail?.shippingLine?.name;
    }
  }

  toggleJson() {
    this.showJson = !this.showJson;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.siteId = +params.get('id')!;
    });

    this.selectedAddress = this.addresses[0];
    this.selectedOrder = this.orders[0];
    this.selectedDeliveryDate = this.deliveryDates[0];
    this.selectedDeliveryDate2 = this.deliveryDates[0];
  }
}
