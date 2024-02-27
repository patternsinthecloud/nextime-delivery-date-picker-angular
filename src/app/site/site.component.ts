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
    minDeliveryDate?: string;
    maxDeliveryDate?: string;
  };
}

interface shippingData {
  [key: number]: {
    addresses: Address[];
    orders: Order[];
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

  mockData: shippingData = {
    8: {
      addresses: [
        {
          name: '10 Sims Ave',
          street: '10 Sims Ave',
          street2: null,
          city: 'Providence',
          state: 'RI',
          postalCode: '02909',
          country: 'US',
        },
        {
          name: '289 Buxton Street',

          street: '289 Buxton Street',
          city: 'North Smithfield',
          state: 'RI',
          country: 'US',
          postalCode: '06277',
        },
        {
          name: '8 Conifer Court',
          street: '8 Conifer Court',
          city: 'Coventry',
          state: 'RI',
          country: 'US',
          postalCode: '02816',
        },
      ],
      orders: [
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
      ],
    },
    4: {
      addresses: [
        {
          street: '2108 S Lamar Blvd',
          city: 'Austin',
          state: 'TX',
          country: 'US',
          postalCode: '78704',
          name: 'Lamar Blvd',
        },
      ],
      orders: [
        {
          OrderId: 641390,
          shippingAddress: {},
          items: [
            {
              id: 773779,
              productId: '11042',
              qty: 1,
              regularPrice: 81.0,
              salePrice: 76.95,
            },
            {
              id: 946054,
              productId: '11015',
              qty: 1,
              regularPrice: 13.99,
              salePrice: 13.29,
            },
          ],
          shippingOptionFilters: {},
        },
      ],
    },
  };

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
    946054: {
      name: 'From the Earth',
      image: 'assets/images/image3.png',
    },
    773779: {
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

  orderDates = [
    '2024-02-22',
    '2024-02-25',
    '2024-02-27',
    '2024-02-28',
    '2024-02-29',
  ];

  selectedAddress: Address | undefined;
  selectedOrder: Order | undefined;
  orderDate: string | undefined;
  selectedOrderDate: string | undefined;
  selectedDelivery: string | undefined;
  showOrderDate: string | undefined;
  deliveryDate: string | undefined;

  getOlderDay(date: string | undefined) {
    if (!date) return '';

    const newDate = moment.utc(date).subtract(1, 'd').format('dddd');

    return newDate;
  }

  handleDateUpdate(evt: CustomEvent | Event) {
    if (evt instanceof CustomEvent) {
      this.returnedObject = evt.detail;
      if (evt.detail.deliveryDate) {
        this.deliveryDate = moment
          .utc(evt.detail.deliveryDate)
          .format('YYYY-MM-DD');
      } else {
        this.deliveryDate = undefined;
      }
      this.selectedDelivery = evt.detail?.shippingLine?.name;

      if (evt.detail?.shippingLine?.nextOrderDate) {
        const newOrderDate = moment
          .utc(evt.detail.shippingLine.nextOrderDate)
          .format('YYYY-MM-DD');

        if (!this.orderDates.includes(newOrderDate.toString())) {
          this.orderDates.push(newOrderDate);
        }
        this.orderDate = newOrderDate;
      }
    }
  }

  toggleJson() {
    this.showJson = !this.showJson;
  }

  handleOrderDateChange(event: Event) {
    this.selectedOrderDate = (event.target as HTMLInputElement).value;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.siteId = +params.get('id')!;

      this.selectedAddress = this.mockData[this.siteId].addresses[0];
      this.selectedOrder = this.mockData[this.siteId].orders[0];
      this.orderDate = this.orderDates[0];
      this.selectedOrderDate = this.orderDate;
    });
  }
}
