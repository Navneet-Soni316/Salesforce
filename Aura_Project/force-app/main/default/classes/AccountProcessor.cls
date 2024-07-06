public with sharing class AccountProcessor {
    public static List<AccountWrapper> getAccountWrapper(){
       List<AccountWrapper> accWrapperList = new  List<AccountWrapper>();
        for(Account acc : AccountDomain.getAccount()) {
            accWrapperList.add(new AccountWrapper(acc) );
        }
        return accWrapperList;
    }

}