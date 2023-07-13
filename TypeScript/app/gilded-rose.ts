export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function isConjured(item: Item) {
  return item.name.startsWith('Conjured');
}

function isAgedBrie(item: Item) {
  return item.name === 'Aged Brie';
}

function isBackstagePasses(item: Item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isSulfuras(item: Item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (isConjured(item)) {
        item.quality = Math.max(0, item.quality - 2);
      } else if (!isAgedBrie(item) && !isBackstagePasses(item)) {
        if (item.quality > 0 && !isSulfuras(item)) {
          item.quality -= 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;
          if (isBackstagePasses(item)) {
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality += 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality += 1;
            }
          }
        }
      }

      if (!isSulfuras(item)) {
        item.sellIn -= 1;
      }

      if (item.sellIn < 0) {
        if (!isAgedBrie(item)) {
          if (!isBackstagePasses(item)) {
            if (item.quality > 0 && !isSulfuras(item)) {
              item.quality -= 1;
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }

    return this.items;
  }
}
