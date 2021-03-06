
// Function to calculate time since input data.
function timeSince(dato) {
    console.log((new Date().getTime() / 1000).toString().split('.').shift() - dato.toString().split('.').shift());
    var returndate = (new Date().getTime() / 1000).toString().split('.').shift() - dato.toString().split('.').shift();
    return returndate;

}

// Prototype to create hashCode out of a string.
// "Prôóf" -> 77519973
String.prototype.hashCode = function () {
    var hashcode = 0, i, s, l;
    if (this.length === 0) return hashcode;
    for (i = 0, l = this.length; i < l; i++) {
        s = this.charCodeAt(i);
        hashcode = ((hashcode << 5) - hashcode) + s;
        hashcode |= 0;
    }
    return hashcode;
};

var axeApp = angular.module("axeApp", ["ngSanitize", "ngStorage", "ngBattleNet", "ui.router", "angular.filter", "ngMaterial", "md.data.table", "getData", "ngSanitize", "angular-loading-bar"]);

axeApp.config(['$stateProvider', '$urlRouterProvider', 'battleNetConfigProvider', '$mdThemingProvider', '$compileProvider', '$sceDelegateProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, battleNetConfigProvider, $mdThemingProvider, $compileProvider, $sceDelegateProvider, $locationProvider, cfpLoadingBarProvider) {

    // Sets the API key and region from the settings.js file
    battleNetConfigProvider.setApiKey(apikey);
    battleNetConfigProvider.setDefaultRegion(region);
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    cfpLoadingBarProvider.includeSpinner = false;

    // You can comment this out for debug
    //$compileProvider.debugInfoEnabled(false);

    // For umatchet url, henvis til guildsidene.
    $urlRouterProvider.otherwise("/guild");

    // Setter opp forskjellige states for behandling av URLer
    $stateProvider
        .state('char', {
            url: "/guild/:char",
            templateUrl: "partials/char.html",
            controller: ['wowApi', '$scope', '$stateParams', '$timeout', '$localStorage', 'dataJson', '$http', 'GetData', '$rootScope', function (wowApi, $scope, $stateParams, $timeout, $localStorage, dataJson, $http, GetData, $rootScope) {
                $rootScope.finishedLoading = false;
                /*wowApi.achievement({ id: 2144 }).then(function (response) {
                    $scope.test = angular.fromJson(response.data);

                });
                wowApi.item.item({ id: 71612 }).then(function (response) {
                    $scope.test2 = angular.fromJson(response.data);

                });*/
                $rootScope.page = 2;
                $rootScope.loadItems = false;
                $rootScope.loaderIcon = true;
                GetData.getChar($stateParams.char.hashCode()).then(
                    // Success
                    function (answer) {
                        $scope.char = angular.fromJson(answer.data);
                        $scope.$storage[$stateParams.char] = angular.fromJson(answer.data);

                        if (!$scope.$storage.time) {
                            console.log("time set");
                            $scope.$storage.time = new Date().getTime() / 1000;
                        }
                    },
                    // Fail
                    function (reason) {
                        $rootScope.updateData($stateParams.char);
                    }
                ).finally(function () {
                    // If char has value 404, reload it.
                    if (timeSince($scope.$storage.time) >= 3600) {
                        $rootScope.updateData($stateParams.char)
                    } else {

                        $timeout(function () {
                            $rootScope.loaderIcon = false;
                        }, 250);
                        $timeout(function () {
                            $WowheadPower.refreshLinks();
                        }, 1000);
                        $timeout(function () {
                            $rootScope.finishedLoading = true;
                            $rootScope.loadItems = true;
                        }, 1250);
                    }
                });
            }]
        })
        .state('guild', {
            url: "/guild",
            templateUrl: "partials/guild.html",
            controller: ['wowApi', '$scope', '$stateParams', '$timeout', '$localStorage', 'dataJson', '$http', 'GetData', '$rootScope', function (wowApi, $scope, $stateParams, $timeout, $localStorage, dataJson, $http, GetData, $rootScope) {
                $rootScope.page = 1;
                $rootScope.loadItems = false;
                $timeout(function () {
                    $rootScope.loadItems = true;
                }, 1250);
            }
            ]
        })
        .state('guildnews', {
            url: "/guildnews",
            templateUrl: "partials/gnews.html",
            controller: ['wowApi', '$scope', '$stateParams', '$timeout', '$localStorage', 'dataJson', '$http', 'GetData', '$rootScope', function (wowApi, $scope, $stateParams, $timeout, $localStorage, dataJson, $http, GetData, $rootScope) {
                $rootScope.finishedLoading = false;
                $rootScope.page = 3;
                $scope.newsType = $stateParams.type;
                $scope.raidTypes = [{ "name": "Ingen filter" }, { "type": "dungeon-normal", "name": "N.Dungeon" }, { "type": "dungeon-heroic", "name": "H.Dungeon" }, { "type": "dungeon-mythic", "name": "M.Dungeon" }, { "type": "raid-normal", "name": "N.Raid" }, { "type": "raid-heroic", "name": "H.Raid" }, { "type": "raid-mythic", "name": "M.Raid" }];
                $scope.changeNews = function (input) {
                    $state.go('guildnews_type', { type: input });
                }
                $rootScope.loadItems = false;
                $rootScope.loaderIcon = true;
                $scope.wowHead = function () {
                    $timeout(function () {
                        $WowheadPower.refreshLinks();
                    }, 500);
                }
                if (!$scope.gnews) {
                    GetData.getNews().then(
                        // Success
                        function (answer) {
                            $scope.gnews = angular.fromJson(answer.data);
                            $scope.$storage['gnews'] = angular.fromJson(answer.data);
                            if (!$scope.$storage.time) {
                                console.log("time set");
                                $scope.$storage.time = new Date().getTime() / 1000;
                            }
                        },
                        // Fail
                        function (reason) {

                            $rootScope.updateData('gnews');

                        }
                    ).finally(function () {
                        if (timeSince($scope.$storage.time) >= 3600) {
                            $rootScope.updateData('gnews')
                        } else {


                            $timeout(function () {
                                $rootScope.loaderIcon = false;
                            }, 250);
                            $timeout(function () {
                                $WowheadPower.refreshLinks();
                            }, 1000);
                            $timeout(function () {
                                $rootScope.finishedLoading = true;
                                $rootScope.loadItems = true;
                            }, 1250);
                        }
                    });

                }
            }
            ]
        })
        .state('feed', {
            url: "/feed/:char",
            templateUrl: "partials/feed.html",
            controller: ['wowApi', '$scope', '$stateParams', '$timeout', '$localStorage', 'dataJson', '$http', 'GetData', function (wowApi, $scope, $stateParams, $timeout, $localStorage, dataJson, $http, GetData) {
                wowApi.character.feed({ name: $stateParams.char, realm: $scope.serverName }).then(function (response) {
                    $scope.feed = angular.fromJson(response.data);

                });
            }
            ]
        });

    $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('grey', {
            'default': '800'
        }).dark();
    $mdThemingProvider.theme('alt')
        .primaryPalette('orange')
        .accentPalette('green');
}]);
axeApp.controller('MainCtrl', ['$scope', '$http', '$timeout', '$rootScope', '$state', 'dataJson', 'wowApi', '$stateParams', '$localStorage', 'GetData', function ($scope, $http, $timeout, $rootScope, $state, dataJson, wowApi, $stateParams, $localStorage, GetData) {
    $rootScope.sok = "";
    $scope.$storage = $localStorage;
    $rootScope.finishedLoading = false;

    // Set application version, delete cache if version changes.
    if (!$scope.$storage['version']) {
        $scope.$storage['version'] = "";
    };

    if ($scope.$storage['version'] != version) {
        localStorage.clear();
        $scope.$storage['version'] = version;
    };

    $scope.activity_string = activity_string;
    $scope.today_string = today_string;
    $scope.raidready_string = raidready_string;
    $scope.raidready_string2 = raidready_string2;
    $scope.history_string = history_string;
    $scope.back_string = back_string;
    $scope.ilvl_string = ilvl_string;
    $scope.since_string = since_string;
    $scope.craft_string = craft_string;
    $scope.bought_string = bought_string;
    $scope.looted_string = looted_string;
    $scope.achieved_string = achieved_string;
    $scope.close_filter_string = close_filter_string;
    $scope.open_filter_string = open_filter_string;
    $scope.delete_filter_string = delete_filter_string;
    $scope.stats_string = stats_string;
    $scope.stats_primary_string = stats_primary_string;
    $scope.stats_secondary_string = stats_secondary_string;
    $scope.stats_talents_string = stats_talents_string;
    $scope.items_itemlevel_string = items_itemlevel_string;
    $scope.page2_string = page2_string;
    $scope.page3_string = page3_string;
    $scope.minlevel = minlevel;
    $scope.newstitle_string = newstitle_string;
    $scope.region = region;
    $scope.menu_string = menu_string;
    $scope.ranks = ranks;
    $scope.raidReady = raidReady;
    $scope.guildName = guildName;
    $scope.serverName = serverName;



    $scope.classes = [{ "class": "Warrior", id: 1 }, { "class": "Paladin", id: 2 }, { "class": "Hunter", id: 3 }, { "class": "Rogue", id: 4 }, { "class": "Priest", id: 5 }, { "class": "Death Knight", id: 6 }, { "class": "Shaman", id: 7 }, { "class": "Mage", id: 8 }, { "class": "Warlock", id: 9 }, { "class": "Monk", id: 10 }, { "class": "Druid", id: 11 }, { "class": "Demon Hunter", id: 12 }];

    $scope.reverseFilter = function () {
        $rootScope.filterOn = !$rootScope.filterOn;
    }
    $rootScope.filterOn = false;

    $scope.onSwipeRight = function () {
        $state.go('guildnews');
    };

    $scope.onSwipeLeft = function () {
        $state.go('guild');
    };

    $scope.goTo = function (url) {
        $window.open(url);
    };

    $scope.filter = [];
    $scope.selectedFilter = [];
    $scope.resetFilter = function () {
        $scope.filter = [];
        $scope.selectedFilter = [];
    }
    $scope.ChooseClass = function (classdata) {
        $scope.filter.class = classdata;
    };

    $scope.ChooseRank = function (rankdata) {
        $scope.filter.rank = rankdata;
    };

    $scope.getRank = function (data) {
        if (data != null) {
            return $scope.ranks[data].rank;
        }
    };

    $scope.getClass = function (data) {
        if (data != null) {
            // We start at 0, not 1.
            data = data - 1;
            return $scope.classes[data].class;
        }
    };

    $scope.subtractDates = function (date) {
        var date1 = new Date(date);
        var date2 = new Date();
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    $scope.getBonus = function (data) {
        if (data) {
            var returnstring = data.toString();
            var array = returnstring.split(',');
            var log = [];
            angular.forEach(array, function (value, key) {
                var str = value.toString();
                if (str.length >= 1) {
                    this.push(value);
                }
            }, log);
            returnstring = log.join().replace(/,/g, ":");
            if (returnstring != []) {
                return returnstring;
            }
        }
    };


    GetData.getGuild().then(
        // Success
        function (answer) {
            $scope.guild = angular.fromJson(answer.data);
            $scope.$storage['guild'] = angular.fromJson(answer.data);
            if (!$scope.$storage.time) {
                console.log("time set");
                $scope.$storage.time = new Date().getTime() / 1000;
            }
        },
        // Fail
        function (reason) {
            $rootScope.updateData('guild');
        }
    ).finally(function () {
        if (timeSince($scope.$storage.time) >= 3600) {
            $rootScope.updateData('guild')
        } else {

            $timeout(function () {
                $rootScope.loaderIcon = false;
            }, 250);
            $timeout(function () {
                $rootScope.finishedLoading = true;
                $rootScope.loadItems = true;
            }, 1250);
        }
    });

    $rootScope.updateData = function (inputString) {
        $rootScope.finishedLoading = false;
        if (inputString == 'gnews') {
            wowApi.guild.news({ name: $scope.guildName, realm: $scope.serverName }).then(function (response) {
                $scope['gnews'] = angular.fromJson(response.data);
                $scope.$storage['gnews'] = angular.fromJson(response.data);

                $scope.$storage.time = new Date().getTime() / 1000;


            }).finally(function () {
                if (!$scope.$storage['gnews'].code) {
                    dataJson.saveData($scope.$storage['gnews'], "gnews.json");
                    $scope.$storage['gnews'] = [];
                }
                if ($scope.char.code) {
                    location.reload();
                }
                $timeout(function () {
                    $rootScope.loaderIcon = false;
                }, 250);
                $timeout(function () {
                    $WowheadPower.refreshLinks();
                }, 1000);
                $timeout(function () {
                    $rootScope.finishedLoading = true;
                    $rootScope.loadItems = true;
                }, 1250);
            });

        } else if (inputString == 'guild') {
            wowApi.guild.profile({ name: $scope.guildName, realm: $scope.serverName, fields: ['members', 'profile'] }).then(function (response) {
                $scope['guild'] = angular.fromJson(response.data);
                $scope.$storage['guild'] = angular.fromJson(response.data);
                $scope.$storage.time = new Date().getTime() / 1000;

            }).finally(function () {
                if (!$scope.$storage[inputString].code) {
                    dataJson.saveData($scope.$storage['guild'], "guild.json");
                    $scope.$storage['guild'] = [];
                }
                if ($scope.char.code) {
                    location.reload();
                }
                $timeout(function () {
                    $rootScope.loaderIcon = false;
                }, 250);
                $timeout(function () {
                    $WowheadPower.refreshLinks();
                }, 1000);
                $timeout(function () {
                    $rootScope.finishedLoading = true;
                    $rootScope.loadItems = true;
                }, 1250);
            });
        } else {
            wowApi.character.profile({ name: inputString, realm: $scope.serverName, fields: ['items', 'feed', 'titles', 'stats', 'talents'] }).then(function (response) {
                $scope.char = angular.fromJson(response.data);
                $scope.$storage[inputString] = angular.fromJson(response.data);
                $scope.$storage.time = new Date().getTime() / 1000;

            }).finally(function () {
                if (!$scope.$storage[inputString].code) {
                    angular.forEach($scope.$storage[inputString]['titles'], function (value, key) {
                        if (value.selected) {
                            $scope.$storage[inputString]['name'] = $scope.$storage[inputString]['titles'][key].name.replace("%s", $scope.$storage[inputString]['name']);

                        }
                    });

                    dataJson.saveData($scope.$storage[inputString], inputString.hashCode() + ".json");

                }
                if ($scope.char.code) {
                    location.reload();
                }
                $timeout(function () {
                    $rootScope.loaderIcon = false;
                }, 250);
                $timeout(function () {
                    $WowheadPower.refreshLinks();
                }, 1000);
                $timeout(function () {
                    $rootScope.finishedLoading = true;
                    $rootScope.loadItems = true;
                }, 1250);
            });
        }



    };
}]);

axeApp.service('dataJson', ['$http', function ($http) {
    var storeService = this;
    this.Data = { content: [], filename: null };
    this.saveData = function (data, filename) {
        storeService.Data.content = data;
        storeService.Data.filename = filename;
        return $http.post('php/saveJson.php', storeService.Data).then(function () {
        });
    };
}]);

// Module for getting data as a service, with promise.
angular.module('getData', [])
    .service('GetData', ['$http', '$q', function ($http, $q) {
        var deferObject,
            GetData = {
                // Promise funksjon for å hente guild.
                getGuild: function () {
                    var promise = $http.get('json/guild.json'),
                        deferObject = deferObject || $q.defer();

                    promise.then(
                        // Suksess
                        function (answer) {
                            // Dette objektet vil bare bli returnert dersom promise blir en suksess
                            deferObject.resolve(answer);
                        },
                        // Feil
                        function (reason) {
                            // Mens dette bare returnerer om det feiler.
                            deferObject.reject(reason);
                        });

                    return deferObject.promise;
                },
                getNews: function () {
                    var promise = $http.get('json/gnews.json'),
                        deferObject = deferObject || $q.defer();

                    promise.then(
                        function (answer) {
                            deferObject.resolve(answer);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });

                    return deferObject.promise;
                },
                // $stateParams.char.hashCode()
                getChar: function (charhash) {
                    var promise = $http.get('json/' + charhash + '.json'),
                        deferObject = deferObject || $q.defer();

                    promise.then(
                        function (answer) {
                            deferObject.resolve(answer);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            };
        return GetData;
    }]);
