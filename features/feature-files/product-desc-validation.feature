@all
Feature: Validate product description

  @pass @ProductDescValidation
  Scenario: Validate product description - Success
    Given The app is launched and test data loaded from '/product-desc-validation/scenario1.json'
    Then Select the product
    Then Validate the product description as "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."