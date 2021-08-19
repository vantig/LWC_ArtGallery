public class AccountUtility {
    
    public static void viewAnnualRevenue(){
        List<Account>accountsList=[select name ,AnnualRevenue from account];
            for(Account acc:accountsList){
             system.debug(acc.Name+':'+acc.AnnualRevenue);
            }
    }
}