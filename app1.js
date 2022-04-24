$(document).ready(function () {

    $("#submitBtn").click(function() {
        var userProfile = $("#userInput").val();
        getGitProfile(userProfile);
    });

});

$(document).ready(function () {

    $("#urlBtn").click(function() {
        var userUrl = $("#userUrl").val();
        getGitProfile(userUrl);
    });

});

async function getGitProfile(userProfile) {

    const apiUrl = "https://api.github.com/users/" + userProfile
    const responde = await fetch(apiUrl);
    const data = await responde.json();

    $("#userImg").attr("src", data.avatar_url)
    $("#userUrl").attr("href", data.html_url)
    $("#userName").text("@" + data.login);
    $("#fullName").text(data.name);    
    $("#userBio").text(data.bio)

    $("#userFollowers").text(" " + data.followers + " Followers")
    $("#userFollowing").text(" " + data.following + " Following")
    
    
    const reposUrl = "https://api.github.com/users/" + userProfile + "/repos#"
    const reposResponde = await fetch(reposUrl);
    const reposData = await reposResponde.json();

    var statusHTML = "";

    $.each(reposData , function(i, status){

        statusHTML += '<tr>';
        statusHTML += '<td>' + status.id + '</td>';
        statusHTML += '<td>' + status.name + '</td>';
        statusHTML += '<td>' + status.html_url + '</td>';
        statusHTML += '<td>' + status.language + '</td>';
        statusHTML += '</tr>';

    })

    $('tbody').html(statusHTML);


    console.log(reposUrl);
    console.log(apiUrl);
    console.log(reposData);

}