import { setWorldConstructor, World } from '@cucumber/cucumber';
import { CartPage } from '../page-objects/cart-page.ts';
import { HomePage } from '../page-objects/home-page.ts';
import { LoginPage } from '../page-objects/login-page.ts';
import { OrderCompletePage } from '../page-objects/order-complete-page.ts';
import { OrderReviewPage } from '../page-objects/order-review-page.ts';
import { PaymentPage } from '../page-objects/payment-page.ts';
import { ProductDetailsPage } from '../page-objects/product-detail-page.ts';
import { ShippingAddressPage } from '../page-objects/shipping-address-page.ts';

export class ScenarioContext extends World {
  public testData: any;
  public runtimeData: Record<string, any>;

  // Attach page objects per scenario
  public pages: {
    cartPage: CartPage;
    homePage: HomePage;
    loginPage: LoginPage;
    orderCompletePage: OrderCompletePage;
    orderReviewPage: OrderReviewPage;
    paymentPage: PaymentPage;
    productDetailsPage: ProductDetailsPage;
    shippingAddressPage: ShippingAddressPage;
  };

  constructor(options: any) {
    super(options);
    this.testData = {};
    this.runtimeData = {}; // This will store data like order number, session token etc.

    this.pages = {
      cartPage: new CartPage(),
      homePage: new HomePage(),
      loginPage: new LoginPage(),
      orderCompletePage: new OrderCompletePage(),
      orderReviewPage: new OrderReviewPage(),
      paymentPage: new PaymentPage(),
      productDetailsPage: new ProductDetailsPage(),
      shippingAddressPage: new ShippingAddressPage(),
    };
  }
}

setWorldConstructor(ScenarioContext);
