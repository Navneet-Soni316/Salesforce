({
    getPagination: function(component, event) {
      let result = component.get("v.AllRecords");
      component.set("v.totalRecords", result.length);
      let pageNumber = component.get("v.pageNumber");
      let pageSize = component.get("v.pageSize");
      let totalRecord = component.get("v.totalRecords");
      component.set("v.totalPages", Math.ceil(totalRecord / pageSize));
      component.set("v.recordStart", pageSize * (pageNumber - 1));
      let recordStart = component.get("v.recordStart");
      component.set(
        "v.recordEnd",
        Math.min(totalRecord, recordStart + (pageSize - 1))
      );
      let recordEnd = component.get("v.recordEnd");
      component.set("v.UiData", result.slice(recordStart, recordEnd + 1));
    },

    searchRecordByKeys: function(result, fields, searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      let filteredList = result.filter(Object => {
        let flag = false;
        for (let i = 0; i < fields.length; i++) {
          if ( Object["acc"][fields[i]] && Object["acc"][fields[i]].toString().toLowerCase().includes(searchTerm)) {
            flag = true;
              break;
          }
        }
        return flag;
      });
      return filteredList;
    },

    sortByField: function(field, isDescending) {
      return function(a, b) {
        const valueA = String(a.acc[field]).toLowerCase();
        const valueB = String(b.acc[field]).toLowerCase();
        const comparison = valueA.localeCompare(valueB);
        return isDescending ? -comparison : comparison;
      };
    },

    searchPagination: function(component, searchResult) {
      let pageSize = component.get("v.pageSize");
      component.set("v.totalRecords", searchResult.length);
      let totalRecord = component.get("v.totalRecords");
      let totalPages = Math.ceil(totalRecord / pageSize);
      component.set("v.totalPages", totalPages);
      component.set("v.filteredResult", searchResult);
      component.set("v.UiData", searchResult.slice(0, pageSize));
      component.set("v.pageNumber", 1);
    }
  });
