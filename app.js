$(document).ready(function () {

    $("#content").hide();

    $("#table-search").keypress(function (event) {
        if (event.which === 13) {
            var userProfile = "reihabibi";
            var userProfile = $("#table-search").val();
            getGitProfile(userProfile);
        }

    });

});

async function getGitProfile(userProfile) {

    $("#content").hide();

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
    $("#allRepos").text(data.public_repos + " Public Repos")

    /* $("#allRepos").attr("href", "https://github.com/" + userProfile + "?tab=repositories") */


    const reposUrl = "https://api.github.com/users/" + userProfile + "/repos#"
    const reposResponde = await fetch(reposUrl);
    const reposData = await reposResponde.json();


    var statusHTML = "";

    $.each(reposData, function (i, status) {

        statusHTML += '<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">';
        statusHTML += '<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">' + status.name + '</th>';
        statusHTML += '<td class="px-6 py-4">' + status.language + '</td>';
        statusHTML += '<td class="px-6 py-4">' + status.watchers_count + '</td>';
        statusHTML += '<td class="px-6 py-4">' + status.watchers + '</td>';
        statusHTML += '<td class="px-6 py-4">' + status.forks + '</td>';
        statusHTML += '<td class="px-6 py-4">' + status.pushed_at + '</td>';
        statusHTML += '<td class="px-6 py-4 text-right"><a href="' + status.html_url + '" target="_blank" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View More</a></td>';
        statusHTML += '</tr>';

    })
    $('tbody').html(statusHTML);


    $("#content").fadeIn(400);

    console.log(reposUrl);
    console.log(apiUrl);
    console.log(reposData);
}
