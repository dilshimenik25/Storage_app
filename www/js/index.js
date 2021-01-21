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
function register(){
    var name =$("#username").val();
    var email =$("#email").val();
    var pasw =$("#password").val();
    var pasw2 =$("password2").val();

    if(!name || !email || !pasw || !pasw2){
        alert("Please enter all the fields!");
    }
    else if(pasw==pasw2){
        dbHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "INSERT INTO USERS VALUES('"+email+"','"+ name+"','"+ pasw+"')",[],                    
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
        
    }
    else{
        alert(" Please Enter Correct Passwords!");
        $("#password").val("");
        $("#password2").val("");
    }
}

function add(){
    var st =$("#txt_st").val();
    var sm =$("#txt_sm").val();
    var date =$("#txt_date").val();
    var time =$("#txt_time").val();
    var sf =$("#txt_sf").val();
    var price =$("#txt_price").val();
	var note =$("#txt_note").val();
     var rn =$("#txt_rn").val();


    if(!st){
        alert("Please enter Storage type!");
    }
	
    else if(!sm){
    	alert("Please enter Dimensions in square meters!");
    }
    else if(!date){
    	alert("Please enter Date!");
    }
	 else if(!time){
    	alert("Please enter Time!");
    }
    else if(!price){
    	alert("Please enter Price!");
    }
	else if(!rn){
    	alert("Please enter Reporter Name!");
    }
    else{
    	var c = confirm("Storage type: "+st+"\n"+"Dimensions in square meters : "+sm+"\n"+" Date: "+date+"\n"+" Time: "+time+"\n"+"Reporter Name: "+rn+"\n"+"Monthly rent price: "+price);
    	if(c==true){
        DBHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "INSERT INTO ACTIVITY (Storage_type, square_meters, DATE, TIME,Storage_features,Monthly_rent_price,Notes,Reporter_Name) VALUES('"+st+"','"+ sm+"','"+ date+"','"+time+"','"+sf+"','"+price+"','"+note+"','"+rn+"')",[],                    
                    function(tx, results){},
                    function(tx, error){
                        console.log("Add Storage_space Error "+error.message);
                    }
                    );
                alert("Data Added Successfully!");
            },
            function(error){},
            function(){}
        );
    }
}
}
var currentActivity={
	id:-1,
	rep:"",
}
function view(){
	dbHandler.db.readTransaction(
         	function(tx){
                tx.executeSql(
                    "SELECT * FROM ACTIVITY",[],
                    function(tx, results){
                    	var length = results.rows.length;
                    	var lstActivity =$("#lstActivity");
                    	lstActivity.empty();
						for (var i = 0; i < length; i++) {
							var item = results.rows.item(i);
							var a =$("<a />");
							var h3id =$("<h3 />").text("Activity ID: ");
							var h3name =$("<h3 />").text("Activity Name: ");
							var h4date =$("<h4 />").text("Activity Date: ");
							var h4vname =$("<h4 />").text("Volunteer Name: ");
							var ploc =$("<p />").text("Location: ");
							var ptime =$("<p />").text("Activity Time: ");
							var preport =$("<p />").text("Report: ");
							var spanActivityId =$("<span />").text(item.ACTIVITY_ID);
							spanActivityId.attr("name","activityId");
							var spanActivityName =$("<span />").text(item.ACTIVITY_NAME);
							spanActivityName.attr("name","activityName");
							var spanActivityDate =$("<span />").text(item.ACTIVITY_DATE);
							spanActivityDate.attr("name","activityDate");
							var spanActivityVName =$("<span />").text(item.ACTIVITY_VOL_NAME);
							spanActivityVName.attr("name","activityVName");
							var spanActivityLocation =$("<span />").text(item.ACTIVITY_LOCATION);
							spanActivityLocation.attr("name","activityLocation");
							var spanActivityTime =$("<span />").text(item.ACTIVITY_TIME);
							spanActivityTime.attr("name","activityTime");
							var spanReport =$("<span />").text(item.REPORT);
							spanReport.attr("name","report");
							h3id.append(spanActivityId);
							h3name.append(spanActivityName);
							h4date.append(spanActivityDate);
							h4vname.append(spanActivityVName);
							ploc.append(spanActivityLocation);
							ptime.append(spanActivityTime);
							preport.append(spanReport);
							a.append(h3id);
							a.append(h3name);
							a.append(h4date);
							a.append(h4vname);
							a.append(ploc);
							a.append(ptime);
							a.append(preport);
							var li =$("<li />");
							li.append(a);
							lstActivity.append(li);
						}
						lstActivity.listview("refresh");
						lstActivity.on("tap", "li", function(){
							currentActivity.id=$(this).find("[name='activityId']").text();
							currentActivity.rep=$(this).find("[name='report']").text();
							$("#activityReportDelete").popup("open");
						});
												
                    },
                function(tx, error){
                    console.log("Select Storage_space Error "+error.message);
                }
            );
            },
        );
}
$(document).on("pagebeforeshow", "#view", function(){
	view();
});

$(document).on("pagebeforeshow", "#noteDialog", function(){
	$("#txt_Notes").val(currentActivity.rep);
});

function updatenotes(){
	var nwnt=$("#txt_Notes").val();
	dbHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "UPDATE ACTIVITY SET NOTES = '"+nwnt+"' WHERE ACTIVITY_ID = "+currentActivity.id+";",[],                    
                    function(tx, results){},
                    function(tx, error){
                        console.log("Add Note Error "+error.message);
                    }
                    );
                alert("Note Updated!");
            },
            function(error){},
            function(){}
        );
	$("#noteDialog").dialog("close");
}
function deleteevent(){
	var c = confirm("Are You Sure You Want to Remove this Storage Type")
	if(c==true){
		dbHandler.db.transaction(
	            function(tx){
	                tx.executeSql(
	                    "DELETE FROM ACTIVITY WHERE ACTIVITY_ID = "+currentActivity.id+";",[],                    
	                    function(tx, results){},
	                    function(tx, error){
	                        console.log("Delete Activity Error "+error.message);
	                    }
	                    );
	                alert("Successfully Deleted!");
	                viewActivity();
	            },
	            function(error){},
	            function(){}
	        );
	}
}


