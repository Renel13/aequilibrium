'use strict';

//Create land class
function createLand(land) {
    this.land = land || [];
    this.valleysNumber = 0;
    this.peaksNumber = 0;
    this.castlesToBuild = 0;
    //Calculating peaks and valleys
    this.count = function() {
        var prevValue = 0;
        var _length = this.land.length;
        for (var i = 0; i < _length; i++) {
            if (i < _length) {
                prevValue = (this.land[i] - this.land[i-1]) !== 0 ? this.land[i-1] : prevValue;
                if (prevValue < this.land[i] && this.land[i+1] < this.land[i]) {
                    this.peaksNumber++;
                }
                if (prevValue > this.land[i] && this.land[i+1] > this.land[i]) {
                    this.valleysNumber++;
                }
            }
        }
        this.castlesToBuild = this.peaksNumber + this.valleysNumber;
    };
    //Run calculating
    this.count();
}

var land = [2,6,6,6,3,2,1,4,7,5,3,2,1,3,2];
var myLand = new createLand(land);

//Displaying results
console.log('Castles to build:' + myLand.castlesToBuild);
console.log('Peaks: ' + myLand.peaksNumber);
console.log('Valleys: ' + myLand.valleysNumber);

