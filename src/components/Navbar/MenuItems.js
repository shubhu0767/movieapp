export const menuItems = [
  { id: '01', name: "Home", url: "/" },
  { id: '02', name: "TV Shows", url: "/tv" },
  {
    id: '03',
    name: "Movies",
    url: "/movie",
    subMenu: [
      { id: '011', name: "HollyWood Movies", url: "/movies/hollywood" },
      { id: '012', name: "BollyWood Movies", url: "/movies/bollywood" },
    ],
  },
  { id: '04', name: "Artist", url: "/artist" }
];
