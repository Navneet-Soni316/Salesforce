({
    handleNext: function(component, event, helper) {
      let pageNumber = component.get("v.pageNumber");
      component.set("v.pageNumber", pageNumber + 1);
      helper.getPagination(component, helper);
    },
    handlePrev: function(component, event, helper) {
      let pageNumber = component.get("v.pageNumber");
      component.set("v.pageNumber", pageNumber - 1);
      helper.getPagination(component, helper);
    },
  
  
    doInit: function(component, event, helper) {
      let action = component.get("c.getAccountProcessor");
      action.setCallback(this, function(response) {
        let state = response.getState();
        if (state === "SUCCESS") {
          component.set("v.AllRecords", response.getReturnValue());
          helper.getPagination(component, helper);
        } else {
          alert(response.getError());
        }
      });
  
  
      $A.enqueueAction(action);
    },
  
  
    searchKeyChange: function(component, event, helper) {
      let result = component.get("v.AllRecords");
      let searchTerm = component.get("v.searchKeyword");
      let UIrecords = component.get("v.UiData");
      let fields = ["Id", "Name", "AccountNumber", "Industry", "Phone"];
      let searchResult = helper.searchRecordByKeys(result, fields, searchTerm);
      helper.searchPagination(component, searchResult);
    },
    handleSort: function(component, event, helper) {
      let sortOption = component.get("v.sortOption");
      let records = component.get("v.AllRecords");
      let isDescending = sortOption.endsWith("Desc");
      let fieldToSort = sortOption.replace("Asc", "").replace("Desc", "");
      records.sort(helper.sortByField(fieldToSort, isDescending));
      helper.searchPagination(component, records);
    },
  
  
    handleSortAfterSearch: function(component, event, helper) {
      let sortOption = component.get("v.sortOptionAfterSearch");
      let isDescending = sortOption.endsWith("Desc");
      let fieldToSort = sortOption.replace("Asc", "").replace("Desc", "");
      let searchResult = component.get("v.filteredResult");
      searchResult.sort(helper.sortByField(fieldToSort, isDescending));
      helper.searchPagination(component, searchResult);
    }
  });
  