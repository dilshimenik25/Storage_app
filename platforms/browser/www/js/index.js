$(document).on("ready", function(){
    dbHandler.createDatabase();
});
function login(){
	var email =$("#email").val();
	var pwd =$("#password").val();
	if (!email || !pwd) {
		alert("Please enter Login details!")
	}
	else{
    	dbHandler.db.readTransaction(
         	function(tx){
                tx.executeSql(
                    "SELECT * FROM USERS WHERE EMAIL ='"+email+"'",[],
                    function(tx, results){
                    	var length = results.rows.length;
						for (var i = 0; i < length; i++) {
							var item = results.rows.item(i);
						}						
						if(pwd==item.PASSWORD){
							alert("Successfully");
							window.location = "welcome.html";
						}
						else{
							alert("Incorrect Login Details");
					};
                    },
                function(tx, error){
                    console.log("Select User Error "+error.message);
                }
            );
            },
        );
    }
}


