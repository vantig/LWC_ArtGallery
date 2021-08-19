public class AccountHandler {
    
    
    public static void insertAccount(Integer numberofAccounts){
        
        
        Integer n = 1;
        
        
        List<Account> addAccounts=new List<Account>();
        
        
        while(n <= numberofAccounts){
            
            
            
            
            
            
            
            
            Account tempaccount=new Account();
            
            
            tempaccount.Name='Acme Inc '+ n;
            
            
            tempaccount.AccountNumber='A000'+ n;
            
            
            addAccounts.add(tempaccount);
            
            
            
            
            
            n++;
            
            
        }
        
        
        insert addAccounts;
        
        
        
        
        
    }
    
    
}