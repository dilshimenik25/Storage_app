function register(){
    var name =$("#username").val();
    var email =$("#email").val();
    var password =$("#password").val();
    var password2 =$("#password2").val();

    if(!name || !email || !password || !password2){
        alert("Please enter all the fields!");
    }
    else if(password==password2){
        var userhandler={
        addUser: function(name, email, password){
        dbHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into USERS(email, name, password) values(?, ?, ?)",
                    [email, name, password],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Add USERS Error "+error.message);
                    }
                    );
                alert("Successfully Added!");
            },
            function(error){},
            function(){}
        );
    },
}
        
    }
    else{
        alert("Pleas Enter Correct Passwords !");
        $("#password").val("");
        $("#password2").val("");
    }
}