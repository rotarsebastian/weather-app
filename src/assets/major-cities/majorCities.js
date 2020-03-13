let cities = [
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             32.86,
    //             39.86
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Ankara",
    //         "country": "Turkey"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             28.96,
    //             41.01
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Istanbul",
    //         "country": "Turkey"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             30.31,
    //             59.95
    //         ]
    //     },
    //     "properties": {
    //         "capital": "St. Petersborg",
    //         "country": "Russia"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             -3.19,
    //             55.95
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Edinburgh",
    //         "country": "Scotland"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             10.81,
    //             59.85
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Oslo",
    //         "country": "Norway"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             24.10,
    //             56.94
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Riga",
    //         "country": "Latvia"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             30.50,
    //             50.25
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Kiev",
    //         "country": "Ukraine"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             -0.57,
    //             44.83
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Bordeaux",
    //         "country": "France"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             2.17,
    //             41.38
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Barcelona",
    //         "country": "Spain"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             4.90,
    //             52.37
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Amsterdam",
    //         "country": "Netherlands"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             23.73,
    //             37.97
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Athens",
    //         "country": "Greece"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             18.41,
    //             43.86
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Sarajevo",
    //         "country": "Bosnia"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             5.37,
    //             43.29
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Marseille",
    //         "country": "France"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             -6.26,
    //             53.34
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Dublin",
    //         "country": "Ireland"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             21.03,
    //             52.21
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Warsaw",
    //         "country": "Poland"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             11.56,
    //             48.13
    //         ]
    //     },
    //     "properties": {
    //         "capital": "München",
    //         "country": "Germany"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             24.94,
    //             60.17
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Helsinki",
    //         "country": "Finland"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             18.06,
    //             59.32
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Stockholm",
    //         "country": "Sweden"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             27.56,
    //             53.90
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Minsk",
    //         "country": "Belarus"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             16.37,
    //             48.20
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Wien",
    //         "country": "Austria"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             -9.16,
    //             38.71
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Lisbon",
    //         "country": "Portugal"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             -74.00,
    //             40.71
    //         ]
    //     },
    //     "properties": {
    //         "capital": "New York",
    //         "country": "US"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             100.51,
    //             13.75
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Bangkok",
    //         "country": "Thailand"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             12.57,
    //             55.68
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Copenhagen",
    //         "country": "Denmark"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             2.35,
    //             48.85
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Paris",
    //         "country": "France"
    //     }
    // },
    // {
    //     "geometry": {        
    //         "coordinates": [
    //             13.41,
    //             52.52
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Berlin",
    //         "country": "Germany"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             26.1,
    //             44.433333
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Bucharest",
    //         "country": "Romania"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             26.25,
    //             47.633333
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Suceava",
    //         "country": "Romania"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             -3.7,
    //             40.42
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Madrid",
    //         "country": "Spain"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             12.48,
    //             41.89
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Rome",
    //         "country": "Italy"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             -0.13,
    //             51.51
    //         ]
    //     },
    //     "properties": {
    //         "capital": "London",
    //         "country": "United Kingdom"
    //     }
    // },
    // {      
    //     "geometry": {        
    //         "coordinates": [
    //             37.62,
    //             55.75
    //         ]
    //     },
    //     "properties": {
    //         "capital": "Moscow",
    //         "country": "Russia"
    //     }
    // },
    {      
        "geometry": {        
            "coordinates": [
                -21.9,
                64.14
            ]
        },
        "properties": {
            "capital": "Reykjavík",
            "country": "Iceland"
        }
    }
];

export default cities;
