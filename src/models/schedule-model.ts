export class ScheduleModel {

  num: number = 0;
  i: number;
  constructor(public user: string,
              public items: any[]
              ){
    this.items = items;

  }

  addItem(item){
    this.num++;
    this.items.push({
      id: this.num,
      title: item,
      days: [],
      time: '',
      notes: '',
      type: '',
      completed: false
    });
  }

  removeItem(item){

    for(this.i = 0; this.i < this.items.length; this.i++) {
      if(this.items[this.i] == item){
        this.items.splice(this.i, 1);
      }
    }

  }


  renameItem(item, title){
    for(this.i = 0; this.i < this.items.length; this.i++) {
      if(this.items[this.i] == item){
        this.items[this.i].title = title;
      }
    }
  }

  setTitle(title){
    this.user = title;
  }

  toggleComplete(item): void{
    item.completed = !item.completed;
  }
}
