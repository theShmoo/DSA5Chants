// returns true if the first string contains the second (in lower case)
function fuzzyStringCompare(str1, str2) {
  return str1.toLowerCase().includes(str2.toLowerCase());
}

// checks if the local storage exists
function supportsLocalStorage() {
  var mod = "test";
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

export default class FilterState {
  constructor () {
    this._name = "";
    this._properties = {};
    this._chantClasses = [];
    this._favorite = false;
    this._favoriteChants = [];

    this.hasLocalStorage = supportsLocalStorage();
    this.loadFromLocalStorage();
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
    this.saveToLocalStorage();
  }

  get properties() {
    return this._properties;
  }

  set properties(newProperties) {
    this._properties = newProperties;
    this.saveToLocalStorage();
  }

  get chantClasses() {
    return this._chantClasses;
  }

  set chantClasses(newChantClasses) {
    this._chantClasses = newChantClasses;
    this.saveToLocalStorage();
  }

  get favorite() {
    return this._favorite;
  }

  set favorite(bFilter) {
    this._favorite = bFilter;
    this.saveToLocalStorage();
  }

  get favoriteChants() {
    return this._favoriteChants;
  }

  set favoriteChants(newFavoriteChants) {
    this._favoriteChants = newFavoriteChants;
    this.saveToLocalStorage();
  }

  loadFromLocalStorage () {
    // load local state
    if(this.hasLocalStorage) {
      console.log("load local storage");
      console.log(localStorage.getItem("chantfilter"));
      var storedFilter = JSON.parse(localStorage.getItem("chantfilter"));
      if(storedFilter)
      {
        this._name = storedFilter._name;
        this._properties = storedFilter._properties;
        this._chantClasses = storedFilter._chantClasses;
        this._favoriteChants = storedFilter._favoriteChants;
        this._favorite = storedFilter._favorite;
      }
    }
  }

  saveToLocalStorage() {
    if(this.hasLocalStorage) {
      console.log("Save to local storage");
      localStorage.setItem("chantfilter", JSON.stringify(this));
      console.log(JSON.stringify(this));
    }
  }

  /*
   * Here start the filter methods
   */

  filterForName(chantname) {
    return !fuzzyStringCompare(chantname, this.name);
  }

  filterForProperties(chantproperties) {
    var filtered = false;
    // iterate over all properties of the filter
    for (var k in this.properties) {
      // if a property is found (e.g. Merkmal)
      if(k in chantproperties && this.properties[k].length) {
        // check for the chant property if it is inside this list
        var chant_p = chantproperties[k];
        var isInList = false;
        for( var p of this.properties[k]) {
          isInList = fuzzyStringCompare(chant_p, p);
          if (isInList)
            break;
        }
        filtered = !isInList;
      }
      if (filtered)
        break;
    }
    return filtered;
  }

  filterForChantClasses(chantclass) {
    if(this.chantClasses.length)
      return !(this.chantClasses.indexOf(chantclass) > -1);
    else
      return false;
  }

  filterForFavorite(chantname) {
    if(this.favorite && this.favoriteChants.indexOf(chantname) === -1) {
      return true;
    }
    return false;
  }

  filterChant (chant) {
    if(this.filterForName(chant.name))
      return true;
    if(this.filterForProperties(chant.properties))
      return true;
    if(this.filterForChantClasses(chant.chantclass))
      return true;
    if(this.filterForFavorite(chant.name))
      return true;
    return false;
  }
}
