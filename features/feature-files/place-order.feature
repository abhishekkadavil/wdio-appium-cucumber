@all
Feature: Place order

  @pass
  Scenario: Place order flow - Success
    Given The app is launched and test data loaded from '/place-order/scenario1.json'
    Then Select the product
    Then Add product to the cart
    Then navigate to the cart
    Then Proceed to checkout
    Then login
    Then Provide shipment address and proceed to payment page
    Then Provide payment info and proceed to review order
    Then Place order
    Then Order should be placed successfully with message 'Checkout Complete'

  @fail
  Scenario: Place order flow - Assertion fail
    Given The app is launched and test data loaded from '/place-order/scenario2.json'
    Then Select the product
    Then Add product to the cart
    Then navigate to the cart
    Then Proceed to checkout
    Then login
    Then Provide shipment address and proceed to payment page
    Then Provide payment info and proceed to review order
    Then Place order
    Then Order should be placed successfully with message 'Checkout Complete1'