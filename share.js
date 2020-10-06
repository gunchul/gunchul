/* aaa 10*10 a,b A,B,C */ 
$(document).ready(function(){
    var id = 0;

    $("#table_logs").on("click", "#RemoveButton", function() {
        $(this).closest("tr").remove();
        results_update();
     });

    $("#button_add").click(function(){
        var input_kind = $("#input_kind").val();
        var input_cost = $("#input_cost").val();
        var input_payer = $("#input_payer").val();
        var input_user = $("#input_user").val();

        if (input_kind.length == 0 || input_cost.length == 0 || input_payer.length == 0 || input_user.length == 0)
        {
            alert("값을 전부 입력하세요.");
            return;
        }

        var str = "<tr id=" + id + ">";
        str += "<td>" + input_kind + "</td>";
        str += "<td>" + input_cost + "</td>";
        str += "<td>" + eval(input_cost) + "</td>";
        str += "<td>" + input_payer + "</td>";
        str += "<td>" + input_user + "</td>";
        str += "<td><input type=button id='RemoveButton' value='삭제' class='btn btn-primary btn-sm'/></td>";
        str += "</tr>";
        $("#table_logs tbody").append(str);
        id = id + 1;
        results_update();
        $("#input_kind").val("");
        $("#input_cost").val("");
    });

    function results_update(){
        var i,j;
        var persons = {};
        var num_rows = $('#table_logs tbody tr').length;

        for (i = 0; i < num_rows; i++)
        {
            var columns = $('#table_logs tbody tr').eq(i).children();

            var cost = Number(columns.eq(2).text());
            var providers = columns.eq(3).text().split(",");
            var provide_cost = cost / providers.length * -1;
            var users = columns.eq(4).text().split(",");
            var user_cost = cost / users.length;
            for (j = 0; j < providers.length; j++)
            {
                if (persons[providers[j]] == null)
                {
                    persons[providers[j]] = provide_cost;
                }
                else
                {
                    persons[providers[j]] += provide_cost ;
                }
            }
            for (j = 0; j < users.length; j++)
            {
                if (persons[users[j]] == null)
                {
                    persons[users[j]] = user_cost;
                }
                else
                {
                    persons[users[j]] += user_cost ;
                }
            }
        }
        $("#table_results tbody").children().remove();
        for(var k in persons){
            var str = "<tr id=" + id + ">";
            str += "<td>" + k + "</td>";
            str += "<td>" + persons[k].toFixed(2) + "</td>";
            str += "</tr>";
            $("#table_results tbody").append(str);
        }
        $("#div_date").children().remove();
        src = "<p>" + Date() + "</p>";
        $("#div_date").append(src);
    }
});
