//  Need to fill in your apikey
var apikey = "jmhwq3qnuhgueu4x9ya7q4ph9cu6yhzs";
var region = "eu";
var minlevel = 100;
// Guild ranks are different for each guild - please input the correct values here.
var ranks=[{rank:"Guild master", id: 0},
    {rank:"", id: 1},
    {rank:"Officer", id: 2},
    {rank:"Veteran", id: 3},
    {rank:"", id: 4},
    {rank:"Member", id: 5},
    {rank:"På prøve", id: 6},
    {rank:"Officer alt", id: 7},
    {rank:"Alt", id: 8},
    {rank:"Casual", id: 9}];
// Set required itemlevel to be raidready
var raidReady = 835;
// Guild and server info
var guildName = "The Axemen";
var serverName = "Ravencrest";
// Stats EN: "Stats"
var stats_string = "Stats";
// Stats, Primary EN: "Primary"
var stats_primary_string = "Primary";
// Stats, Secondary EN: "Secondary"
var stats_secondary_string = "Secondary";
// Stats, Talents EN: "Talents"
var stats_talents_string = "Talents";
// Stats, Item level EN: "Item level "
var items_itemlevel_string ="Item level ";

// Activity EN: "Active"
var activity_string = "Sist aktiv";
// Today EN: "today"
var today_string = "idag";
// Since EN: "days ago"
var since_string = "dager siden";
// Not raid ready EN: "not raid ready"
var raidready_string = "ikke raidklar";
// EN: "raid ready"
var raidready_string2 = "Raidklar";
// History EN: "history"
var history_string = "Historie";
// Back EN: "back"
var back_string = "tilbake";
// Missing ilvl EN: "ilvl, is the minimum value for raids - you are missing"
var ilvl_string = "ilvl, er minimum ilevel for raid - du mangler";

// Crafted EN: "Crafted"
var craft_string = "Snekret";
// Bought EN: "Bought"
var bought_string = "Kjøpt";
// Looted EN: "Looted"
var looted_string = "Loota";
// Achieved EN: "Achieved"
var achieved_string = "Klart";

// Close Filter EN: "Close filter menu"
var close_filter_string = "Lukk filtreringsmeny";
// Open Filter EN: "Open filter menu"
var open_filter_string = "Legg til filtrering";
// Delete filter EN: "Delete all filters"
var delete_filter_string = "Fjerne filtrering";
// Menu EN: "Menu"
var menu_string = "news";

// Specific character info
var page2_string = "Karakterinfo";

// Guild news
var page3_string = "Nyheter";

// News
var newstitle_string = "Nyheter";

// Modify this variable if you change any of the files. Its for deleting the localStorage data.
var version = 3;