import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useMovieStore = defineStore('movie', () => {

    // --- DEFAULT DATABASE ---
    const defaultMovies = [
        {
            id: 1,
            title: 'Avatar: The Way of Water',
            genre: 'Sci-Fi / Action',
            year: '2022',
            duration: '3h 12m',
            rating: 4.8,
            synopsis: 'Set more than a decade after the events of the first film, "Avatar: The Way of Water" begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
            poster: 'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc05475qg9e.jpg',
            trailer: 'https://www.youtube.com/embed/d9MyW72ELq0',
            cast: [
                { name: 'Sam Worthington', character: 'Jake Sully', image: 'https://image.tmdb.org/t/p/w200/vM1WfcJDw7gF7mJgC5e3c1a2f6E.jpg' },
                { name: 'Zoe Saldaña', character: 'Neytiri', image: 'https://image.tmdb.org/t/p/w200/iOVbUH20il632nj2v01NCtQXVPZ.jpg' },
                { name: 'Sigourney Weaver', character: 'Kiri', image: 'https://image.tmdb.org/t/p/w200/flfcepXUBqvJy8kM1Wj4x1Kx7B7.jpg' }
            ]
        },
        {
            id: 2,
            title: 'Oppenheimer',
            genre: 'Drama / History',
            year: '2023',
            duration: '3h 00m',
            rating: 4.9,
            synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
            poster: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/rLb2cs60836t5iDa4cIVq1qHW7L.jpg',
            trailer: 'https://www.youtube.com/embed/uYPbbksJxIg',
            cast: [
                { name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', image: 'https://image.tmdb.org/t/p/w200/z3dvKqMNDQWk3QLjBqqTEAoOrgx.jpg' },
                { name: 'Emily Blunt', character: 'Kitty Oppenheimer', image: 'https://image.tmdb.org/t/p/w200/k5h0d1a49E4yF7qjH9g7o6i8x.jpg' }
            ]
        },
        {
            id: 3,
            title: 'Spider-Man: Across the Spider-Verse',
            genre: 'Animation / Action',
            year: '2023',
            duration: '2h 20m',
            rating: 4.7,
            synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
            poster: 'https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
            trailer: 'https://www.youtube.com/embed/cqGjhVJWtEg',
            cast: [
                { name: 'Shameik Moore', character: 'Miles Morales (voice)', image: 'https://image.tmdb.org/t/p/w200/u2mused5r5D8wQ9d2c5e5i5g.jpg' },
                { name: 'Hailee Steinfeld', character: 'Gwen Stacy (voice)', image: 'https://image.tmdb.org/t/p/w200/6i7p4iF5d7o5i6q3e7r8s.jpg' }
            ]
        },
        {
            id: 4,
            title: 'Barbie',
            genre: 'Comedy / Fantasy',
            year: '2023',
            duration: '1h 54m',
            rating: 4.5,
            synopsis: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
            poster: 'https://infinity-creative.co.uk/wp-content/uploads/2023/07/From-Dreamhouse-to-Icon-The-Brand-Story-of-Barbie.jpg',
            backdrop: 'https://juliapistor.com/wp-content/uploads/2023/12/barbie-mattel-julia-pistor.png',
            trailer: 'https://www.youtube.com/embed/pBk4NYhWNMM',
            cast: [
                { name: 'Margot Robbie', character: 'Barbie', image: 'https://image.tmdb.org/t/p/w200/euDPyqLnuwaT5j8E9s9r6a3.jpg' },
                { name: 'Ryan Gosling', character: 'Ken', image: 'https://image.tmdb.org/t/p/w200/4X1w0H6k1e7q3e5r8s.jpg' }
            ]
        },
        {
            id: 5,
            title: 'Dune: Part Two',
            genre: 'Sci-Fi / Adventure',
            year: '2024',
            duration: '2h 46m',
            rating: 4.9,
            synopsis: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
            poster: 'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
            trailer: 'https://www.youtube.com/embed/Way9Dexny3w',
            cast: [
                { name: 'Timothée Chalamet', character: 'Paul Atreides', image: 'https://image.tmdb.org/t/p/w200/BE2sdjpgE8SJzISQYQfvZOzuOV.jpg' },
                { name: 'Zendaya', character: 'Chani', image: 'https://image.tmdb.org/t/p/w200/cbCib5I3UJX8V93V340V96954G.jpg' }
            ]
        },
        {
            id: 6,
            title: 'The Dark Knight',
            genre: 'Action / Crime',
            year: '2008',
            duration: '2h 32m',
            rating: 4.9,
            synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
            poster: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
            trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
            cast: [
                { name: 'Christian Bale', character: 'Bruce Wayne / Batman', image: 'https://image.tmdb.org/t/p/w200/b7fTC9WFkgqGOv77mLQzsDcyRI8.jpg' },
                { name: 'Heath Ledger', character: 'Joker', image: 'https://image.tmdb.org/t/p/w200/p2W2h1b11zH1uFm0Wn55yFv.jpg' }
            ]
        },
        {
            id: 7,
            title: 'Interstellar',
            genre: 'Sci-Fi / Drama',
            year: '2014',
            duration: '2h 49m',
            rating: 4.8,
            synopsis: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
            poster: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/rAiGBVVhalpVRC2pXhd9hRLUE0k.jpg',
            trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
            cast: [
                { name: 'Matthew McConaughey', character: 'Cooper', image: 'https://image.tmdb.org/t/p/w200/sY2m2M37m66ffq523sXS5746bad.jpg' },
                { name: 'Anne Hathaway', character: 'Brand', image: 'https://image.tmdb.org/t/p/w200/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg' }
            ]
        },
        {
            id: 8,
            title: 'Inception',
            genre: 'Action / Sci-Fi',
            year: '2010',
            duration: '2h 28m',
            rating: 4.8,
            synopsis: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
            backdrop: 'https://i0.wp.com/farm5.static.flickr.com/4079/4900999189_27b899b7cb.jpg',
            trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
            cast: [
                { name: 'Leonardo DiCaprio', character: 'Dom Cobb', image: 'https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
                { name: 'Joseph Gordon-Levitt', character: 'Arthur', image: 'https://image.tmdb.org/t/p/w200/z2cl95jmILL9EIVb1PH3M3a9D95.jpg' }
            ]
        },
        {
            id: 9,
            title: 'Top Gun: Maverick',
            genre: 'Action / Drama',
            year: '2022',
            duration: '2h 11m',
            rating: 4.7,
            synopsis: 'After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.',
            poster: 'https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/5Yx7f1EnjB9P7m1gC3z7f6pD.jpg',
            trailer: 'https://www.youtube.com/embed/qSqVVswa420',
            cast: [
                { name: 'Tom Cruise', character: 'Capt. Pete "Maverick" Mitchell', image: 'https://image.tmdb.org/t/p/w200/8qBylBsQf4llkGrWR3qAsOtOU8O.jpg' },
                { name: 'Miles Teller', character: 'Lt. Bradley "Rooster" Bradshaw', image: 'https://image.tmdb.org/t/p/w200/4h8Wp3e5O5q7gR9.jpg' }
            ]
        },
        {
            id: 10,
            title: 'Everything Everywhere All At Once',
            genre: 'Action / Adventure',
            year: '2022',
            duration: '2h 20m',
            rating: 4.6,
            synopsis: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what’s important by connecting with the lives she could have led in other universes.',
            poster: 'https://m.media-amazon.com/images/I/71rKqMu+tbL._AC_UF350,350_QL80_.jpg',
            backdrop: 'https://blog.frame.io/wp-content/uploads/2022/04/B0443-featured-image-1.jpg',
            trailer: 'https://www.youtube.com/embed/wxN1T1uxQ2g',
            cast: [
                { name: 'Michelle Yeoh', character: 'Evelyn Wang', image: 'https://image.tmdb.org/t/p/w200/q7dY7.jpg' },
                { name: 'Ke Huy Quan', character: 'Waymond Wang', image: 'https://image.tmdb.org/t/p/w200/5.jpg' }
            ]
        },
        {
            id: 11,
            title: 'The Godfather',
            genre: 'Crime / Drama',
            year: '1972',
            duration: '2h 55m',
            rating: 5.0,
            synopsis: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
            poster: 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
            trailer: 'https://www.youtube.com/embed/sY1S34973zA',
            cast: [
                { name: 'Marlon Brando', character: 'Don Vito Corleone', image: 'https://image.tmdb.org/t/p/w200/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg' },
                { name: 'Al Pacino', character: 'Michael Corleone', image: 'https://image.tmdb.org/t/p/w200/fMDFeVf0pjopTJbyRSLFadCN39k.jpg' }
            ]
        },
        {
            id: 12,
            title: 'Avengers: Endgame',
            genre: 'Action / Adventure',
            year: '2019',
            duration: '3h 01m',
            rating: 4.8,
            synopsis: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
            poster: 'https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
            trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
            cast: [
                { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man', image: 'https://image.tmdb.org/t/p/w200/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg' },
                { name: 'Chris Evans', character: 'Steve Rogers / Captain America', image: 'https://image.tmdb.org/t/p/w200/3bOGNsHlrswhyW79uvIHH1V43KF.jpg' }
            ]
        },
        {
            id: 13,
            title: 'Parasite',
            genre: 'Thriller / Drama',
            year: '2019',
            duration: '2h 12m',
            rating: 4.9,
            synopsis: 'All unemployed, Ki-taek\'s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.',
            poster: 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7DwyQP2.jpg',
            trailer: 'https://www.youtube.com/embed/5xH0HfJHsaY',
            cast: [
                { name: 'Song Kang-ho', character: 'Ki-taek', image: 'https://image.tmdb.org/t/p/w200/fl7f.jpg' },
                { name: 'Lee Sun-kyun', character: 'Dong-ik', image: 'https://image.tmdb.org/t/p/w200/m8.jpg' }
            ]
        },
        {
            id: 14,
            title: 'The Matrix',
            genre: 'Action / Sci-Fi',
            year: '1999',
            duration: '2h 16m',
            rating: 4.8,
            synopsis: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
            poster: 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/l4QHerTSbMIDe2NHTeDq9y.jpg',
            trailer: 'https://www.youtube.com/embed/m8e-FF8MsqU',
            cast: [
                { name: 'Keanu Reeves', character: 'Neo', image: 'https://image.tmdb.org/t/p/w200/4D0PpNI0kmP58hgrwGC3wCjxhmm.jpg' },
                { name: 'Laurence Fishburne', character: 'Morpheus', image: 'https://image.tmdb.org/t/p/w200/8c.jpg' }
            ]
        },
        {
            id: 15,
            title: 'Pulp Fiction',
            genre: 'Crime / Thriller',
            year: '1994',
            duration: '2h 34m',
            rating: 4.8,
            synopsis: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.',
            poster: 'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1916guXlVTckV5Ab66k.jpg',
            trailer: 'https://www.youtube.com/embed/s7EdQ4FqbhY',
            cast: [
                { name: 'John Travolta', character: 'Vincent Vega', image: 'https://image.tmdb.org/t/p/w200/sHi.jpg' },
                { name: 'Samuel L. Jackson', character: 'Jules Winnfield', image: 'https://image.tmdb.org/t/p/w200/mXN4.jpg' }
            ]
        },
        {
            id: 16,
            title: 'Gladiator',
            genre: 'Action / Drama',
            year: '2000',
            duration: '2h 35m',
            rating: 4.7,
            synopsis: 'In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army\'s most capable and trusted generals and a key advisor to the emperor. As Marcus\'s devious son Commodus ascends to the throne, Maximus is set to be executed.',
            poster: 'https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/bQ.jpg',
            trailer: 'https://www.youtube.com/embed/owK1qxDselE',
            cast: [
                { name: 'Russell Crowe', character: 'Maximus Decimus Meridius', image: 'https://image.tmdb.org/t/p/w200/mGt.jpg' },
                { name: 'Joaquin Phoenix', character: 'Commodus', image: 'https://image.tmdb.org/t/p/w200/nXL.jpg' }
            ]
        },
        {
            id: 17,
            title: 'The Lion King',
            genre: 'Animation / Drama',
            year: '1994',
            duration: '1h 28m',
            rating: 4.8,
            synopsis: 'A young lion prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days.',
            poster: 'https://image.tmdb.org/t/p/original/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/w.jpg',
            trailer: 'https://www.youtube.com/embed/4sj1MT05lAA',
            cast: [
                { name: 'Matthew Broderick', character: 'Simba (voice)', image: 'https://image.tmdb.org/t/p/w200/v.jpg' },
                { name: 'Jeremy Irons', character: 'Scar (voice)', image: 'https://image.tmdb.org/t/p/w200/y.jpg' }
            ]
        },
        {
            id: 18,
            title: 'Joker',
            genre: 'Crime / Thriller',
            year: '2019',
            duration: '2h 02m',
            rating: 4.6,
            synopsis: 'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
            poster: 'https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
            trailer: 'https://www.youtube.com/embed/zAGVQLHvwOY',
            cast: [
                { name: 'Joaquin Phoenix', character: 'Arthur Fleck / Joker', image: 'https://image.tmdb.org/t/p/w200/nXL.jpg' },
                { name: 'Robert De Niro', character: 'Murray Franklin', image: 'https://image.tmdb.org/t/p/w200/cT8.jpg' }
            ]
        },
        {
            id: 19,
            title: 'Forrest Gump',
            genre: 'Drama / Romance',
            year: '1994',
            duration: '2h 22m',
            rating: 4.8,
            synopsis: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.',
            poster: 'https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg',
            trailer: 'https://www.youtube.com/embed/bLvqoHBptjg',
            cast: [
                { name: 'Tom Hanks', character: 'Forrest Gump', image: 'https://image.tmdb.org/t/p/w200/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg' },
                { name: 'Robin Wright', character: 'Jenny Curran', image: 'https://image.tmdb.org/t/p/w200/ro.jpg' }
            ]
        },
        {
            id: 20,
            title: 'Coco',
            genre: 'Animation / Family',
            year: '2017',
            duration: '1h 45m',
            rating: 4.9,
            synopsis: 'Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events.',
            poster: 'https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtX40Xy.jpg',
            trailer: 'https://www.youtube.com/embed/Ga6RYezw6jk',
            cast: [
                { name: 'Anthony Gonzalez', character: 'Miguel (voice)', image: 'https://image.tmdb.org/t/p/w200/5.jpg' },
                { name: 'Gael García Bernal', character: 'Héctor (voice)', image: 'https://image.tmdb.org/t/p/w200/ac.jpg' }
            ]
        },
        {
            id: 21,
            title: 'Spirited Away',
            genre: 'Animation / Fantasy',
            year: '2001',
            duration: '2h 05m',
            rating: 4.9,
            synopsis: 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
            poster: 'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_.jpg',
            backdrop: 'https://i.ebayimg.com/images/g/YewAAOSwwu9nJuwO/s-l1200.jpg',
            trailer: 'https://www.youtube.com/embed/ByXuk9QqQkk',
            cast: [
                { name: 'Rumi Hiiragi', character: 'Chihiro (voice)', image: 'https://image.tmdb.org/t/p/w200/z.jpg' },
                { name: 'Miyu Irino', character: 'Haku (voice)', image: 'https://image.tmdb.org/t/p/w200/s.jpg' }
            ]
        },
        {
            id: 22,
            title: 'Black Panther',
            genre: 'Action / Sci-Fi',
            year: '2018',
            duration: '2h 14m',
            rating: 4.6,
            synopsis: 'King T\'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new leader. However, T\'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.',
            poster: 'https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg',
            trailer: 'https://www.youtube.com/embed/xjDjIWPwcPU',
            cast: [
                { name: 'Chadwick Boseman', character: 'T\'Challa / Black Panther', image: 'https://image.tmdb.org/t/p/w200/n.jpg' },
                { name: 'Michael B. Jordan', character: 'N\'Jadaka / Erik "Killmonger" Stevens', image: 'https://image.tmdb.org/t/p/w200/bf.jpg' }
            ]
        },
        {
            id: 23,
            title: 'Titanic',
            genre: 'Drama / Romance',
            year: '1997',
            duration: '3h 14m',
            rating: 4.7,
            synopsis: '101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from departure until the death of Titanic.',
            poster: 'https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/yDI6D5ke51YwP8uZv6kL5.jpg',
            trailer: 'https://www.youtube.com/embed/kVrqfYjkTdQ',
            cast: [
                { name: 'Leonardo DiCaprio', character: 'Jack Dawson', image: 'https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
                { name: 'Kate Winslet', character: 'Rose DeWitt Bukater', image: 'https://image.tmdb.org/t/p/w200/e3tdop3WhseRzz8kMq7bjThdDrX.jpg' }
            ]
        },
        {
            id: 24,
            title: 'Whiplash',
            genre: 'Drama / Music',
            year: '2014',
            duration: '1h 47m',
            rating: 4.8,
            synopsis: 'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.',
            poster: 'https://cdn.displate.com/artwork/857x1200/2025-09-08/82c5e624-bd10-45a0-b82b-4d6072a60122.jpg',
            backdrop: 'https://twinchaptertrading.mta4.sitegiant.cc/image/twinchaptertrading/image/cache/data/all_product_images/product-4422/50-1343x1488.jpg',
            trailer: 'https://www.youtube.com/embed/7d_jQycdQGo',
            cast: [
                { name: 'Miles Teller', character: 'Andrew Neiman', image: 'https://image.tmdb.org/t/p/w200/4h8Wp3e5O5q7gR9.jpg' },
                { name: 'J.K. Simmons', character: 'Terence Fletcher', image: 'https://image.tmdb.org/t/p/w200/7kIiPojgSVNRXb5z0slOL20bNm2.jpg' }
            ]
        },
        {
            id: 25,
            title: 'The Lord of the Rings: The Return of the King',
            genre: 'Fantasy / Adventure',
            year: '2003',
            duration: '3h 21m',
            rating: 5.0,
            synopsis: 'Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron\'s forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord\'s realm.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            backdrop: 'https://literariness.org/wp-content/uploads/2021/02/wp4119629.jpg',
            trailer: 'https://www.youtube.com/embed/r5X-hFf6Bwo',
            cast: [
                { name: 'Elijah Wood', character: 'Frodo Baggins', image: 'https://image.tmdb.org/t/p/w200/7usqHed1I9R5Xe89r1Uz031ol0c.jpg' },
                { name: 'Ian McKellen', character: 'Gandalf', image: 'https://image.tmdb.org/t/p/w200/5NXjnTeYeGbdF9KmoKz0496x_1.jpg' }
            ]
        },
        {
            id: 26,
            title: 'Goodfellas',
            genre: 'Crime / Drama',
            year: '1990',
            duration: '2h 26m',
            rating: 4.8,
            synopsis: 'The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.',
            poster: 'https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCqCDnO.jpg',
            trailer: 'https://www.youtube.com/embed/qo5jJpHtI1Y',
            cast: [
                { name: 'Ray Liotta', character: 'Henry Hill', image: 'https://image.tmdb.org/t/p/w200/lIwF1T1s97V1xS7xXoE6rD.jpg' },
                { name: 'Robert De Niro', character: 'Jimmy Conway', image: 'https://image.tmdb.org/t/p/w200/cT8.jpg' }
            ]
        },
        {
            id: 27,
            title: 'Schindler\'s List',
            genre: 'Drama / History',
            year: '1993',
            duration: '3h 15m',
            rating: 4.9,
            synopsis: 'The true story of how Oskar Schindler, a German industrialist and member of the Nazi party, saved the lives of more than a thousand Jewish refugees from the Holocaust by employing them in his factories during World War II.',
            poster: 'https://image.tmdb.org/t/p/original/doGEE2DgjET0XK0k9BozsMBES5H.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/zb6fM1CX41D9rF9hdgclu0peUmy.jpg',
            trailer: 'https://www.youtube.com/embed/gG22XNhtnoY',
            cast: [
                { name: 'Liam Neeson', character: 'Oskar Schindler', image: 'https://image.tmdb.org/t/p/w200/wloLd5yrrzMbBE8972ezh0d8.jpg' },
                { name: 'Ben Kingsley', character: 'Itzhak Stern', image: 'https://image.tmdb.org/t/p/w200/vQtBqpF2HDdzbfXHDzR4u37i1D.jpg' }
            ]
        },
        {
            id: 28,
            title: 'Star Wars: A New Hope',
            genre: 'Sci-Fi / Adventure',
            year: '1977',
            duration: '2h 01m',
            rating: 4.8,
            synopsis: 'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic empire. Venturesome Luke Skywalker and dashing captain Han Solo team up with the lovable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the empire.',
            poster: 'https://image.tmdb.org/t/p/original/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/4qC1maUv0DwdxpLvvvWpm9ZfsN5.jpg',
            trailer: 'https://www.youtube.com/embed/vZ734NWnAHA',
            cast: [
                { name: 'Mark Hamill', character: 'Luke Skywalker', image: 'https://image.tmdb.org/t/p/w200/zzW.jpg' },
                { name: 'Harrison Ford', character: 'Han Solo', image: 'https://image.tmdb.org/t/p/w200/5M7oN3sznp99hETDoC0.jpg' }
            ]
        },
        {
            id: 29,
            title: 'Saving Private Ryan',
            genre: 'War / Drama',
            year: '1998',
            duration: '2h 49m',
            rating: 4.8,
            synopsis: 'As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.',
            poster: 'https://i.pinimg.com/474x/d9/03/67/d9036710e387d04fb5c74d37159972a9.jpg',
            backdrop: 'https://images.alphacoders.com/640/640390.jpg',
            trailer: 'https://www.youtube.com/embed/zwhP5b4tD6g',
            cast: [
                { name: 'Tom Hanks', character: 'Capt. John H. Miller', image: 'https://image.tmdb.org/t/p/w200/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg' },
                { name: 'Matt Damon', character: 'Pvt. James Francis Ryan', image: 'https://image.tmdb.org/t/p/w200/elSlNgV8xVifsbHpFnb9405.jpg' }
            ]
        },
        {
            id: 30,
            title: 'The Green Mile',
            genre: 'Fantasy / Drama',
            year: '1999',
            duration: '3h 09m',
            rating: 4.9,
            synopsis: 'A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people\'s ailments. When the cell block\'s head guard, Paul Edgecomb, recognizes Coffey\'s miraculous gift, he tries desperately to help stave off the condemned man\'s execution.',
            poster: 'https://image.tmdb.org/t/p/original/ejYzY2mL304gSXPJT3pJesSMz2z.jpg',
            backdrop: 'https://wallpapercat.com/w/full/d/4/7/58005-3840x2160-desktop-4k-the-green-mile-wallpaper-photo.jpg',
            trailer: 'https://www.youtube.com/embed/Ki4haFrOSGc',
            cast: [
                { name: 'Tom Hanks', character: 'Paul Edgecomb', image: 'https://image.tmdb.org/t/p/w200/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg' },
                { name: 'Michael Clarke Duncan', character: 'John Coffey', image: 'https://image.tmdb.org/t/p/w200/3qDki.jpg' }
            ]
        },
        {
            id: 31,
            title: 'WALL·E',
            genre: 'Animation / Family',
            year: '2008',
            duration: '1h 38m',
            rating: 4.8,
            synopsis: 'WALL·E is the last robot left on an Earth that has been overrun with garbage and all humans have fled to outer space. For 700 years he has continued to try and clean up the mess, but has developed some rather interesting human-like qualities.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMzk0ZGMzMDYtMDJkYS00NTdhLWJlZWUtMTdhOTJkOTM3NDUwXkEyXkFqcGc@._V1_.jpg',
            backdrop: 'https://posterspy.com/wp-content/uploads/2021/08/POSTERSFORPOSTERSPY4-480x338.jpg',
            trailer: 'https://www.youtube.com/embed/CZ1CATNbXg0',
            cast: [
                { name: 'Ben Burtt', character: 'WALL·E (voice)', image: 'https://image.tmdb.org/t/p/w200/b1.jpg' },
                { name: 'Elissa Knight', character: 'EVE (voice)', image: 'https://image.tmdb.org/t/p/w200/eK.jpg' }
            ]
        },
        {
            id: 32,
            title: 'The Truman Show',
            genre: 'Comedy / Drama',
            year: '1998',
            duration: '1h 43m',
            rating: 4.7,
            synopsis: 'Truman Burbank is the star of "The Truman Show", a 24-hour-a-day reality TV show that broadcasts every aspect of his life to a nation of voyeurs without his knowledge.',
            poster: 'https://i.pinimg.com/736x/2e/9e/da/2e9eda32240e70e7c4568f6cfa96c3c7.jpg',
            backdrop: 'https://popcult.blog/wp-content/uploads/2022/01/truman-show-banner.png',
            trailer: 'https://www.youtube.com/embed/dako',
            cast: [
                { name: 'Jim Carrey', character: 'Truman Burbank', image: 'https://image.tmdb.org/t/p/w200/z.jpg' },
                { name: 'Ed Harris', character: 'Christof', image: 'https://image.tmdb.org/t/p/w200/l.jpg' }
            ]
        },
        {
            id: 33,
            title: 'Up',
            genre: 'Animation / Adventure',
            year: '2009',
            duration: '1h 36m',
            rating: 4.8,
            synopsis: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
            poster: 'https://soundvapors.com/wp-content/uploads/2020/11/up.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BMTQxMDA0MDI4MV5BMl5BanBnXkFtZTcwMTU5OTIzMw@@._V1_QL75_UX391_.jpg',
            trailer: 'https://www.youtube.com/embed/ORFWdXl_zJ4',
            cast: [
                { name: 'Ed Asner', character: 'Carl Fredricksen (voice)', image: 'https://image.tmdb.org/t/p/w200/a.jpg' },
                { name: 'Jordan Nagai', character: 'Russell (voice)', image: 'https://image.tmdb.org/t/p/w200/j.jpg' }
            ]
        },
        {
            id: 34,
            title: 'Toy Story',
            genre: 'Animation / Family',
            year: '1995',
            duration: '1h 21m',
            rating: 4.9,
            synopsis: 'Led by Woody, Andy\'s toys live happily in his room until Andy\'s birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy\'s heart, Woody plots against Buzz. But when circumstances separate them from Andy, they must fight together to survive.',
            poster: 'https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/lxD5ak7BOohy2qF.jpg',
            trailer: 'https://www.youtube.com/embed/CxwTLktovTU',
            cast: [
                { name: 'Tom Hanks', character: 'Woody (voice)', image: 'https://image.tmdb.org/t/p/w200/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg' },
                { name: 'Tim Allen', character: 'Buzz Lightyear (voice)', image: 'https://image.tmdb.org/t/p/w200/uX2xVf6pMmPepxcn77dfqaa.jpg' }
            ]
        },
        {
            id: 35,
            title: 'The Departed',
            genre: 'Crime / Drama',
            year: '2006',
            duration: '2h 31m',
            rating: 4.7,
            synopsis: 'To take down South Boston\'s Irish Mafia, the police send in one of their own to infiltrate the underworld, not realizing the syndicate has done likewise.',
            poster: 'https://m.media-amazon.com/images/M/MV5BYmE2NDE1ZjMtZDE2ZS00MGU1LWJiN2MtYjYxY2YyZTkyMzAyXkEyXkFqcGc@._V1_.jpg',
            backdrop: 'https://m.media-amazon.com/images/I/71XlLHgkLFL._AC_UF894,1000_QL80_.jpg',
            trailer: 'https://www.youtube.com/embed/iojhqm0JTW4',
            cast: [
                { name: 'Leonardo DiCaprio', character: 'Billy Costigan', image: 'https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
                { name: 'Matt Damon', character: 'Colin Sullivan', image: 'https://image.tmdb.org/t/p/w200/elSlNgV8xVifsbHpFnb9405.jpg' }
            ]
        },
        {
            id: 36,
            title: 'The Prestige',
            genre: 'Thriller / Drama',
            year: '2006',
            duration: '2h 10m',
            rating: 4.8,
            synopsis: 'A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.',
            poster: 'https://cdn.displate.com/artwork/857x1200/2024-10-31/f47fff10-31e6-4319-b06e-2e3f2f87560a.jpg',
            backdrop: 'https://images8.alphacoders.com/112/1121403.jpg',
            trailer: 'https://www.youtube.com/embed/o4gHCmTQDVI',
            cast: [
                { name: 'Hugh Jackman', character: 'Robert Angier', image: 'https://image.tmdb.org/t/p/w200/o.jpg' },
                { name: 'Christian Bale', character: 'Alfred Borden', image: 'https://image.tmdb.org/t/p/w200/b7fTC9WFkgqGOv77mLQzsDcyRI8.jpg' }
            ]
        },
        {
            id: 37,
            title: 'Memento',
            genre: 'Mystery / Thriller',
            year: '2000',
            duration: '1h 53m',
            rating: 4.7,
            synopsis: 'Leonard Shelby is tracking down the man who raped and murdered his wife. The difficulty of locating his wife\'s killer, however, is compounded by the fact that he suffers from a rare, untreatable form of memory loss.',
            poster: 'https://res.cloudinary.com/jerrick/image/upload/v1752208911/6870960ecc787d001d0844f7.jpg',
            backdrop: 'https://m.media-amazon.com/images/M/MV5BOTVmZTFhNmEtNDE3MS00MjhhLWI2ZDEtYzkyNjgzZGNlMTBhXkEyXkFqcGc@._V1_.jpg',
            trailer: 'https://www.youtube.com/embed/0vS0E9bBSL0',
            cast: [
                { name: 'Guy Pearce', character: 'Leonard Shelby', image: 'https://image.tmdb.org/t/p/w200/v.jpg' },
                { name: 'Carrie-Anne Moss', character: 'Natalie', image: 'https://image.tmdb.org/t/p/w200/8.jpg' }
            ]
        },
        {
            id: 38,
            title: 'Django Unchained',
            genre: 'Western / Drama',
            year: '2012',
            duration: '2h 45m',
            rating: 4.8,
            synopsis: 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
            poster: 'https://limelightmovieart.com/wp-content/uploads/2023/05/Django-Unchained-US-1S-Adv.-2012-fifth-copy-655x989.jpg',
            backdrop: 'https://10wallpaper.com/wallpaper/1920x1080/1305/Django_Unchained_Movie_HD_Desktop_Wallpaper_03_1920x1080.jpg',
            trailer: 'https://www.youtube.com/embed/0fUCuvNlOCg',
            cast: [
                { name: 'Jamie Foxx', character: 'Django', image: 'https://image.tmdb.org/t/p/w200/h.jpg' },
                { name: 'Christoph Waltz', character: 'Dr. King Schultz', image: 'https://image.tmdb.org/t/p/w200/2.jpg' }
            ]
        },
        {
            id: 39,
            title: 'The Wolf of Wall Street',
            genre: 'Comedy / Crime',
            year: '2013',
            duration: '3h 00m',
            rating: 4.7,
            synopsis: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
            poster: 'https://i.ebayimg.com/images/g/TyUAAOSwjxZgz6Rj/s-l400.jpg',
            backdrop: 'https://wallpapers.com/images/hd/the-wolf-of-wall-street-5yh17izfpouw7xrg.jpg',
            trailer: 'https://www.youtube.com/embed/iszwuX1AK6A',
            cast: [
                { name: 'Leonardo DiCaprio', character: 'Jordan Belfort', image: 'https://image.tmdb.org/t/p/w200/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
                { name: 'Jonah Hill', character: 'Donnie Azoff', image: 'https://image.tmdb.org/t/p/w200/c.jpg' }
            ]
        },
        {
            id: 40,
            title: 'Mad Max: Fury Road',
            genre: 'Action / Sci-Fi',
            year: '2015',
            duration: '2h 00m',
            rating: 4.8,
            synopsis: 'An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.',
            poster: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/a6277c169328487.644a87f7d7f4f.jpg',
            backdrop: 'https://w0.peakpx.com/wallpaper/924/404/HD-wallpaper-movie-mad-max-fury-road-charlize-theron-imperator-furiosa-max-rockatansky-tom-hardy.jpg',
            trailer: 'https://www.youtube.com/embed/hEJnMQG9ev8',
            cast: [
                { name: 'Tom Hardy', character: 'Max Rockatansky', image: 'https://image.tmdb.org/t/p/w200/y.jpg' },
                { name: 'Charlize Theron', character: 'Imperator Furiosa', image: 'https://image.tmdb.org/t/p/w200/f.jpg' }
            ]
        },
        {
            id: 41,
            title: 'Logan',
            genre: 'Action / Drama',
            year: '2017',
            duration: '2h 17m',
            rating: 4.8,
            synopsis: 'In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan\'s attempts to hide from the world and his legacy are upended when a young mutant arrives, being pursued by dark forces.',
            poster: 'https://lumiere-a.akamaihd.net/v1/images/au_movies_20cs_logan_poster_f1907839.jpeg',
            backdrop: 'https://blog.richersounds.com/wp-content/uploads/2017/03/logan-1024x538.jpg',
            trailer: 'https://www.youtube.com/embed/Div0iP65aZo',
            cast: [
                { name: 'Hugh Jackman', character: 'Logan / Wolverine', image: 'https://image.tmdb.org/t/p/w200/o.jpg' },
                { name: 'Patrick Stewart', character: 'Charles Xavier', image: 'https://image.tmdb.org/t/p/w200/w.jpg' }
            ]
        },
        {
            id: 42,
            title: 'Inside Out',
            genre: 'Animation / Family',
            year: '2015',
            duration: '1h 35m',
            rating: 4.9,
            synopsis: 'Growing up can be a bumpy road, and it\'s no exception for Riley, who is uprooted from her Midwest life when her father starts a new job in San Francisco. Riley is guided by her emotions - Joy, Fear, Anger, Disgust and Sadness.',
            poster: 'https://samcdesignblog.wordpress.com/wp-content/uploads/2020/09/inside-out.jpg',
            backdrop: 'https://4kwallpapers.com/images/wallpapers/pixar-inside-out-2-2560x1440-17087.jpg',
            trailer: 'https://www.youtube.com/embed/yRUAzGQ3nSY',
            cast: [
                { name: 'Amy Poehler', character: 'Joy (voice)', image: 'https://image.tmdb.org/t/p/w200/k.jpg' },
                { name: 'Phyllis Smith', character: 'Sadness (voice)', image: 'https://image.tmdb.org/t/p/w200/t.jpg' }
            ]
        },
        {
            id: 43,
            title: 'Finding Nemo',
            genre: 'Animation / Family',
            year: '2003',
            duration: '1h 40m',
            rating: 4.8,
            synopsis: 'Clownfish Marlin lives in the Great Barrier Reef and loses his son, Nemo. After he ventures into the open sea, despite his father\'s constant warnings about many of the ocean\'s dangers, Nemo is abducted by a boat and netted up and sent to a dentist\'s office in Sydney.',
            poster: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/344/2024/07/11065839/eHuGQ10FUzK1mdOY69wF5pGgEf5-683x1024.jpg',
            backdrop: 'https://www.rotoscopers.com/wp-content/uploads/2015/06/finding-nemo-promo.jpg',
            trailer: 'https://www.youtube.com/embed/wZdpNglLbt8',
            cast: [
                { name: 'Albert Brooks', character: 'Marlin (voice)', image: 'https://image.tmdb.org/t/p/w200/r.jpg' },
                { name: 'Ellen DeGeneres', character: 'Dory (voice)', image: 'https://image.tmdb.org/t/p/w200/z.jpg' }
            ]
        },
        {
            id: 44,
            title: 'The Incredibles',
            genre: 'Animation / Action',
            year: '2004',
            duration: '1h 55m',
            rating: 4.8,
            synopsis: 'Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three exuberant children with his formerly heroic wife in suburbia. But when he receives a mysterious assignment, it\'s time to get back into costume.',
            poster: 'https://www.filmonpaper.com/wp-content/uploads/2011/05/TheIncredibles_onesheet_advance_unreleased_USA_RobertMcGinnis-1.jpg',
            backdrop: 'https://wallpapers.com/images/hd/mr-incredible-pixar-the-incredibles-movie-by1j1ocdvuub7okq.jpg',
            trailer: 'https://www.youtube.com/watch?v=sJCjKQQOqT0',
            cast: [
                { name: 'Craig T. Nelson', character: 'Bob Parr / Mr. Incredible (voice)', image: 'https://image.tmdb.org/t/p/w200/c.jpg' },
                { name: 'Holly Hunter', character: 'Helen Parr / Elastigirl (voice)', image: 'https://image.tmdb.org/t/p/w200/h.jpg' }
            ]
        },
        {
            id: 45,
            title: 'Fight Club',
            genre: 'Drama',
            year: '1999',
            duration: '2h 19m',
            rating: 4.8,
            synopsis: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
            poster: 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
            trailer: 'https://www.youtube.com/embed/qtRKdVHc-cE',
            cast: [
                { name: 'Edward Norton', character: 'The Narrator', image: 'https://image.tmdb.org/t/p/w200/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg' },
                { name: 'Brad Pitt', character: 'Tyler Durden', image: 'https://image.tmdb.org/t/p/w200/cckcYc2v0yh1tc9QjRelptcOBko.jpg' }
            ]
        },
        {
            id: 46,
            title: 'Se7en',
            genre: 'Crime / Mystery',
            year: '1995',
            duration: '2h 07m',
            rating: 4.8,
            synopsis: 'Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the "seven deadly sins" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next.',
            poster: 'https://cdn.posteritati.com/posters/000/000/020/714/seven-md-web.jpg',
            backdrop: 'https://static0.colliderimages.com/wordpress/wp-content/uploads/2024/02/se7en-feature.jpg',
            trailer: 'https://www.youtube.com/embed/znmZoVkCjpI',
            cast: [
                { name: 'Brad Pitt', character: 'Detective David Mills', image: 'https://image.tmdb.org/t/p/w200/cckcYc2v0yh1tc9QjRelptcOBko.jpg' },
                { name: 'Morgan Freeman', character: 'Detective William Somerset', image: 'https://image.tmdb.org/t/p/w200/oIciQWr8VwKoR8TmAw1owaiZFyb.jpg' }
            ]
        },
        {
            id: 47,
            title: 'The Silence of the Lambs',
            genre: 'Crime / Drama',
            year: '1991',
            duration: '1h 58m',
            rating: 4.8,
            synopsis: 'Clarice Starling is a top student at the FBI\'s training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.',
            poster: 'https://image.tmdb.org/t/p/original/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/mfwq2nMBzVezh0vPEPtXhmBlSOt.jpg',
            trailer: 'https://www.youtube.com/embed/W6Mm8Sbe__o',
            cast: [
                { name: 'Jodie Foster', character: 'Clarice Starling', image: 'https://image.tmdb.org/t/p/w200/3A119Mbd8Xb3I8b2c2QJgE4fD.jpg' },
                { name: 'Anthony Hopkins', character: 'Dr. Hannibal Lecter', image: 'https://image.tmdb.org/t/p/w200/9ukJS2Q5J2zB5jW1c5bK8z5bJ.jpg' }
            ]
        },
        {
            id: 48,
            title: 'Back to the Future',
            genre: 'Adventure / Comedy',
            year: '1985',
            duration: '1h 56m',
            rating: 4.8,
            synopsis: 'Marty McFly, a typical American teenager of the Eighties, is accidentally sent back to 1955 in a plutonium-powered DeLorean "time machine" invented by a slightly mad scientist. During his often hysterical, always amazing trip back in time, Marty must make certain his teenage parents-to-be meet and fall in love - so he can get back to the future.',
            poster: 'https://imgc.allpostersimages.com/img/posters/trends-international-back-to-the-future-part-ii-one-sheet_u-L-Q1RG0YL0.jpg',
            backdrop: 'https://i.pinimg.com/736x/7f/97/9d/7f979d05934cdd5769c45cb5d5442b3e.jpg',
            trailer: 'https://www.youtube.com/embed/qvsgGtivCgs',
            cast: [
                { name: 'Michael J. Fox', character: 'Marty McFly', image: 'https://image.tmdb.org/t/p/w200/2B9mBK5u8jZ8c2yQ7o7qH.jpg' },
                { name: 'Christopher Lloyd', character: 'Dr. Emmett Brown', image: 'https://image.tmdb.org/t/p/w200/nxVjK8f8j8j8j8j8.jpg' }
            ]
        },
        {
            id: 49,
            title: 'Ratatouille',
            genre: 'Animation / Comedy',
            year: '2007',
            duration: '1h 51m',
            rating: 4.8,
            synopsis: 'Remy, a resident of Paris, appreciates good food and has quite a sophisticated palate. He would love to become a chef so he can create and enjoy culinary masterpieces to his heart\'s delight. The only problem is, Remy is a rat. When he winds up in the sewer beneath one of Paris\' finest restaurants, the rodent steps up to the challenge of turning his dream into a reality.',
            poster: 'https://image.tmdb.org/t/p/original/npHNjldbeTHdKKw28bJKs7lzqzj.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/xgD95.jpg',
            trailer: 'https://www.youtube.com/embed/c3sBBRxDAqk',
            cast: [
                { name: 'Patton Oswalt', character: 'Remy (voice)', image: 'https://image.tmdb.org/t/p/w200/8g.jpg' },
                { name: 'Lou Romano', character: 'Alfredo Linguini (voice)', image: 'https://image.tmdb.org/t/p/w200/5.jpg' }
            ]
        },
        {
            id: 50,
            title: 'The Social Network',
            genre: 'Drama',
            year: '2010',
            duration: '2h 00m',
            rating: 4.7,
            synopsis: 'On a fall night in 2003, Harvard undergrad and computer programming genius Mark Zuckerberg sits down at his computer and heatedly begins working on a new idea. In a fury of blogging and programming, what begins in his dorm room as a small site among friends soon becomes a global social network and a revolution in communication.',
            poster: 'https://i.pinimg.com/736x/79/51/05/795105bdfe8bb26e8cf5e1ea088f61d1.jpg',
            backdrop: 'https://cdn.appleosophy.com/2021/02/a44687ba-wp5959638.jpg',
            trailer: 'https://www.youtube.com/embed/lB95KLmpLR4',
            cast: [
                { name: 'Jesse Eisenberg', character: 'Mark Zuckerberg', image: 'https://image.tmdb.org/t/p/w200/2.jpg' },
                { name: 'Andrew Garfield', character: 'Eduardo Saverin', image: 'https://image.tmdb.org/t/p/w200/b.jpg' }
            ]
        },
        {
            id: 51,
            title: 'The Shawshank Redemption',
            genre: 'Drama / Crime',
            year: '1994',
            duration: '2h 22m',
            rating: 5.0,
            synopsis: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.',
            poster: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/2fa44b15344917.5628fd261893b.jpg',
            backdrop: 'https://img.englishcinemazurich.com/Nh0Jt5ORLp7ZKIE9L7GzG1scmjpmZtRuiyVp6D9oPVI/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy9jYTk0MDU5NS01MjIwLTQxNDgtOTlhYy0yMTExNWM0ZjkxMDcuanBn.jpg',
            trailer: 'https://www.youtube.com/embed/6hB3S9bIaco',
            cast: [
                { name: 'Tim Robbins', character: 'Andy Dufresne', image: 'https://image.tmdb.org/t/p/w200/A3oM8F9xQ6iQ94A3v3.jpg' },
                { name: 'Morgan Freeman', character: 'Ellis Boyd "Red" Redding', image: 'https://image.tmdb.org/t/p/w200/oIciQWr8VwKoR8TmAw1owaiZFyb.jpg' }
            ]
        },
        {
            id: 52,
            title: 'Blade Runner 2049',
            genre: 'Sci-Fi / Drama',
            year: '2017',
            duration: '2h 44m',
            rating: 4.7,
            synopsis: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what’s left of society into chaos. K’s discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.',
            poster: 'https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
            trailer: 'https://www.youtube.com/embed/gCcx85zbxz4',
            cast: [
                { name: 'Ryan Gosling', character: 'K', image: 'https://image.tmdb.org/t/p/w200/4X1w0H6k1e7q3e5r8s.jpg' },
                { name: 'Harrison Ford', character: 'Rick Deckard', image: 'https://image.tmdb.org/t/p/w200/5M7oN3sznp99hETDoC0.jpg' }
            ]
        },
        {
            id: 53,
            title: 'La La Land',
            genre: 'Comedy / Drama',
            year: '2016',
            duration: '2h 08m',
            rating: 4.6,
            synopsis: 'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair.',
            poster: 'https://i.pinimg.com/736x/6f/81/aa/6f81aac23be6bdf5404ac21de81f2ad5.jpg',
            backdrop: 'https://i.pinimg.com/736x/0e/84/d5/0e84d580eb24bffc3dabc017412d7a4d.jpg',
            trailer: 'https://www.youtube.com/embed/0pdqf4P9MB8',
            cast: [
                { name: 'Ryan Gosling', character: 'Sebastian Wilder', image: 'https://image.tmdb.org/t/p/w200/4X1w0H6k1e7q3e5r8s.jpg' },
                { name: 'Emma Stone', character: 'Mia Dolan', image: 'https://image.tmdb.org/t/p/w200/2wmC.jpg' }
            ]
        },
        {
            id: 54,
            title: 'Get Out',
            genre: 'Mystery / Thriller',
            year: '2017',
            duration: '1h 44m',
            rating: 4.8,
            synopsis: 'Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family\'s overly accommodating behavior as nervous attempts to deal with their daughter\'s interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries lead him to a truth that he could never have imagined.',
            poster: 'https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg',
            trailer: 'https://www.youtube.com/embed/DzfpyUB60YY',
            cast: [
                { name: 'Daniel Kaluuya', character: 'Chris Washington', image: 'https://image.tmdb.org/t/p/w200/4.jpg' },
                { name: 'Allison Williams', character: 'Rose Armitage', image: 'https://image.tmdb.org/t/p/w200/a.jpg' }
            ]
        },
        {
            id: 55,
            title: 'The Grand Budapest Hotel',
            genre: 'Comedy / Drama',
            year: '2014',
            duration: '1h 40m',
            rating: 4.7,
            synopsis: 'The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé. The story involves the theft and recovery of a priceless Renaissance painting, the battle for an enormous family fortune and the slow and then sudden changes that swept Europe during the first half of the 20th century.',
            poster: 'https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/wE.jpg',
            trailer: 'https://www.youtube.com/embed/1Fg5iGnJxdk',
            cast: [
                { name: 'Ralph Fiennes', character: 'M. Gustave', image: 'https://image.tmdb.org/t/p/w200/t.jpg' },
                { name: 'Tony Revolori', character: 'Zero', image: 'https://image.tmdb.org/t/p/w200/z.jpg' }
            ]
        },
        // --- COMING SOON SECTION (Updated with Backdrop & Trailers) ---
        {
            id: 201,
            title: "Deadpool & Wolverine",
            genre: "Action / Comedy",
            year: "2024",
            duration: "2h 10m",
            rating: 0,
            poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
            synopsis: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool.",
            trailer: "https://www.youtube.com/embed/73_1biulkYk"
        },
        {
            id: 202,
            title: "Joker: Folie à Deux",
            genre: "Drama / Musical",
            year: "2024",
            duration: "2h 18m",
            rating: 0,
            poster: "https://image.tmdb.org/t/p/w500/aciP8Km0waTLXEYf5ybFK5CSUxl.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/c3rBV1S5j5qG5j8f3a3q3g4.jpg", // Placeholder - check for actual link if broken
            trailer: "https://www.youtube.com/embed/xy8aJw1vYHo"
        },
        {
            id: 203,
            title: "Gladiator 2",
            genre: "Action / Drama",
            year: "2024",
            duration: "TBA",
            rating: 0,
            poster: "https://orangemagazine.ph/wp-content/uploads/2024/10/GLADIATOR-II-2.jpg",
            backdrop: "https://indieentertainmentmedia.com/wp-content/uploads/2024/12/HO00003140.jpg", // Reusing Gladiator 1 as placeholder
            trailer: "https://www.youtube.com/embed/owK1qxDselE" // Using Gladiator 1 trailer as placeholder
        },
        {
            id: 204,
            title: "Mufasa: The Lion King",
            genre: "Animation / Adventure",
            year: "2024",
            duration: "TBA",
            rating: 0,
            poster: "https://cdn.moviefone.com/admin-uploads/highlights/images/mufasa-thelionking-poster_1733573409.jpg",
            backdrop: "https://www.tucmag.net/wp-content/uploads/2024/12/Mufasa-featured.jpeg", // Reusing Lion King 1
            trailer: "https://www.youtube.com/embed/4sj1MT05lAA" // Reusing Lion King 1
        },
        {
            id: 205,
            title: "Venom: The Last Dance",
            genre: "Action / Sci-Fi",
            year: "2024",
            duration: "TBA",
            rating: 0,
            poster: "https://media.themoviedb.org/t/p/w220_and_h330_face/A9UWGDAEUtu6DwAtiJX3XOsHvTG.jpg",
            backdrop: "https://butwhytho.net/wp-content/uploads/2024/10/Venom-3-The-Last-Dance-But-Why-Tho.jpg", // Placeholder
            trailer: "https://www.youtube.com/embed/u9Mv98Gr5pY" // Venom 1 Trailer as placeholder
        }
    ]

    // --- STATE INITIALIZATION ---
    // 1. Try to load from LocalStorage first (User's edited data)
    // 2. Fallback to defaultMovies (Original + Coming Soon)
    const stored = localStorage.getItem('adminMovies')
    const movies = ref(stored ? JSON.parse(stored) : defaultMovies)

    // --- PERSISTENCE WATCHER ---
    // Automatically save changes to LocalStorage when Admin adds/deletes
    watch(movies, (newVal) => {
        localStorage.setItem('adminMovies', JSON.stringify(newVal))
    }, { deep: true })

    // --- GETTERS & ACTIONS ---
    const getMovieById = (id) => {
        return movies.value.find(m => m.id == id)
    }

    const trendingMovies = computed(() => {
        return movies.value.slice(0, 3)
    })

    return {
        movies,
        getMovieById,
        trendingMovies
    }
})