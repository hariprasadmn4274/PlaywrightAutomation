# BEGIN: AUTOMATION
write this scenario only in features\a)traceability.feature file
Dont create a separate file for the scenario
Dont add any tags to the scenario
write the methods in pageObjects_ts\traceability_pageobjects.ts
Reusable methods are kept in pageObjects_ts\common_function_pageobjects.ts
Dont write the locators directly in pageobjects 
write actions in features\step_definations\udoc\actions.ts
write assertions in features\step_definations\udoc\assertions.ts
use locators from support_ts\fixtures\homepage_selectors.json
use data from support_ts\data\testdata.json
Also run my test run cucumber:local
# END: AUTOMATION