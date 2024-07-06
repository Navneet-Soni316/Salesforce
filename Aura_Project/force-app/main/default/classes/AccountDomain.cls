public with sharing class AccountDomain {
    public static List<Account> getAccount() {
        return [
                SELECT
                        Name,
                        Id,
                        AccountNumber,
                        Industry,
                        Phone
                FROM
                        Account
                LIMIT
                        30
               ];
    }

}