import { setWorldConstructor, World } from '@cucumber/cucumber';
import { CartPage } from '../page-objects/cart-page.ts';
import { HomePage } from '../page-objects/home-page.ts';
import { LoginPage } from '../page-objects/login-page.ts';
import { OrderCompletePage } from '../page-objects/order-complete-page.ts';
import { OrderReviewPage } from '../page-objects/order-review-page.ts';
import { PaymentPage } from '../page-objects/payment-page.ts';
import { ProductDetailsPage } from '../page-objects/product-detail-page.ts';
import { ShippingAddressPage } from '../page-objects/shipping-address-page.ts';

import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ScenarioContext extends World {
  public testData: any;
  public runtimeData: Record<string, any>;
  public interactionHelper: InteractionHelper;

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
    this.interactionHelper = new InteractionHelper(); // unique per scenario

    this.pages = {
      cartPage: new CartPage(this.interactionHelper),
      homePage: new HomePage(this.interactionHelper),
      loginPage: new LoginPage(this.interactionHelper),
      orderCompletePage: new OrderCompletePage(this.interactionHelper),
      orderReviewPage: new OrderReviewPage(this.interactionHelper),
      paymentPage: new PaymentPage(this.interactionHelper),
      productDetailsPage: new ProductDetailsPage(this.interactionHelper),
      shippingAddressPage: new ShippingAddressPage(this.interactionHelper),
    };
  }
}

setWorldConstructor(ScenarioContext);
