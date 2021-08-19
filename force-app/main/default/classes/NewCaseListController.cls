public class NewCaseListController {
    public List<Case> getNewCases(){
        return [select id,CaseNumber from case where status='New' ];
    }
}