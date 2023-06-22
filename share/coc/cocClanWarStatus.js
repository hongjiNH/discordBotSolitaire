module.exports = (clan) => {

    let data='';

    function result(clan) {

     
        const resultList = [];

        if (clan.clan.stars > clan.opponent.stars) {
            resultList.push('stars');
            resultList.push(clan.clan.stars - clan.opponent.stars);

        }
        else if (clan.clan.stars < clan.opponent.stars) {

            resultList.push('stars');
            resultList.push(clan.opponent.stars - clan.clan.stars);

        }
        else {
            if (clan.clan.destruction > clan.opponent.destruction) {

                resultList.push('destruction');
                resultList.push(clan.clan.destruction - clan.opponent.destruction);

            }
            else if (clan.clan.destruction < clan.opponent.destruction) {

                resultList.push('destruction');
                resultList.push(clan.opponent.destruction - clan.clan.destruction);

            }
            else {

            }

        }

        return resultList;
    };

    switch (clan.status) {
       
        case 'win':
            data={ name: "The winning clan is", value: clan.clan.name + ' by ' + `**${ result(clan)[0]}** different of **${ result(clan)[1]}**`  };
            break;
        case 'lose':
           data={ name: "The winning clan is", value: clan.opponent.name + ' by ' + `**${ result(clan)[0]}** different of **${ result(clan)[1]}**` };
            break;
        case 'tie':
            data={ name: "The winning clan is", value: 'No clan' + ' as ' + `this is a tie` };
            break;
        case 'pending':
            data={ name: "Currently who is wining", value: clan.clan.name + ' by ' +  `**${ result(clan)[0]}** different of **${ result(clan)[1]}**`};
            break;
    }

    return data;
};

