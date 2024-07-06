public with sharing class AccountWrapper {
    @AuraEnabled
    public Account acc = new Account();
    public AccountWrapper(Account acc) {
        this.acc= acc;
    }

}