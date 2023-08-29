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

class ItemUpdater {
  static updateConjuredItem(item: Item) {
    item.quality = Math.max(0, item.quality - 2);
    item.sellIn -= 1;
  }

  static updateAgedBrie(item: Item) {
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.quality = Math.min(50, item.quality);
  }

  static updateBackstagePasses(item: Item) {
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      item.quality += 3;
    } else if (item.sellIn < 10) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }
    item.quality = Math.min(50, item.quality);
  }

  static updateNormalItem(item: Item) {
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality -= 2;
    } else {
      item.quality -= 1;
    }
    item.quality = Math.max(0, item.quality);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      
      if (item.name.startsWith('Conjured')) {
        ItemUpdater.updateConjuredItem(item);
      } else if (item.name === 'Aged Brie') {
        ItemUpdater.updateAgedBrie(item);
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        ItemUpdater.updateBackstagePasses(item);
      } else if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        ItemUpdater.updateNormalItem(item);
      }
    }

    return this.items;
  }
}
