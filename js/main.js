var _result;
var label_banner1, label_banner2;
var reloadInterval = 15;    //in seconds

function reloadTable() {
    var no_of_col = 15
    var no_of_col_mobile = 6
	$.getJSON("./data.json", function(result) {
        _result = result;
		if (result.success) {
            // Display Desktop Table
            $(".matchTable > tbody").empty();
            __renderTableDivider($(".matchTable > tbody"), "dg1", label_banner1, no_of_col);
            __renderTable($(".matchTable > tbody"), result.preMatchesHLData);
            __renderTable($(".matchTable > tbody"), result.IPHLData);
            __renderTableDivider($(".matchTable > tbody"), "dg2", label_banner2, no_of_col);
            __renderTable($(".matchTable > tbody"), result.preMatchesData);
            __renderTable($(".matchTable > tbody"), result.IPData);
            __renderTable($(".matchTable > tbody"), result.FTData);
            $(".matchTable > tfoot").css("display", (result.data.length > 0 ? "none" : "block") );

            // Display Mobile Table
            $(".matchTableMobile > tbody").empty();
            __renderTableDivider($(".matchTableMobile > tbody"), "mg1", label_banner1, no_of_col_mobile);
            __renderMobileTable($(".matchTableMobile > tbody"), result.preMatchesHLData);
            __renderMobileTable($(".matchTableMobile > tbody"), result.IPHLData);
            __renderTableDivider($(".matchTableMobile > tbody"), "mg2", label_banner2, no_of_col_mobile);
            __renderMobileTable($(".matchTableMobile > tbody"), result.preMatchesData);
            __renderMobileTable($(".matchTableMobile > tbody"), result.IPData);
            __renderMobileTable($(".matchTableMobile > tbody"), result.FTData);
            $(".matchTableMobile > tfoot").css("display", (result.data.length > 0 ? "none" : "block") );

            // Common
            $(".label-lastModified").html(new Date(result.lastModified).format("yyyy年MM月dd日 aHH:mm:ss"));
		}
		// setTimeout(reloadTable, reloadInterval*1000);
	})
}

function __renderTable(obj, data) {
    for (var i = 0 ; i < data.length; i++) {
        var _data = data[i];
        var markup = "<tr style='text-align:center'><td rowSpan=2 style='color:white; background:"+_data.lg_co+"'>" +
            "<input type='hidden' value='"+_data.id+"'>"+_data.lg_tc+"</td>" +
            "<td rowSpan=2>"+_data.sch_start_time+"</td>" +
            "<td rowSpan=2 style='font-weight:bold; color: red'>"+_data.status+"</td>" +
            "<td rowSpan=2>"+_data.ht_tc+"</td>" +
            "<td rowSpan=2 style='font-weight:bold; color: darkblue'>"+_data.ht_ft_score+"-"+_data.at_ft_score+"</td>" +
            "<td rowSpan=2>"+_data.at_tc+"</td>";

        var hl_script = "style='background: yellow'";
        var asian_hl = _data["asian_odds"]?hl_script:"";
        var ls_hl = _data["ls_odds"]?hl_script:"";

        markup+="<td "+asian_hl+">\u4E9E</td>";
        for (var j = 0 ; j < 6; j++) {
            markup += "<td "+asian_hl+">"+ (_data.odds?_data.odds[0][j]:"") + "</td>";
        }
        markup += "</tr><tr style='text-align:center'>";
        markup += "<td "+ls_hl+">\u5927</td>";
        for (var j = 0 ; j < 6; j++) {
            markup += "<td "+ls_hl+">" + (_data.odds?_data.odds[2][j]:"") + "</td>";
        }
        markup += "</tr>";
        obj.append(markup);
    }
}

function __renderMobileTable(obj, data) {
    for (var i = 0 ; i < data.length; i++) {
        var _data = data[i];
        var markup = "<tr style='text-align:center'><td rowSpan=3 style='color:white; background:"+_data.lg_co+"'>" +
            "<input type='hidden' value='"+_data.id+"'>"+_data.lg_tc+"</td>" +
            "<td>"+_data.sch_start_time+"</td>" +
            "<td style='font-weight:bold; color: red'>"+_data.status+"</td>" +
            "<td>"+_data.ht_tc+"</td>" +
            "<td style='font-weight:bold; color: darkblue'>"+_data.ht_ft_score+"-"+_data.at_ft_score+"</td>" +
            "<td>"+_data.at_tc+"</td></tr>";

        var hl_script = "style='background: yellow'";
        var asian_hl = _data["asian_odds"]?hl_script:"";
        var ls_hl = _data["ls_odds"]?hl_script:"";
        if (asian_hl!="") {
            console.log(_data);
        }

        var content_init = "", content_real = "";
        for (var j = 0 ; j < 3; j++) content_init += (content_init!=""?", ":"") + (_data.odds?_data.odds[0][j]:"");
        for (var j = 3 ; j < 6; j++) content_real += (content_real!=""?", ":"") + (_data.odds?_data.odds[0][j]:"");
        markup+="<tr style='text-align:left'><td "+asian_hl+" colSpan=5>" +
        "(\u4E9E)   \u521D\u76E4\u6307\u6578:   "+content_init+", \u5373\u6642\u6307\u6578:   " + content_real + "</td></tr>";
        
        content_init = ""; content_real = "";
        for (var j = 0 ; j < 3; j++) content_init += (content_init!=""?", ":"") + (_data.odds?_data.odds[2][j]:"");
        for (var j = 3 ; j < 6; j++) content_real += (content_real!=""?", ":"") + (_data.odds?_data.odds[2][j]:"");
        markup+="<tr style='text-align:left'><td "+ls_hl+" colSpan=5>" +
        "(\u5927)   \u521D\u76E4\u6307\u6578:   "+content_init+", \u5373\u6642\u6307\u6578:   " + content_real + "</td></tr>";
        
        obj.append(markup);
    }
}

function __renderTableDivider(obj, tagId, _title, _col) {
    var markup = "<tr class='crossbar' id='"+tagId+"'><td colSpan='"+_col+"'>"+_title+"</td></tr>";
    obj.append(markup);
}

function jumpToCrossBar(table, tag) {
    if ( $("#"+tag).offset()) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#"+tag).offset().top-$("."+table+" > thead").height()
        },1000);
    }
}