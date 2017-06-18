'use strict'

const Trivago = use('App/Model/Trivago')
const Database = use('Database')

class HomeController {

    constructor() {

    }

    * index (request, response) {

        // All Data
        // const data = yield Trivago.all()
        // response.ok(data.toJSON())

        // Counts
        const hotelCount = yield Trivago.query().countDistinct('hotel as hotel').first()

        // Platform Stats
        let platformStats = yield Database.raw('SELECT platform, COUNT(*) as total, count(DISTINCT city) as city, count(DISTINCT hotel) as hotel, SUM(stars) as stars, SUM(rating) as rating, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index from mytable group by platform')
        platformStats = platformStats[0];

        let min = Math.min.apply(null, platformStats.map(function(obj) { return obj.booking_volume_index; }));

        let max = Math.max.apply(null, platformStats.map(function(obj) { return obj.booking_volume_index; }));

        let bestPlatform = platformStats.filter(function (platform) { return platform.booking_volume_index === max });

        let leastPlatform = platformStats.filter(function (platform) { return platform.booking_volume_index === min });


        // City Stats
        let cityStats = yield Database.raw('SELECT city, COUNT(*) as total, count(DISTINCT hotel) as hotel, SUM(stars) as stars, SUM(rating) as rating, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index from mytable group by city')
        cityStats = cityStats[0];

        min = Math.min.apply(null, cityStats.map(function(obj) { return obj.booking_volume_index; }));

        max = Math.max.apply(null, cityStats.map(function(obj) { return obj.booking_volume_index; }));

        let bestCity = cityStats.filter(function (platform) { return platform.booking_volume_index === max });

        let leastCity = cityStats.filter(function (platform) { return platform.booking_volume_index === min });


        // Quarterly platform
        let tempArray = []
        // AU
        let auQuarter = yield Database.raw("SELECT ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='AU' AND week BETWEEN 1 AND 13 ) as q1, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='AU' AND week BETWEEN 14 AND 26 ) as q2, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='AU' AND week BETWEEN 27 AND 39 ) as q3, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='AU' AND week BETWEEN 40 AND 52 ) as q4")

        auQuarter = auQuarter[0]
        tempArray = JSON.stringify(auQuarter);
        auQuarter = JSON.parse(tempArray);
        tempArray = auQuarter[0]
        auQuarter = Object.keys(tempArray).map(key => tempArray[key]);

        // DE
        let deQuarter = yield Database.raw("SELECT ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='DE' AND week BETWEEN 1 AND 13 ) as q1, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='DE' AND week BETWEEN 14 AND 26 ) as q2, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='DE' AND week BETWEEN 27 AND 39 ) as q3, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='DE' AND week BETWEEN 40 AND 52 ) as q4")

        deQuarter = deQuarter[0]
        tempArray = JSON.stringify(deQuarter);
        deQuarter = JSON.parse(tempArray);
        tempArray = deQuarter[0]
        deQuarter = Object.keys(tempArray).map(key => tempArray[key]);

        // US
        let usQuarter = yield Database.raw("SELECT ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='US' AND week BETWEEN 1 AND 13 ) as q1, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='US' AND week BETWEEN 14 AND 26 ) as q2, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='US' AND week BETWEEN 27 AND 39 ) as q3, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE platform='US' AND week BETWEEN 40 AND 52 ) as q4")

        usQuarter = usQuarter[0]
        tempArray = JSON.stringify(usQuarter);
        usQuarter = JSON.parse(tempArray);
        tempArray = usQuarter[0]
        usQuarter = Object.keys(tempArray).map(key => tempArray[key]);


        // Max Platform Values
        let maxQuery = yield Database.raw("SELECT (SELECT MAX(city) FROM (SELECT COUNT(DISTINCT city) as city FROM mytable GROUP BY platform) as maxcity) as city, (SELECT MAX(hotel) FROM (SELECT COUNT(DISTINCT hotel) as hotel FROM mytable GROUP BY platform) as maxhotel) as hotel, (SELECT MAX(stars) FROM (SELECT AVG(stars) as stars FROM mytable GROUP BY platform) as maxstars) as stars, (SELECT MAX(rating) FROM (SELECT AVG(rating) as rating FROM mytable GROUP BY platform) as maxrating) as rating, (SELECT MAX(uii) FROM (SELECT AVG(user_interaction_index) as uii FROM mytable GROUP BY platform) as maxuii) as user_interaction_index, (SELECT MAX(bvi) FROM (SELECT AVG(booking_volume_index) as bvi FROM mytable GROUP BY platform) as maxbvi) as booking_volume_index")
        maxQuery = maxQuery[0]
        tempArray = JSON.stringify(maxQuery);
        maxQuery = JSON.parse(tempArray);
        maxQuery = maxQuery[0]


        // Max City Values
        let maxCityQuery = yield Database.raw("SELECT (SELECT MAX(hotel) FROM (SELECT COUNT(DISTINCT hotel) as hotel FROM mytable GROUP BY city) as maxhotel) as hotel, (SELECT MAX(uii) FROM (SELECT AVG(user_interaction_index) as uii FROM mytable GROUP BY city) as maxuii) as user_interaction_index, (SELECT MAX(bvi) FROM (SELECT AVG(booking_volume_index) as bvi FROM mytable GROUP BY city) as maxbvi) as booking_volume_index")
        maxCityQuery = maxCityQuery[0]
        tempArray = JSON.stringify(maxCityQuery);
        maxCityQuery = JSON.parse(tempArray);
        maxCityQuery = maxCityQuery[0]


        // Hotel Stats
        let hotelStats = yield Database.raw("SELECT hotel, city, COUNT(*) as total, stars, rating, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index, latitude, longitude FROM mytable GROUP BY hotel")
        hotelStats = hotelStats[0]


        // City wise Quarter
        let cityQuarter = []
        for (var i = 0; i < cityStats.length; i++) {
          var quarter = yield Database.raw("SELECT ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE city='"+ cityStats[i]['city'] +"' AND week BETWEEN 1 AND 13 ) as q1, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE city='"+ cityStats[i]['city'] +"' AND week BETWEEN 14 AND 26 ) as q2, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE city='"+ cityStats[i]['city'] +"' AND week BETWEEN 27 AND 39 ) as q3, ( SELECT SUM(booking_volume_index) as booking_volume_index FROM mytable WHERE city='"+ cityStats[i]['city'] +"' AND week BETWEEN 40 AND 52 ) as q4")

          quarter = quarter[0]
          tempArray = JSON.stringify(quarter);
          quarter = JSON.parse(tempArray);
          tempArray = quarter[0]
          quarter = Object.keys(tempArray).map(key => tempArray[key])
          cityQuarter.push(quarter)
        }


        // Week wise UII & BVI
        let weekStats = yield Database.raw("SELECT week, COUNT(*) as total, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index from mytable group by week")
        weekStats = weekStats[0]
        tempArray = JSON.stringify(weekStats);
        weekStats = JSON.parse(tempArray);


        // Star affect on UII & BVI
        let starStats = yield Database.raw("SELECT stars, COUNT(*) as total, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index from mytable group by stars")
        starStats = starStats[0]
        tempArray = JSON.stringify(starStats)
        starStats = JSON.parse(tempArray)


        // Ratings affect on UII & BVI
        let ratingStats = yield Database.raw("SELECT rating, COUNT(*) as total, SUM(user_interaction_index) as user_interaction_index, SUM(booking_volume_index) as booking_volume_index from mytable group by rating")
        ratingStats = ratingStats[0]
        tempArray = JSON.stringify(ratingStats)
        ratingStats = JSON.parse(tempArray)

        // response.status(200).json(hotelStats)

        yield response.sendView('welcome', {
          hotelCount: hotelCount.hotel,
          platformStats: platformStats,
          cityStats: cityStats,
          bestPlatform: bestPlatform,
          leastPlatform: leastPlatform,
          bestCity: bestCity,
          leastCity: leastCity,
          auQuarter: auQuarter,
          deQuarter: deQuarter,
          usQuarter: usQuarter,
          maxQuery: maxQuery,
          maxCityQuery: maxCityQuery,
          hotelStats: hotelStats,
          cityQuarter: cityQuarter,
          weekStats: weekStats,
          starStats: starStats,
          ratingStats: ratingStats
        })
        return
    }

}

module.exports = HomeController
