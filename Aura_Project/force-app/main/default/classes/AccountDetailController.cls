public with sharing class AccountDetailController {
    @AuraEnabled
    public static List<AccountWrapper> getAccountProcessor(){
        return AccountProcessor.getAccountWrapper();
    }

}