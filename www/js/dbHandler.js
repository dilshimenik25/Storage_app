var dbHandler = {
    db : null,
    createDatabase : function(){
        this.db = window.openDatabase(
            "mystorage.db",
            "1.0",
            "mystorage Database",
            1000000);
    
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
                     tx.executeSql(
                "CREATE TABLE IF NOT EXISTS ACTIVITY(STORAGE_SPACE_ID INTEGER PRIMARY KEY AUTOINCREMENT, Storage_type TEXT, square_meters TEXT,DATE TEXT,TIME TEXT, Storage_features TEXT, Monthly_rent_price TEXT,Notes TEXT,Reporter_Name TEXT)",
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