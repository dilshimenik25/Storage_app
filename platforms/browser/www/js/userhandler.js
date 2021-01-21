function register(){
    var name =$("#name").val();
    var email =$("#email").val();
    var password =$("#password").val();
    var password2 =$("#password2").val();

    if(!name || !email || !password || !password2){
        alert("Please enter all the fields!");
    }
    else if(password==password2){
        var UserHandler={
        addUser: function(name, email, password){
        dbHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into User(email, name, password) values(?, ?, ?)",
                    [email, name, password],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Add User Error "+error.message);
                    }
                    );
                alert("Successfully Created!");
            },
            function(error){},
            function(){}
        );
    },
}
        
    }
    else{
        alert("Passwords doesn't match!");
        $("#password").val("");
        $("#password2").val("");
    }
}