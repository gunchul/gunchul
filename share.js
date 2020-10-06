/* aaa 10*10 a,b A,B,C */ 
$(document).ready(function(){
    var id = 0;

    $("#table_logs").on("click", "#RemoveButton", function() {
        $(this).closest("tr").remove();
        results_update();
     });

    $("#button_add").click(function(){           
        var str = "<tr id=" + id + ">";
        str += "<td>" + $("#input_kind").val() + "</td>";
        str += "<td>" + $("#input_cost").val() + "</td>";
        str += "<td>" + eval($("#input_cost").val()) + "</td>";
        str += "<td>" + $("#input_payer").val() + "</td>";
        str += "<td>" + $("#input_user").val() + "</td>";
        str += "<td><input type=button id='RemoveButton' value='삭제' class='btn btn-primary btn-sm'/></td>";
        str += "</tr>";
        $("#table_logs tbody").append(str);
        id = id + 1;
        results_update();
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
