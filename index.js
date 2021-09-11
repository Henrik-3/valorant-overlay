<html>
    <head>
        
    </head>
    <body style="background-color: rgb(0, 0, 0);">
        <div class="tw-flex" style="margin-left: 20px;">
            <div class="tw-flex tw-flex-col" id="ally_team" style="margin-top:auto">
                <div class="round main-bracket" id="ally_team_input">

                </div>
            </div>
            <div class="tw-flex tw-flex-col" id="enemy_team" style="margin-left: auto;margin-top:auto">
                <div class="round main-bracket" id="enemy_team_input">
                    
                </div>
            </div>
        </div>
    </body>
    <script src="socket.io.min.js"></script>
    <script>
        var mode = {
            "": "Custom Games",
            "unrated": "Ungewertet",
            "spikerush": "Spike Rush",
            "ggteam": "Escalation",
            "competitive": "Gewertet",
            "onefa": "Klonprogramm",
            "deathmatch": "Deathmatch",
            "snowball": "Schneeballschlacht",
            "newmap": "Fracture"
        }
        var socket = io("http://127.0.0.1:5001");
        socket.on('update', async msg => {
            console.log(msg)
            if(msg.state == "Menu") return clear()
            if(msg.state == "PreGame") return pregame(msg)
            if(msg.state == "Ingame") return fixingame(msg)
        })
        socket.on("initialize", async msg => {
            console.log(msg)
            if(msg.state == "Menu") return clear()
            if(msg.state == "PreGame") return pregame(msg)
            if(msg.state == "Ingame") return ingame(msg)
        })
        async function pregame(state) {
            var coregame = await fetch("http://127.0.0.1:5000/v1/pre-game")
            var coregamejson = await coregame.json()
            if(mode[state.data.queueId] == "Ungewertet" || mode[state.data.queueId] == "Gewertet" || mode[state.data.queueId] == "Spike Rush" || mode[state.data.queueId] == "Schneeballschlacht"|| mode[state.data.queueId] == "Custom Games" || mode[state.data.queueId] == "Escalation" || mode[state.data.queueId] == "Fracture") {
                if(!document.getElementById("matchavailable")) {
                    var ally_team = coregamejson.data.AllyTeam != null ? coregamejson.data.AllyTeam.Players : []
                    var enemy_team = coregamejson.data.EnemyTeam != null ? coregamejson.data.EnemyTeam.Players : []
                    for(let i = 0; ally_team.length > i; i++) {
                        var mmr = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${ally_team[i].Subject}`)
                        var mmrjson = mmr.status == 200 ? await mmr.json() : "N.A"
                        var name = await fetch(`http://127.0.0.1:5000/v1/get-name/${ally_team[i].Subject}`)
                        var namejson = await name.json()
                        console.log(mmrjson)
                        var matchbracket = document.createElement("div")
                        matchbracket.className = "match"
                        matchbracket.id = "matchavailable"
                        matchbracket.style.cssText = "background-color: rgba(67,106,113, 0.5)"
                        var matchdata = document.createElement("a")
                        matchdata.className = "matchdata"
                        var agent = document.createElement("div")
                        agent.className = "time_result"
                        var rank = document.createElement("div")
                        rank.className = "time_result"
                        var card = document.createElement("div")
                        card.className = "time_result"
                        var image_agent = document.createElement("img")
                        if(ally_team[i].CharacterSelectionState == "") {
                            image_agent.src = "https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/smallicon.png"
                        } else {
                            image_agent.src = `https://media.valorant-api.com/agents/${ally_team[i].CharacterID}/displayicon.png`
                        }
                        image_agent.style.cssText = "height: 25px; width: 25px"
                        image_agent.id = `agentimg${i}_ally`
                        agent.append(image_agent)
                        var teams = document.createElement("div")
                        teams.className = "teams"
                        var team2 = document.createElement("div")
                        var teamname2 = document.createElement("div")
                        team2.className = "team"
                        teamname2.className = "team-name"
                        teamname2.innerHTML = `${namejson[0].GameName}`
                        team2.append(teamname2)
                        teams.append(team2)
                        var image_rank = document.createElement("img")
                        image_rank.src = typeof mmrjson == "object" ? `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/${mmrjson.data.currenttier}/largeicon.png` : `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        image_rank.style.cssText = "height: 25px; width: 25px"
                        var rank_elo = document.createElement("div")
                        rank_elo.className = "team-name"
                        rank_elo.innerHTML = typeof mmrjson == "object" ? mmrjson.data.elo : "N.A"
                        rank_elo.style.cssText = "justify-content: center;"
                        rank.append(image_rank)
                        rank.append(rank_elo)
                        matchdata.append(agent)
                        matchdata.append(teams)
                        matchdata.append(rank)
                        matchdata.append(card)
                        matchbracket.append(matchdata)
                        document.getElementById("ally_team_input").append(matchbracket)
                    }
                    for(let i = 0; 5 > i; i++) {
                        /*var mmr = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${enemy_team[i].Subject}`)
                        console.log(mmr.status)
                        var mmrjson = mmr.status == 200 ? await mmr.json() : "N.A"
                        console.log(typeof mmrjson)
                        var name = await fetch(`http://127.0.0.1:5000/v1/get-name/${enemy_team[i].Subject}`)
                        var namejson = await name.json()*/
                        var matchbracket = document.createElement("div")
                        matchbracket.className = "match"
                        matchbracket.id = "matchavailable"
                        matchbracket.style.cssText = "background-color: rgba(255, 70, 84, 0.5)"
                        var matchdata = document.createElement("a")
                        matchdata.className = "matchdata"
                        var agent = document.createElement("div")
                        agent.className = "time_result"
                        var rank = document.createElement("div")
                        rank.className = "time_result"
                        var card = document.createElement("div")
                        card.className = "time_result"
                        var image_agent = document.createElement("img")
                        /*if(enemy_team[i].CharacterSelectionState == "") {
                            image_agent.src = "https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/smallicon.png"
                        } else {
                            image_agent.src = `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        }*/
                        image_agent.src = `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        image_agent.style.cssText = "height: 25px; width: 25px"
                        image_agent.id = `agentimg${i}_enemy`
                        agent.append(image_agent)
                        var teams = document.createElement("div")
                        teams.className = "teams"
                        var team2 = document.createElement("div")
                        var teamname2 = document.createElement("div")
                        team2.className = "team"
                        teamname2.className = "team-name"
                        teamname2.innerHTML = `Loading...`
                        teamname2.id = `name${i}_enemy`
                        team2.append(teamname2)
                        teams.append(team2)
                        var image_rank = document.createElement("img")
                        image_rank.src = typeof mmrjson == "object" ? `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png` : `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        image_rank.style.cssText = "height: 25px; width: 25px"
                        image_rank.id = `rankimg${i}_enemy`
                        var rank_elo = document.createElement("div")
                        rank_elo.className = "team-name"
                        rank_elo.innerHTML = typeof mmrjson == "object" ? "N.A" : "N.A"
                        rank_elo.style.cssText = "justify-content: center;"
                        rank_elo.id = `rankelo${i}_enemy`
                        rank.append(image_rank)
                        rank.append(rank_elo)
                        matchdata.append(agent)
                        matchdata.append(teams)
                        matchdata.append(rank)
                        matchdata.append(card)
                        matchbracket.append(matchdata)
                        document.getElementById("enemy_team_input").append(matchbracket)
                    }
                }
            }
            var loop = setInterval(async () => {
                var coregame = await fetch("http://127.0.0.1:5000/v1/pre-game")
                if(coregame.status == 404) return clearInterval(loop)
                var coregamejson = await coregame.json()
                var ally_team = coregamejson.data.AllyTeam != null ? coregamejson.data.AllyTeam.Players : []
                for(let i = 0; ally_team.length > i; i++) {
                    var img = document.getElementById(`agentimg${i}_ally`)
                    if(ally_team[i].CharacterSelectionState == "") {
                        img.src = "https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/smallicon.png"
                    } else {
                        if(img.src != `https://media.valorant-api.com/agents/${ally_team[i].CharacterID}/displayicon.png`) img.src = `https://media.valorant-api.com/agents/${ally_team[i].CharacterID}/displayicon.png`
                    }
                }
            }, 2500)
        }
        async function fixingame(state) {
            var coregame = await fetch("http://127.0.0.1:5000/v1/core-game")
            var coregamejson = await coregame.json()
            if(mode[state.data.queueId] == "Ungewertet" || mode[state.data.queueId] == "Gewertet" || mode[state.data.queueId] == "Spike Rush" || mode[state.data.queueId] == "Schneeballschlacht"|| mode[state.data.queueId] == "Custom Games" || mode[state.data.queueId] == "Escalation"|| mode[state.data.queueId] == "Fracture") {
                if(document.getElementById("matchavailable")) {
                    var own_team_array = coregamejson.data.Players.filter(item => item.Subject == coregamejson.subject)
                    var own_team = own_team_array[0].TeamID
                    var enemy_team = coregamejson.data.Players.filter(item => item.TeamID != own_team)
                    for(let i = 0; enemy_team.length > i; i++) {
                        var mmr = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${enemy_team[i].Subject}`)
                        var mmrjson = mmr.status == 200 ? await mmr.json() : "N.A"
                        console.log(typeof mmrjson)
                        var name = await fetch(`http://127.0.0.1:5000/v1/get-name/${enemy_team[i].Subject}`)
                        var namejson = await name.json()
                        console.log(mmrjson)
                        var image_agent = document.getElementById(`agentimg${i}_enemy`)
                        image_agent.src = `https://media.valorant-api.com/agents/${enemy_team[i].CharacterID}/displayicon.png`
                        var namedom = document.getElementById(`name${i}_enemy`)
                        namedom.innerHTML = `${namejson[0].GameName}`
                        var image_rank = document.getElementById(`rankimg${i}_enemy`)
                        image_rank.src = typeof mmrjson == "object" ? `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/${mmrjson.data.currenttier}/largeicon.png` : `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        var elo = document.getElementById(`rankelo${i}_enemy`)
                        elo.innerHTML = typeof mmrjson == "object" ? mmrjson.data.elo : "N.A"
                    }
                }
            }
        }
        async function ingame(state) {
            var coregame = await fetch("http://127.0.0.1:5000/v1/core-game")
            var coregamejson = await coregame.json()
            console.log("log1")
            console.log(state.data.queueId)
            console.log(mode)
            if(mode[state.data.queueId] == "Spike Rush" || mode[state.data.queueId] == "Schneeballschlacht"|| mode[state.data.queueId] == "Custom Games"|| mode[state.data.queueId] == "Ungewertet" || mode[state.data.queueId] == "Gewertet" || mode[state.data.queueId] == "Escalation"|| mode[state.data.queueId] == "Fracture") {
                if(!document.getElementById("matchavailable")) {
                    var own_team_array = coregamejson.data.Players.filter(item => item.Subject == coregamejson.subject)
                    var own_team = own_team_array[0].TeamID
                    var ally_team = coregamejson.data.Players.filter(item => item.TeamID == own_team)
                    var enemy_team = coregamejson.data.Players.filter(item => item.TeamID != own_team)
                    for(let i = 0; ally_team.length > i; i++) {
                        var mmr = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${ally_team[i].Subject}`)
                        var mmrjson = mmr.status == 200 ? await mmr.json() : "N.A"
                        var name = await fetch(`http://127.0.0.1:5000/v1/get-name/${ally_team[i].Subject}`)
                        var namejson = await name.json()
                        console.log(mmrjson)
                        var matchbracket = document.createElement("div")
                        matchbracket.className = "match"
                        matchbracket.id = "matchavailable"
                        matchbracket.style.cssText = "background-color: rgba(67,106,113, 0.5)"
                        var matchdata = document.createElement("a")
                        matchdata.className = "matchdata"
                        var agent = document.createElement("div")
                        agent.className = "time_result"
                        var rank = document.createElement("div")
                        rank.className = "time_result"
                        var card = document.createElement("div")
                        card.className = "time_result"
                        var image_agent = document.createElement("img")
                        image_agent.src = `https://media.valorant-api.com/agents/${ally_team[i].CharacterID}/displayicon.png`
                        image_agent.style.cssText = "height: 25px; width: 25px"
                        agent.append(image_agent)
                        var teams = document.createElement("div")
                        teams.className = "teams"
                        var team2 = document.createElement("div")
                        var teamname2 = document.createElement("div")
                        team2.className = "team"
                        teamname2.className = "team-name"
                        teamname2.innerHTML = `${namejson[0].GameName}`
                        team2.append(teamname2)
                        teams.append(team2)
                        var image_rank = document.createElement("img")
                        image_rank.src = typeof mmrjson == "object" ? `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/${mmrjson.data.currenttier}/largeicon.png` : `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        image_rank.style.cssText = "height: 25px; width: 25px"
                        var rank_elo = document.createElement("div")
                        rank_elo.className = "team-name"
                        rank_elo.innerHTML = typeof mmrjson == "object" ? mmrjson.data.elo : "N.A"
                        rank_elo.style.cssText = "justify-content: center;"
                        rank.append(image_rank)
                        rank.append(rank_elo)
                        matchdata.append(agent)
                        matchdata.append(teams)
                        matchdata.append(rank)
                        matchdata.append(card)
                        matchbracket.append(matchdata)
                        document.getElementById("ally_team_input").append(matchbracket)
                    }
                    for(let i = 0; enemy_team.length > i; i++) {
                        var mmr = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/eu/${enemy_team[i].Subject}`)
                        var mmrjson = mmr.status == 200 ? await mmr.json() : "N.A"
                        console.log(typeof mmrjson)
                        var name = await fetch(`http://127.0.0.1:5000/v1/get-name/${enemy_team[i].Subject}`)
                        var namejson = await name.json()
                        console.log(mmrjson)
                        var matchbracket = document.createElement("div")
                        matchbracket.className = "match"
                        matchbracket.id = "matchavailable"
                        matchbracket.style.cssText = "background-color: rgba(255, 70, 84, 0.5)"
                        var matchdata = document.createElement("a")
                        matchdata.className = "matchdata"
                        var agent = document.createElement("div")
                        agent.className = "time_result"
                        var rank = document.createElement("div")
                        rank.className = "time_result"
                        var card = document.createElement("div")
                        card.className = "time_result"
                        var image_agent = document.createElement("img")
                        image_agent.src = `https://media.valorant-api.com/agents/${enemy_team[i].CharacterID}/displayicon.png`
                        image_agent.style.cssText = "height: 25px; width: 25px"
                        agent.append(image_agent)
                        var teams = document.createElement("div")
                        teams.className = "teams"
                        var team2 = document.createElement("div")
                        var teamname2 = document.createElement("div")
                        team2.className = "team"
                        teamname2.className = "team-name"
                        teamname2.innerHTML = `${namejson[0].GameName}`
                        team2.append(teamname2)
                        teams.append(team2)
                        var image_rank = document.createElement("img")
                        image_rank.src = typeof mmrjson == "object" ? `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/${mmrjson.data.currenttier}/largeicon.png` : `https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/largeicon.png`
                        image_rank.style.cssText = "height: 25px; width: 25px"
                        var rank_elo = document.createElement("div")
                        rank_elo.className = "team-name"
                        rank_elo.innerHTML = typeof mmrjson == "object" ? mmrjson.data.elo : "N.A"
                        rank_elo.style.cssText = "justify-content: center;"
                        rank.append(image_rank)
                        rank.append(rank_elo)
                        matchdata.append(agent)
                        matchdata.append(teams)
                        matchdata.append(rank)
                        matchdata.append(card)
                        matchbracket.append(matchdata)
                        document.getElementById("enemy_team_input").append(matchbracket)
                    }
                }
            }
        }
        async function clear() {
            var ally_team = document.getElementById("ally_team_input").innerHTML = ""
            var enemy_team = document.getElementById("enemy_team_input").innerHTML = ""
        }
    </script>
    <style>
        @font-face {
            font-family: "DIN Next LT Pro Bold";
            src: url(DINNextLTPro-Bold.ttf);
        }
        .tw-flex {
            display: flex;
        }
        .tw-flex-col {
            flex-direction: column;
        }
        .special-h2 {
            text-align: center;
            font-size: 32px;
            line-height: 48px;
            font-family: "DIN Next LT Pro Bold";
            color: #fff
        }
        .round {
            margin-right: 32px;
            width: 250px;
        }
        .main-bracket {
            justify-content: space-around;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
        }
        .match {
            --tw-bg-opacity: 1;
            background-color: #042e27;
            border-radius: 6px;
            margin-bottom: 24px;
            position: relative;
            --tw-shadow: inset 0px 0px 0px 1px rgba(45,48,71,0.1),0px 4px 24px -4px rgba(0,0,0,0.7);
            box-shadow: 0 0 transparent,0 0 transparent,var(--tw-shadow);
            box-shadow: var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow);
            width: 100%;
            transform-origin: center;
            transition-property: all;
            transition-timing-function: cubic-bezier(.4,0,.2,1);
            transition-duration: .15s;
            text-decoration: none;
        }
        .matchdata {
            border-radius: 6px;
            display: flex;
            align-items: center;
            text-decoration: none;
            vertical-align: baseline;
        }
        .teams {
            display: flex;
            width: 100%;
            min-width: 0;
            flex-direction: column;
        }
        .not-decided {
            color: turquoise !important
        }
        .team {
            display: flex;
            padding: 8px 12px;
            text-decoration: none;
        }
        .team-winner {
            font-size: 12px !important;
        }
        .team-name {
            display: flex;
            align-items: center;
            min-width: 0;
            pointer-events: none;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-family: Gilroy,sans-serif;
            font-weight: 700;
            font-size: 12px;
            line-height: 28px;
            color: white;
            font-family: "DIN Next LT Pro Bold";
        }
        .time_result {
            font-family: "DIN Next LT Pro Bold";
            font-weight: 800;
            font-size: 20px;
            line-height: 32px;
            border-radius: 4px;
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 7px;
            padding-bottom: 7px;
            justify-content: center;
            align-items: center;
            vertical-align: baseline;
        }
        .result {
            height: 32px;
            text-align: center;
            width: 32px;
            font-family: "DIN Next LT Pro Bold";
            font-weight: 800;
            font-size: 20px;
            line-height: 32px;
            color: white
        }
        .seperator {
            background-color: rgba(255,255,255,var(--tw-bg-opacity));
            height: 2px;
            margin-top: 4px;
            margin-bottom: 4px;
            width: 100%;
        }
        .seperator-span {
            display: none;
            font-family: Gilroy,sans-serif;
            font-weight: 800;
            font-size: 20px;
            line-height: 32px;
        }
    </style>
</html>
