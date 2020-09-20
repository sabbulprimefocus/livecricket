$(document).ready(function(){
    function getData(){
        $.ajax({
            url : 'https://www.cricbuzz.com/api/cricket-match/commentary/30340',
            type : 'GET',
            success : function(data) { 
                
                
                // $('.first-team-name').text(data.matchHeader.team1.shortName);
                // $('.second-team-name').text(data.matchHeader.team2.shortName);
                // var t = data.miniscore.matchScoreDetails.inningsScoreList > 1 ? 1 : 0;
                // if(t){
                //     var fts = data.miniscore.matchScoreDetails.inningsScoreList[1].score.toString() +"-"+data.miniscore.matchScoreDetails.inningsScoreList[1].wickets.toString() + "("+data.miniscore.matchScoreDetails.inningsScoreList[1].overs.toString()+")" ;
                //     var sts = data.miniscore.matchScoreDetails.inningsScoreList[0].score.toString() +"-"+data.miniscore.matchScoreDetails.inningsScoreList[0].wickets.toString() + "("+data.miniscore.matchScoreDetails.inningsScoreList[0].overs.toString()+")" ;
                // }else{
                //     var fts = data.miniscore.matchScoreDetails.inningsScoreList[0].score.toString() +"-"+data.miniscore.matchScoreDetails.inningsScoreList[0].wickets.toString() + "("+data.miniscore.matchScoreDetails.inningsScoreList[0].overs.toString()+")" ;
                //     var sts = "NA";
                // }
                // $('.first-team-score').text(fts);
                // $('.second-team-score').text(sts);
                console.log(data);
                plotData(data);
            },
            error : function(request)
            {
                console.log(request);
            }
        });
    }
    getData();
    function getScorecardData(){
        $.ajax({
            url : 'https://www.cricbuzz.com/api/html/cricket-scorecard/30340',
            type : 'GET',
            headers: {"Access-Control-Allow-Origin":"file:///C:/Users/Abharadwaj/Downloads/specer/index.html"},
            success : function(data) { 
            
                console.log(data);
                getFile(data);
            },
            error : function(request)
            {
                console.log(request);
            }
        });
    }

    function getFile(file){
        $.get(file,function(txt){
            save(txt.responseText.replace(/\n/g, "<br />"));
        }); 
    }

    function plotData(data){
        if (typeof(data)!=undefined){
            if(typeof(data.miniscore)!=undefined){
                var miniScore = data.miniscore;
                // Batsman plot
                var batsmanTxt = ``;
                batsmanTxt += `<tr>
                                <td>${miniScore.batsmanStriker.batName}*</td>
                                <td>${miniScore.batsmanStriker.batRuns}</td>
                                <td>${miniScore.batsmanStriker.batBalls}</td>
                                <td>${miniScore.batsmanStriker.batFours}</td>
                                <td>${miniScore.batsmanStriker.batSixes}</td>
                                <td>${miniScore.batsmanStriker.batStrikeRate}</td>
                            </tr>
                            <tr>
                                <td>${miniScore.batsmanNonStriker.batName}</td>
                                <td>${miniScore.batsmanNonStriker.batRuns}</td>
                                <td>${miniScore.batsmanNonStriker.batBalls}</td>
                                <td>${miniScore.batsmanNonStriker.batFours}</td>
                                <td>${miniScore.batsmanNonStriker.batSixes}</td>
                                <td>${miniScore.batsmanNonStriker.batStrikeRate}</td>
                            </tr>`;
                $(".batsman-list").html(batsmanTxt);
                // Bowler plot
                var bowlerTxt = ``;
                bowlerTxt += `<tr>
                                <td>${miniScore.bowlerStriker.bowlName}*</td>
                                <td>${miniScore.bowlerStriker.bowlOvs}</td>
                                <td>${miniScore.bowlerStriker.bowlMaidens}</td>
                                <td>${miniScore.bowlerStriker.bowlRuns}</td>
                                <td>${miniScore.bowlerStriker.bowlRuns}</td>
                                <td>${miniScore.bowlerStriker.bowlEcon}</td>
                            </tr>
                            <tr>
                                <td>${miniScore.bowlerNonStriker.bowlName}</td>
                                <td>${miniScore.bowlerNonStriker.bowlOvs}</td>
                                <td>${miniScore.bowlerNonStriker.bowlMaidens}</td>
                                <td>${miniScore.bowlerNonStriker.bowlRuns}</td>
                                <td>${miniScore.bowlerNonStriker.bowlRuns}</td>
                                <td>${miniScore.bowlerNonStriker.bowlEcon}</td>
                            </tr>`;
                $(".bowler-list").html(bowlerTxt);
                $(".recent-string").text(miniScore.recentOvsStats);
                $(".custom-status").text(miniScore.matchScoreDetails.customStatus);
                if(typeof(miniScore.matchScoreDetails)!=undefined && typeof(miniScore.matchScoreDetails.inningsScoreList)!= undefined){
                    if(miniScore.matchScoreDetails.inningsScoreList.length == 1){
                        $('.second-team').hide();
                        if(typeof(data.matchHeader)!=undefined){
                            $('.first-team-name').text(data.matchHeader.team1.shortName);
                            var xt0 = miniScore.matchScoreDetails.inningsScoreList[0].overs.toString();
                            var ovr0 = xt0;
                            var xtsub0 = xt0.slice(-1);
                            xtsub0 = parseInt(xtsub0);
                            if(xtsub0 == 6){
                                ovr0 = xt0.slice(0,-2);
                                ovr0 = parseInt(ovr0)+1;
                            }
                            var fts = miniScore.matchScoreDetails.inningsScoreList[0].score.toString() +"-"+miniScore.matchScoreDetails.inningsScoreList[0].wickets.toString() + "("+ovr0+")" ;
                            $('.first-team-score').text(fts);
                            $('.first-team-score-crr').show();
                            $('.first-team-score-crr-num').text(miniScore.currentRunRate);
                        }
                    }else if(miniScore.matchScoreDetails.inningsScoreList.length == 2){
                        $('.second-team').show();
                        if(typeof(data.matchHeader)!=undefined){
                            $('.first-team-name').text(data.matchHeader.team1.shortName);
                            $('.second-team-name').text(data.matchHeader.team2.shortName);
                            var xt1 = miniScore.matchScoreDetails.inningsScoreList[1].overs.toString();
                            var ovr1 = xt1;
                            var xtsub1 = xt1.slice(-1);
                            xtsub1 = parseInt(xtsub1);
                            if(xtsub1 == 6){
                                ovr1 = xt1.slice(0,-2);
                                ovr1 = parseInt(ovr1)+1;
                            }
                            var xt0 = miniScore.matchScoreDetails.inningsScoreList[0].overs.toString();
                            var ovr0 = xt0;
                            var xtsub0 = xt0.slice(-1);
                            xtsub0 = parseInt(xtsub0);
                            if(xtsub0 == 6){
                                ovr0 = xt0.slice(0,-2);
                                ovr0 = parseInt(ovr0)+1;
                            }
                            var fts = miniScore.matchScoreDetails.inningsScoreList[1].score.toString() +"-"+miniScore.matchScoreDetails.inningsScoreList[1].wickets.toString() + "("+ovr1+")" ;
                            var sts = miniScore.matchScoreDetails.inningsScoreList[0].score.toString() +"-"+miniScore.matchScoreDetails.inningsScoreList[0].wickets.toString() + "("+ovr0+")" ;
                            $('.first-team-score').text(fts);
                            $('.second-team-score').text(sts);
                            $('.first-team-score-crr').hide();
                            $('.second-team-score-crr').show();
                            $('.second-team-score-crr-num').text(miniScore.currentRunRate);
                        }
                    }
                }

            }
        }
    }

    setInterval(getData, 3000);
});