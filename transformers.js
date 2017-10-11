'use strict';

//Create team class
function createTeam(name) {
    this.name = name;
    this.points = 0;
    this.members = [];
    //method to add transformer to the team
    this.addTransformer = function(transformer) {
        this.members.push(transformer);
    };
}

//Create transformer class
function createTransformer(name, strength, intelligence, speed, endurance, rank, courage, firepower, skill) {
    this.name = name;
    this.strength = strength;
    this.intelligence = intelligence;
    this.speed = speed;
    this.endurance = endurance;
    this.rank = rank;
    this.courage = courage;
    this.firepower = firepower;
    this.skill = skill;
    this.overalRating = this.strength + this.intelligence + this.speed + this.endurance + this.firepower;
    //Checking conditions
    this.isSuperHero = function() {
        var superHeroes = ['Optimus Prime', 'Predaking'];
        return superHeroes.indexOf(this.name) > -1;
    };
    this.checkCondition1 = function(enemy) {
        return this.courage - enemy.courage >= 4 && this.strength - enemy.strength >= 3;
    };
    this.checkCondition2 = function(enemy) {
        return this.skill - enemy.skill >= 3;
    };

    this.checkCondition3 = function(enemy) {
        return this.overalRating - enemy.overalRating;
    };
    //Fight flag
    this.fight = 0; //0 - didn't fight, 1 - won, 2 - lose
}

//Create battle class
function startBattle(t1, t2) {
    this.team1 = t1.members.length < t2.members.length ? t1 : t2;
    this.team2 = t1.members.length < t2.members.length ? t2 : t1;
    this.fights = 0;
    //Fight calculation method
    this.fight = function(transformer1, transformer2) {
        this.fights++;
        if (transformer1.isSuperHero() || transformer1.checkCondition1(transformer2) ||
            transformer1.checkCondition2(transformer2) || transformer1.checkCondition3(transformer2) > 0) {
            return transformer1;
        } else if (transformer1.checkCondition3(transformer2) === 0) {
            return null;
        } else {
            return transformer2;
        }
    };

    var _length = this.team1.members.length;
    for (var i = 0; i < _length; i++) {
        var winner = this.fight(this.team1.members[i], this.team2.members[i]);
        if (winner === null) {
            this.team1.members[i].fight = -1;
            this.team2.members[i].fight = -1;
        } else {
            if (winner === this.team1.members[i]) {
                this.team2.members[i].fight = -1;
                this.team1.members[i].fight = 1;
                this.team1.points++;
            } else {
                this.team1.members[i].fight = -1;
                this.team2.members[i].fight = 1;
                this.team2.points++;
            }
        }
    }

    if (this.team1.points === this.team2.points) {
        this.winningTeam = null;
    } else {
        this.winningTeam = (this.team1.points > this.team2.points) ? this.team1 : this.team2;
        this.losingTeam = (this.team1.points < this.team2.points) ? this.team1 : this.team2;
    }

}

//Creating teams
var autobots = new createTeam('Autobots');
var decepticons = new createTeam('Decepticons');

//Creating transformers
var transformer = new createTransformer('Megatron', 5, 3, 7, 3, 4, 5, 7, 2);
autobots.addTransformer(transformer);
var transformer = new createTransformer('Bumblebee', 5, 3, 5, 3, 2, 8, 4, 1);
autobots.addTransformer(transformer);


var transformer = new createTransformer('Abominus', 2, 5, 2, 7, 6, 1, 7, 4);
decepticons.addTransformer(transformer);
var transformer = new createTransformer('Acid Storm', 4, 3, 3, 2, 6, 4, 4, 2);
decepticons.addTransformer(transformer);
var transformer = new createTransformer('Frenzy', 8, 2, 6, 3, 2, 4, 1, 5);
decepticons.addTransformer(transformer);

//Run battle
var battle = new startBattle(autobots, decepticons);

//Preparing and Displaying results
if (battle.winningTeam === null) {
    console.log('Tie. Fights: ' + battle.fights);
} else {
    var winnersList = [];
    var survivorsList = [];
    for (var i=0; i < battle.winningTeam.members.length; i++) {
        if (battle.winningTeam.members[i].fight === 1) {
            winnersList.push(battle.winningTeam.members[i].name);
        }
    }

    for (var i=0; i < battle.losingTeam.members.length; i++) {
        if (battle.losingTeam.members[i].fight === 0) {
            survivorsList.push(battle.losingTeam.members[i].name);
        }
    }

    console.log('Fights: ' + battle.fights);
    console.log('Winning team (' + battle.winningTeam.name +') ' + winnersList.join(','));
    if (survivorsList.length > 0) {
        console.log('Survivors from the losing team (' + battle.losingTeam.name + '): ' + survivorsList.join(','));
    }
}