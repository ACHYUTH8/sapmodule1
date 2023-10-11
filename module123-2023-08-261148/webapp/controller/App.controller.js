sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.app.module123.controller.App", {
            onInit: function () {
                this.fnLoadProductsData();
                var oJsonModel = this.getOwnerComponent().getModel("myLocalModel");
                oJsonModel.setProperty("/sSelectedName", "");
                oJsonModel.setProperty("/sSelectedRating", "");
            },
            fnLoadProductsData: function(){
                var oDataModel = this.getOwnerComponent().getModel("myODataService");
                var oJsonModel = this.getOwnerComponent().getModel("myLocalModel");
                oDataModel.read("/Products",{
                    success:function(oData, response){
                        oJsonModel.setProperty("/aProductsList",  oData.results);
                    },
                    error: function(err){
                        var errmsg = err;
                    }
                });
            },
            fnLoadTabeData: function(){
                var oDataModel = this.getOwnerComponent().getModel("myODataService");
                var oJsonModel = this.getOwnerComponent().getModel("myLocalModel");
                var sSelectedName = oJsonModel.getProperty("/sSelectedName");
                var sSelectedRating = oJsonModel.getProperty("/sSelectedRating");
                var aFilters = [];
                if(sSelectedName !== "" && sSelectedRating !== ""){
                    aFilters.push(new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.EQ, sSelectedName));
                    aFilters.push(new sap.ui.model.Filter("Rating", sap.ui.model.FilterOperator.EQ, sSelectedRating));
                }
                oDataModel.read("/Products",{
                    filters: aFilters,
                    async : true,
                    success:function(oData, response){
                        oJsonModel.setProperty("/aProductsData",  oData.results);
                    },
                    error: function(err){
                        MessageToast.show(err.statusText)
                    }
                });
                
            },
            
        });
    });
