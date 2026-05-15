Feature: Ecommerce application

  Scenario: Using hooks and Ecommerce application placing an order
    Given I login using hooks into application with valid credentials "hariprasadreddy1@gmail.com" and "Hariprasad1"
    When using hooks I will add "ADIDAS ORIGINAL" into cart
    When using hooks I enter all the required details and place the order
    Then using hooks I verify placed order in order history page
