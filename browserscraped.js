//for(var i=0;;){}
var spanText = $(".pagination").find("span").text().toString();

spanText = parseInt(spanText.split("of")[1].trim());
var ngosIds = [];
var pagesM = Math.round(spanText / 10);
var pagesCountM = 1;
function searchFilter(page_num) {
    $("#text_search").hide();
    $('#postList').html('Data is loading, Please wait......');
    page_num = page_num ? page_num : 0;
    $("#example").hide();
    //$("#text_search").show();

    var statefromdb = '';
    var state_search_search = $('#state_search_search').val();
    var district_search = $('#district_search').val();
    var sector_search = $('#sector_search').val();
    var ngo_type_search = $('#ngo_type_search').val();
    var ngo_name_search = $('#ngo_name_search').val();
    var unique_id_search = $('#unique_id_search').val();
    var csrf_test_name = get_csrf_token();

    $.ajax({
        type: "POST",
        url: "https://ngodarpan.gov.in/index.php/ajaxcontroller/search_index_new/" + page_num,
        beforeSend: function () {
            $.blockUI({ message: "<h4 style='margin: 10px 0;'><img  width='50px' height='50px' src='https://ngodarpan.gov.in/assets/images/load.png' />Please wait...</h4>", css: { border: '0px', width: '18%', top: '30%' } });
        },
        data: "state_search=" + state_search_search + "&district_search=" + district_search + "&sector_search=" + sector_search + "&ngo_type_search=" + ngo_type_search + "&ngo_name_search=" + ngo_name_search + "&unique_id_search=" + unique_id_search + "&csrf_test_name=" + csrf_test_name,

        success: function (data) {

            $('#postList').html(data);
            getNgoIdM().promise().done(function () {
                getScrapData();
            });
        }
    });
}
var count = 0;
function getScrapData() {
    if (count === 9) {
        count = 0;
        if (pagesCountM <= pagesM) {
            searchFilter(pagesCountM * 10);
            pagesCountM++;
        }

        return 1;
    }
    $.post("https://ngodarpan.gov.in/index.php/ajaxcontroller/show_ngo_info", {
        id: ngosIds[count],
        csrf_test_name: get_csrf_token()
    },
        function (data, status) {
            count++;
            //console.log(data);
            alert(data);
            getScrapData();
        });
}
//---------------------------------------------------
//-----------------------------------------------------

function getNgoIdM() {
    ngosIds = [];
    return $("#postList table").find("a").each(function () {
        var temp = $(this).attr("onclick").toString();
        temp = temp.split("'")[1];
        ngosIds.push(temp);
    });
    //.promise().done( function(){ console.log(text); } );
}

getNgoIdM().promise().done(function () {
    getScrapData();
});
