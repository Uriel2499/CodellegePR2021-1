const { get } = require("node:http");

$(function(){
    $.ajax({
        type: "GET",
        url: "/examenes/calif/student-123",
        success: function(student){
                console.log(calif);
        },
        error: function(error) {
            console.log('error ocurrido en el get calif student-123');
        }
    });
});