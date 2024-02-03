@test
Feature: Binge WebLarge
  I want to verify language drawer functionality
  Scenario: Opening the binge app
    Given I open Binge WebLarge 
    When I see language drawer on frist lanuch
    Then I see marketing drawer after reload the app
