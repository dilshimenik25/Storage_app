var dbHandler = {
    db : null,
    createDatabase : function(){
        this.db = window.openDatabase(
            "mystorage.db",
            "1.0",
            "mystorage Database",
            2000000);
    
    this.db.transaction(
        function(tx){
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS USERS(EMAIL TEXT PRIMARY KEY, NAME TEXT, PASSWORD TEXT)",
                [],
                function(tx, result){},
                function(tx, error){
                    console.log("Error While Creating the Table: "+ error.message);
                }
                
            )

            
        },
        function(error){
            console.log("Transaction Error : "+ error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }

    );  
    }
}