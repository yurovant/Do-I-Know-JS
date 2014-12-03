console.log('-----> Iterator Pattern');

/**
 * Iterator provides an interface to traverse through elements of a collection
 * http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#iteratorpatternjquery
 */

// implemented using Array as a list
function Iterator (list) {
     this.list = list || [];
     this.listSize = list.length;
     this.pos = 0;
}

Iterator.prototype.next = function () {
    if (this.hasNext()) {
        return ++this.pos;
    }
};

Iterator.prototype.hasNext = function () {
    return this.pos < this.listSize;
};

Iterator.prototype.prev = function () {
    if (this.hasPrev()) {
        return --this.pos;
    }
};

Iterator.prototype.hasPrev = function () {
    return this.pos > 0;
};

Iterator.prototype.front = function () {
    this.pos = 0;
};

Iterator.prototype.end = function () {
    this.pos = this.listSize-1;
};

Iterator.prototype.current = function () {
    return this.pos;
};

// facade, stops iteration if the callback returns a truthy value
// in the same manner reverse iteration could be implemented
Iterator.prototype.each = function (callback) {
    var item;
    var index;
    for (this.front(); this.hasNext(); this.next()) {
        index = this.current();
        item = this.list[index];

        if (item && callback(item, index)) {
            break;
        }
    }
};

var things = ['coub', 'pen', 'picture', 'candies', 'ipad mini'];
var box = new Iterator(things);

// iterating while it's possible
while (box.hasNext()) {
    console.log(things[box.current()]);
    box.next();
}

// iterate by hand
box.front();
console.log(things[box.current()]); // coub
box.end();
console.log(things[box.current()]); // ipad mini
box.prev();
console.log(things[box.current()]); // candies

// using facade
box.each(function (thing, index) {
    console.log(thing, index);
});
box.each(function (thing, index) {
    console.log(thing, index);
    if (thing === 'pen') return true;
});
