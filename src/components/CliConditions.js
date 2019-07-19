import {changeDay} from '../actions/climateAction'
export  function  findDay(c)
{ let weather=[
	{
		"code" : 1000,
		"day" : "Gonna, Roast Like a Chicken!!",
		"icon" : 113
	},
	{
		"code" : 1003,
		"day" : "Everybody else shares the same slight cloudy sky.",
		"icon" : 116
	},
	{
		"code" : 1006,
		"day" : "Don't forget: Beautiful sunsets need cloudy Skies...",

		"icon" : 119
	},
	{
		"code" : 1009,
		"day" : "Overcast:Dark clouds become heaven's flowers when kissed by light.",
		"icon" : 122
	},
	{
		"code" : 1030,
		"day" : "A misty morning does not signify a cloudy day.",
		"icon" : 143
	},
	{
		"code" : 1063,
		"day" : "Patchy rain possible",
		"night" : "Patchy rain possible",
		"icon" : 176
	},
	{
		"code" : 1066,
		"day" : "Patchy snow possible",
		"night" : "Patchy snow possible",
		"icon" : 179
	},
	{
		"code" : 1069,
		"day" : "Patchy sleet possible",
		"night" : "Patchy sleet possible",
		"icon" : 182
	},
	{
		"code" : 1072,
		"day" : "Patchy freezing drizzle possible",
		"night" : "Patchy freezing drizzle possible",
		"icon" : 185
	},
	{
		"code" : 1087,
		"day" : "Thunder gonna sound!!!!",
		"icon" : 200
	},
	{
		"code" : 1114,
		"day" : "Blowing snow",
		"icon" : 227
	},
	{
		"code" : 1117,
		"day" : "Blizzard",
		"icon" : 230
	},
	{
		"code" : 1135,
		"day" : "“When your mind is foggy, all you need is the winds of wisdom!” ",
		"icon" : 248
	},
	{
		"code" : 1147,
		"day" : "Freezing fog",
		"icon" : 260
	},
	{
		"code" : 1150,
		"day" : "Patchy light drizzle",
		"icon" : 263
	},
	{
		"code" : 1153,
		"day" : "Light drizzle",
		"icon" : 266
	},
	{
		"code" : 1168,
		"day" : "Freezing drizzle",
		"icon" : 281
	},
	{
		"code" : 1171,
		"day" : "Heavy freezing drizzle",
		"icon" : 284
	},
	{
		"code" : 1180,
		"day" : "Patchy light rain",
		"icon" : 293
	},
	{
		"code" : 1183,
		"day" : "Light rain",
		"icon" : 296
	},
	{
		"code" : 1186,
		"day" : "Moderate rain at times",
		"icon" : 299
	},
	{
		"code" : 1189,
		"day" : "Moderate rain",
		"icon" : 302
	},
	{
		"code" : 1192,
		"day" : "Heavy rain at times",
		"icon" : 305
	},
	{
		"code" : 1195,
		"day" : "Heavy rain",
		"icon" : 308
	},
	{
		"code" : 1198,
		"day" : "Light freezing rain",
		"icon" : 311
	},
	{
		"code" : 1201,
		"day" : "Moderate or heavy freezing rain",
		"icon" : 314
	},
	{
		"code" : 1204,
		"day" : "Light sleet",
		"icon" : 317
	},
	{
		"code" : 1207,
		"day" : "Moderate or heavy sleet",
		"icon" : 320
	},
	{
		"code" : 1210,
		"day" : "Patchy light snow",
		"icon" : 323
	},
	{
		"code" : 1213,
		"day" : "Light snow",
		"icon" : 326
	},
	{
		"code" : 1216,
		"day" : "Patchy moderate snow",
		"icon" : 329
	},
	{
		"code" : 1219,
		"day" : "Moderate snow",
		"icon" : 332
	},
	{
		"code" : 1222,
		"day" : "Patchy heavy snow",
		"icon" : 335
	},
	{
		"code" : 1225,
		"day" : "Heavy snow",
		"icon" : 338
	},
	{
		"code" : 1237,
		"day" : "Ice pellets",
		"icon" : 350
	},
	{
		"code" : 1240,
		"day" : "Light rain shower",
		"icon" : 353
	},
	{
		"code" : 1243,
		"day" : "Moderate or heavy rain shower",
		"icon" : 356
	},
	{
		"code" : 1246,
		"day" : "Torrential rain shower",
		"icon" : 359
	},
	{
		"code" : 1249,
		"day" : "Light sleet showers",
		"icon" : 362
	},
	{
		"code" : 1252,
		"day" : "Moderate or heavy sleet showers",
		"icon" : 365
	},
	{
		"code" : 1255,
		"day" : "Light snow showers",
		"icon" : 368
	},
	{
		"code" : 1258,
		"day" : "Moderate or heavy snow showers",
		"icon" : 371
	},
	{
		"code" : 1261,
		"day" : "Light showers of ice pellets",
		"icon" : 374
	},
	{
		"code" : 1264,
		"day" : "Moderate or heavy showers of ice pellets",
		"icon" : 377
	},
	{
		"code" : 1273,
		"day" : "Patchy light rain with thunder",
		"icon" : 386
	},
	{
		"code" : 1276,
		"day" : "Moderate or heavy rain with thunder",
		"icon" : 389
	},
	{
		"code" : 1279,
		"day" : "Patchy light snow with thunder",
		"icon" : 392
	},
	{
		"code" : 1282,
		"day" : "Moderate or heavy snow with thunder",
		"icon" : 395
	}
]

return weather.map(d=>(d.code==c? (d.day):""))
}
