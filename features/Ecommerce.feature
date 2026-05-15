Feature: Ecommerce application

  Scenario: In an Ecommerce application placing an order
    Given I login into application with valid credentials "hariprasadreddy1@gmail.com" and "Hariprasad1"
    When I will add "ADIDAS ORIGINAL" into cart
    When I enter all the required details and place the order
    Then I verify placed order in order history page
